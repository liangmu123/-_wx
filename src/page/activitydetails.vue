<!-- 活动详情 -->
<template>
    <div class="activitydetails navigation_bottom">
        <div class="img">
            <img :src="IMG_PATH + details.images" alt="图片">
        </div>
        <div class="position">
            <div class="content">
                <p class="title">
                    {{details.title}}
                </p>
                <el-row class="class">
                    <el-col :span="6">开始时间：</el-col>
                    <el-col :span="18">{{details.format_start_time}}</el-col>
                </el-row>
                <el-row class="class">
                    <el-col :span="6">结束时间：</el-col>
                    <el-col :span="18">{{details.format_end_time}}</el-col>
                </el-row>
                <el-row class="class">
                    <el-col :span="6">活动地点：</el-col>
                    <el-col :span="18">{{details.address}}</el-col>
                </el-row>
                <!-- <el-row class="class">
                    <el-col :span="6">志愿团队：</el-col>
                    <el-col :span="18">{{details.address}}</el-col>
                </el-row> -->
                <el-row class="class">
                    <el-col :span="6">联系人：</el-col>
                    <el-col :span="18">{{details.contacter}}</el-col>
                </el-row>
                <el-row class="class">
                    <el-col :span="6">联系方式：</el-col>
                    <el-col :span="18">{{details.phone}}</el-col>
                </el-row>
            </div>
        </div>
        <div style="margin-top:-3rem;" class="block"></div>
        <p class="describe" v-html="details.content"></p>
        <div class="block"></div>
        <div style="padding:1rem 2rem;">
            <p style="color:red;font-size:1.6rem;margin-bottom:1rem;">已报名（{{details.joiner.length}}人）</p>
            <ul style="display:flex;overflow:auto;">
                <li class="li" v-for="(item,index) in details.joiner" :key="index">
                    <img style="width:50px;height:50px;border-radius:60px;" :src="item.head_img" alt="图片">
                </li>
            </ul>
        </div>
        <div class="block"></div>
        <el-button  class="btn" type="danger" v-if="details.status!=2 && details.is_join==0" @click="showdialogForm(id)">
            <span v-if="type == 'volunteeractivity'">报名</span>
            <span v-else>点单</span>
        </el-button>
        <el-button type="info" class="btn2" v-if="details.is_join >= 1" disabled @click.stop>
            <span v-if="type == 'volunteeractivity'">已报名</span>
            <span v-else>已点单</span>
        </el-button>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import {get_activity} from '@/api/api'

    import { mapState } from 'vuex'

    import appointDialog from '@/components/appointDialog'

    import {activity_join} from '@/api/api'
    export default {
        name:'activitydetails',
        data(){
            return {
                isDisabled:false,
                id:this.$route.query.id,
                details:'',
                IMG_PATH:IMG_PATH,
                dialogFormVisible:false,
                type:this.$route.query.type,
            }
        },
        created(){
            //console.log(this.type)
            this.type && this.type == 'volunteeractivity' ? this.setNavModular({modular:1}) : this.setNavModular({modular:0})
            this.get_activity()
        },
        computed:{
            ...mapState({
                bind:state => state.user.isBind,
            })
        },
        components:{
            appointDialog,
        },
        methods:{
            // 显示弹窗
            showdialogForm(id){
                // 判断是否已实名认证
                // this.isBind(id)
                // 走的vuex
                if(!this.bind){
                    this.$dialog.toast({
                        mes: "请先进行实名认证",
                        timeout: 1500
                    })
                    var that = this
                    setTimeout(function(){
                        // that.dialogFormVisible  = true
                    },1500)
                }else{
                    // 已绑定，直接请求
                    this.subInfo(id)
                }
            },
            // 提交信息
            subInfo(id){
                var that = this
                var params = {};
                params.access_token = window.localStorage.getItem('access_token')
                params.id = id
                that.$axios.post(activity_join,params)
                .then(res=>{
                    if(res.data.code == 10214){
                        that.$dialog.toast({
                            mes:'您还不是志愿者，正在跳转至成为志愿者界面',
                            timeout:1500
                        })
                        setTimeout(function(){
                            that.$router.push('/applyvolunteer')
                        },1500)
                        return
                    }else if(res.data.code == 10225){
                        that.$dialog.toast({mes: '志愿者申请审核中', timeout: 1500})
                    }else{
                        that.$dialog.toast({
                            mes: "报名成功，请等待工作人员联系",
                            timeout: 1500
                        })
                    }
                    // that.$router.go(0)
                    that.details.is_join = 1
                })
                .catch(err=>{
                    that.$dialog.toast({
                        mes: "报名失败",
                        timeout: 1500
                    })
                })
            },
            // 关闭弹窗
            closedialogForm(){
                //console.log(this.dialogFormVisible)
                this.dialogFormVisible = false
            },
            //活动详情
            get_activity(){
                var that = this
                var params = {}
                params.id = that.id
                params.access_token = window.localStorage.getItem('access_token')
                params.device = "wx"
                that.$axios.post(get_activity,params)
                .then(res=>{
                    that.details = res.data.data
                })
            },
            submit(){},
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
    .activitydetails{
        min-height:100%;
        background-color:#fff;
    }
    .class{
        color:#333;
        font-size:1.5rem;
        margin-bottom:1rem;
    }
    .class .el-col:last-child{
        text-align: right;
    }
    .img img{
        width:100%;
    }
    .li:not(:first-child){
        margin-left:1rem;
    }
    .position{
        position: relative;
        z-index:10;
    }
    .block{
        height:1rem;
        background-color:#eee;
    }
    .content{
        position:relative;
        width:90%;
        left:50%;
        top:-3rem;
        transform: translateX(-50%);
        padding:1rem;
        background-color:rgba(255,255,255,1);
        /* box-shadow: 0px 0px 10px #CCC; */
        z-index:10;
    }
    .title{
        font-size:1.8rem;
        color:#333;
        margin-bottom:1rem;
    }
    .time{
        font-size:1.4rem;
        color:#9D9FA4;
        margin-bottom:0.5rem;
    }
    .address{
        font-size:1.4rem;
        color:#9D9FA4;
        margin-bottom:2rem; 
    }
    .intro{
        font-size:1.8rem;
        color:#303030;
        margin-bottom:1rem; 
    }
    .describe{
        font-size:1.6rem;
        color:#333;
        min-height:10rem;
        padding:1.5rem;
    }
    .btn{
        width:60%;
        display:block;
        color:#FFF;
        margin:0 auto;
        margin-top:3rem;
        margin-bottom:2rem;
        background: -webkit-linear-gradient(#FF6666, #B60000); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FF6666, #B60000); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FF6666, #B60000); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FF6666, #B60000); /* 标准的语法 */
    }
    .btn2{
        width:60%;
        display:block;
        color:#FFF;
        margin:0 auto;
        margin-top:3rem;
        margin-bottom:2rem;
    }
</style>