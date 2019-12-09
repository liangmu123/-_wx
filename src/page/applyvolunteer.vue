<!-- 志愿者招募 -->
<template>
    <div class="applyvolunteer navigation_bottom">
        <div class="header">
            <img src="../assets/applyvolunteer/shiming.png" alt="图片">
            <span>实名认证</span>
        </div>
        <yd-cell-group>
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
        </yd-cell-group>
        <el-row class="type marginBottom">
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
        <el-button class="btn" @click="submit" :disabled="isDisabled">提交</el-button>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import {becomeVolunteer} from '@/api/api'

    import {get_volunteerGroupList} from '@/api/api'
    import {is_Volunteer} from '@/api/api'

    import axios from 'axios'
    export default {
        name:'applyvolunteer',
        data(){
            return {
                ruleform:[
                    {name:'',regex:'/^[\u4e00-\u9fa5]{2,4}$/'},
                    {phone:'',regex:'/^1[2|3|4|5|6|7|8|9][0-9]{9}$/'},
                    {ID:'',regex:'/(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)/'}
                ],
                team:[],
                isDisabled:false,
                options:[],
                group_id:this.$route.query.group_id,
            }
        },
        created(){
            this.setNavModular({modular:1})
            this.get_volunteerGroupList()
        },
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            // var params = {}
            // params.access_token = window.localStorage.getItem('access_token')
            // axios.post(is_Volunteer,params)
            // .then(res=>{
            //     if(res.data.code == 10214){
            //         next()
            //     }else{
            //         if(to.query.group_id){
            //             var path = '/applyteam?group_id=' + to.query.group_id
            //             next({path:path})
            //         }else{
            //             next({path:'/applyteam'})
            //         }
            //     }
            // })
            next()
        },
        methods:{
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
                if(!that.ruleform[0].name || !that.ruleform[1].phone || !that.ruleform[2].ID || that.team.length == 0){
                    this.$dialog.toast({
                        mes: "请将信息填写完整",
                        timeout: 1500
                    })
                    that.isDisabled = false
                    return
                }
                if(!input.valid){
                    this.$dialog.toast({
                        mes: "请输入两位到四位的中文名字",
                        timeout: 1500
                    })
                    that.isDisabled = false
                    return
                }
                var input = that.$refs.phone
                if(!input.valid){
                    this.$dialog.toast({
                        mes: "请输入正确格式的手机号码",
                        timeout: 1500
                    })
                    that.isDisabled = false
                    return
                }
                var input = that.$refs.ID
                if(!input.valid){
                    this.$dialog.toast({
                        mes: "请输入正确格式的身份证号码",
                        timeout: 1500
                    })
                    that.isDisabled = false
                    return
                }
                var params = {}
                params.name = that.ruleform[0].name
                params.mobile = that.ruleform[1].phone
                params.card = that.ruleform[2].ID
                params.group_id = that.team
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(becomeVolunteer,params)
                .then(res=>{
                    that.$dialog.toast({
                        mes: "提交成功，请等待管理人员审核",
                        timeout: 1500
                    })
                    setTimeout(function(){
                        that.$router.go(-1)
                    },1500)
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
        margin-bottom:1rem;
    }
    .header>img{
        width:3rem;
        margin-right:2rem;
    }
    .header span{
        font-size:1.6rem;
    }
    .marginBottom{
        margin-bottom:7rem;
    }
    .btn{
        width:100%;
        display:block;
        color:#FFF;
        background: -webkit-linear-gradient(#FF6666, #B60000); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FF6666, #B60000); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FF6666, #B60000); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FF6666, #B60000); /* 标准的语法 */
    }
    .el-button:active,.el-button:focus{
        border:1px solid #FF6666;
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
</style>