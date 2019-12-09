<template>
    <div class="teamdetails navigation_bottom">
        <div class="top">
            <div class="header">
                <ul>
                    <li>
                        <ul>
                            <li>
                                {{details.title}}
                            </li>
                            <li>
                                联系人：{{details.contacter}}
                            </li>
                            <li>
                                联系电话：{{details.mobile}}
                            </li>
                        </ul>
                    </li>
                    <li>
                        <img v-if="details.logo" :src="IMG_PATH + details.logo" alt="logo">
                        <img v-else src="../assets/logo2.png" alt="logo">
                    </li>
                </ul>
                <el-row class="tongji">
                    <el-col :span="8">{{details.num}}</el-col>
                    <el-col :span="8">{{details.peoples}}</el-col>
                    <el-col :span="8">{{details.service_time}}</el-col>
                    <el-col :span="8">活动数量</el-col>
                    <el-col :span="8">团队成员</el-col>
                    <el-col :span="8">服务时长</el-col>
                </el-row>
            </div>
            <div class="static">
                <h2>
                    <span class="square"></span>
                    <span>服务项目</span>
                </h2>
                <ul v-if="details.services && details.services.length>0 && details.services[0]!=0">
                    <li v-for="(item,index) in details.services" :key="index">
                        <span class="cricle"></span>
                        <span>
                            {{item}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom static">
            <h2>
                <span class="square"></span>
                <span>团队简介</span>
            </h2>
            <div class="content" v-html="details.content">
            </div>
            <div class="btn" @click="submit">
                申请加入
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import {volunteerGroupDeatils} from '@/api/api'
    import {join_volunteergroup} from '@/api/api'
    import {becomeVolunteer} from '@/api/api'
    import {is_Volunteer} from '@/api/api'
    export default {
        name:'teamdetails',
        data(){
            return {
                id:this.$route.query.id,
                details:{},
                IMG_PATH:IMG_PATH
            }
        },
        created(){
            this.setNavModular({modular:1})
            this.get_volunteerGroupDeatils()
        },
        components:{
        },
        methods:{
            get_volunteerGroupDeatils(){
                var that = this
                that.$axios.post(volunteerGroupDeatils,{
                    id:that.id
                })
                .then(res=>{
                    that.details = res.data.data
                })
            },
            // 提交
            submit(){
                var params = {}
                var that = this
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(is_Volunteer,params)
                .then(res=>{
                    if(res.data.code == 10214){
                        that.$router.push('/applyvolunteer?group_id='+this.id)
                    }else{
                        that.submit2()
                    }
                })
            },
            submit2(){
                var that = this
                var params = {}
                params.group_id = []
                params.group_id.push(that.id)
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(join_volunteergroup,params)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$dialog.toast({
                            mes: "提交成功，请等待管理人员审核",
                            timeout: 1500
                        })
                        setTimeout(function(){
                            that.$router.go(-1)
                        },1500)
                    }else{
                        that.$dialog.toast({
                            mes: res.data.message,
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
    .top{
        background-color:#FFF;
        padding:1rem 1rem;
        margin-bottom:1rem;
    }
    .header{
        background: -webkit-linear-gradient(to right,#FFA95E, #FF6038); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(to right,#FFA95E, #FF6038); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(to right,#FFA95E, #FF6038); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right,#FFA95E, #FF6038); /* 标准的语法 */
        border-radius:5px;
        margin-bottom:2rem;
        padding:1rem;
    }
    .header>ul:first-child{
        display:flex;
        align-items: center;
        margin-bottom:3rem;
    }
    .header>ul:first-child>li:first-child{
        color:#FFF;
        width:60%;
    }
    .header>ul:first-child>li:first-child>ul>li:first-child{
        font-size:2rem;
        margin-bottom:1rem;
    }
    .header>ul:first-child>li:first-child>ul>li:not(:first-child){
        font-size:1.4rem;
    }
    .header>ul:first-child>li:last-child{
        width:40%;
        display:flex;
        justify-content: flex-end;
        align-items: center;
        
    }
    .header>ul:first-child>li:last-child>img{
        width:6rem;
        display:block;
    }
    .tongji .el-col{
        font-size:3rem;
        color:#FFF;
        text-align: center;
    }
    .tongji .el-col:nth-child(4),.tongji .el-col:nth-child(5),.tongji .el-col:nth-child(6){
        font-size:1.6rem;
    }
    .static h2{
        font-size:2rem;
        color:#666666;
        font-weight:normal;
        display:flex;
        align-items: center;
        margin-bottom:2rem;
    }
    .static ul li{
        color:#333;
        font-size:1.6rem;
        display:flex;
        align-items: center;
    }
    .square{
        width:10px;
        height:10px;
        background-color:red;
        display:block;
        transform: rotate(-45deg);
        margin-right:10px;
    }
    .cricle{
        width:10px;
        height:10px;
        background-color:red;
        display:block;
        border-radius:10px;
        margin-right:10px;
    }
    .bottom{
        background-color:#FFF;
        padding:2rem 1rem;
    }
    .content{
        font-size:1.8rem;
        color:#333;
        margin-bottom:5rem;
    }
    .btn{
        background-color:red;
        color:#FFF;
        font-size:1.8rem;
        text-align: center;
        line-height:3.6rem;
    }
</style>