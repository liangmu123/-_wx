<!-- 志愿者招募 -->
<template>
    <div class="applyvolunteer navigation_bottom">
        <!-- <div class="header">
            <img src="../assets/team.png" alt="图片">
            <span>加入队伍</span>
        </div> -->
        <!-- <yd-cell-group>
            <yd-cell-item>
                <span slot="left">
                    <img src="../assets/applyvolunteer/name.png" alt="图片">
                </span>
                <yd-input slot="right" ref='name' v-model.trim="ruleform[0].name" :regex="ruleform[0].regex" placeholder="请输入姓名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">
                    <img src="../assets/applyvolunteer/phone.png" alt="图片">
                </span>
                <yd-input slot="right" ref='phone' v-model.trim="ruleform[1].phone" :regex="ruleform[1].regex" placeholder="请输入手机号码"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">
                    <img src="../assets/applyvolunteer/id.png" alt="图片">
                </span>
                <yd-input slot="right" ref='ID' v-model.trim="ruleform[2].ID" :regex="ruleform[2].regex" placeholder="请输入身份证号"></yd-input>
            </yd-cell-item>
        </yd-cell-group> -->
        <!-- <el-row class="type marginBottom">
                <el-col :span="3" class="flex">
                    <img src="../assets/service/apply/type.png" alt="图片">
                </el-col>
                <el-col :span="21">
                    <el-select v-model="team" style="width:100%;" clearable filterable multiple placeholder="请选择志愿者团队">
                        <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.title"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
        </el-row>
        <el-button class="btn" @click="submit" :disabled="isDisabled">提交</el-button> -->
        <div class="header">
            <img src="../assets/center/team.png" alt="图片">
            <span>已加入队伍</span>
        </div>
        
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
                <div class="content">
                    <div class="team" v-for="(item,index) in list" :key="index" style="margin-bottom:1rem;">
                        <div class="left">
                            <p>{{item.title}}</p>
                            <!-- <p>{{item.addtime}}</p> -->
                        </div>
                        <div class="right">
                            <template v-for="(item2,index2) in status" v-if="item.is_pass === index2">
                                <span :class="{color1:index2===0,color2:index2===1,color3:false}">{{status[index2].title}}</span>
                            </template>
                        </div>
                    </div>
                </div>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <i slot="loadingTip" style="font-size:30px;" class="el-icon-loading"></i>
        </yd-infinitescroll>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import {join_volunteergroup} from '@/api/api'

    import {get_volunteerGroupList} from '@/api/api'
    import {my_team} from '@/api/api'
    export default {
        name:'applyteam',
        data(){
            return {
                team:[],
                isDisabled:false,
                options:[],
                group_id:this.$route.query.group_id,
                status:[
                    {title:'审核未通过',src:require('../assets/oneClick/one.png')},
                    {title:'审核通过',src:require('../assets/oneClick/two.png')},
                    // {title:'审核驳回',src:require('../assets/oneClick/three.png')},
                    // {title:'已结单',src:require('../assets/oneClick/four.png')},
                ],
                list:[],
                page:1,
            }
        },
        created(){
            this.setNavModular({modular:3})
            // this.get_volunteerGroupList()
            this.get_mine()
        },
        methods:{
            
            // 我的队伍
            get_mine(){
                var that = this
                var params = {
                    access_token : window.localStorage.getItem('access_token'),
                    page:this.page,
                    pagesize:10,
                }
                that.$axios.post(my_team,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                })
            },
            loadList() {
                var that = this
                var params = {
                    access_token : window.localStorage.getItem('access_token'),
                    page:this.page,
                    pagesize:10,
                }
                that.$axios.post(my_team,params)
                .then(function (response) {
                    const _list = response.data.data.items
                    that.list = [...that.list, ..._list]
                    if (that.page >= response.data.data.totalpage) {
                    /* 所有数据加载完毕 */
                    that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                    return;
                    }
                    /* 单次请求数据完毕 */
                    that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
                    that.page++;
                })
                .catch(function (error) {

                })
            },
            // 获取志愿者团体
            get_volunteerGroupList(){
                var that = this
                that.$axios.get(get_volunteerGroupList)
                .then(res=>{
                    that.options = res.data.data.items
                    if(that.group_id){
                        that.team.push(Number(that.group_id))
                    }
                })
            },
            // 提交
            submit(){
                var that = this
                // that.isDisabled = true
                var input = that.$refs.name
                if(that.team.length == 0){
                    this.$dialog.toast({
                        mes: "请选择志愿者团体",
                        timeout: 1500
                    })
                    that.isDisabled = false
                    return
                }
                var params = {}
                params.group_id = that.team
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(join_volunteergroup,params)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$dialog.toast({
                            mes: "提交成功，请等待管理人员审核",
                            timeout: 1500
                        })
                        setTimeout(function(){
                            window.location.reload()
                        },1500)
                    }else if(res.data.code == 10223){
                        that.$dialog.toast({
                            mes: "您已经加入过该团体",
                            timeout: 1500
                        })
                    }
                })
                .catch(err=>{
                    that.$dialog.toast({
                        mes: "提交失败",
                        timeout: 1500
                    })
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
    .applyvolunteer{
        min-height:100%;
        padding:2rem;
    }
    .header{
        display: flex;
        align-items: center;
        margin-bottom:2rem;
    }
    .header>img{
        width:3rem;
        margin-right:2rem;
    }
    .header span{
        font-size:1.6rem;
    }
    .marginBottom{
        margin-bottom:5rem;
    }
    .btn{
        width:100%;
        display:block;
        color:#FFF;
        background: -webkit-linear-gradient(#FF6666, #B60000); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FF6666, #B60000); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FF6666, #B60000); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FF6666, #B60000); /* 标准的语法 */
        margin-bottom:5rem;
        color:#FFF !important;
    }
    .btn.el-button:active,.btn.el-button:focus{
        border:1px solid #FF6666;
        color:#FFF !important;
    }
    .type img{
        width:1.5rem;
        margin-left:0.2rem;
    }
    .type .flex{
        display:flex;
        align-items: center;
    }
    .type .flex.el-col{
        height:41px;
    }
    .type{
        border-bottom:1px solid #D8D8D8;
    }
    .team{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:1rem;
        background: linear-gradient(to right, #FFBE27 0%, #FFA41C 100%);
        color:#FFF;
        border-radius:5px;
        box-shadow: 1px 1px 5px #aaa;
    }
    .team>p:first-child{
        width:66%;
        font-size:1.8rem;
    }
    .team>p:last-child{
        width:30%;
        font-size:1.6rem;
    }
    .team>div:first-child{
        width:66%;
        font-size:1.8rem;
    }
    .team>div:first-child>p:first-child{
        /* margin-bottom:1rem; */
    }
    .team>div:last-child{
        width:35%;
        text-align: right;
        font-size:1.6rem;
    }
    .color1{
        color:red;
    }
    .color2{
        color:green;
    }
    .color3{
        color:gray;
    }
    
</style>