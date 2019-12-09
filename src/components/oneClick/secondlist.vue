<template>
    <div class="secondList">
        <el-row class="border_bottom">
            <el-col :span="4" class="img">
                <img class="margin_bottom2" :src="details.head_img" alt="头像">
                <span class="fontSize_1_6rem">{{details.username}}</span>
            </el-col>
            <el-col :span="20" class="rightDeatils fontSize_1_6rem">
                <el-row class="margin_bottom" v-if="type == 'myHELP'">
                    <el-col :span="24">
                        我帮助了
                    </el-col>
                </el-row>
                <el-row :class="{myHELP:type == 'myHELP'}">
                    <el-col :sapn="24" class="margin_bottom" :class="{textoverflow:textoverflow}">
                        {{details.brief}}
                    </el-col>
                    <el-col class="margin_bottom color_blue" :sapn="24">
                        <span v-if="textoverflow" @click="textoverflow = false">展开</span>
                        <span v-else @click="textoverflow = true">折叠</span>
                    </el-col>
                    <el-col v-if="details.area_name" style="font-size:1.4rem;" class="margin_bottom" :sapn="24">
                        来源：{{details.area_name}}
                    </el-col>
                    <el-col v-if="details.mobile && type == 'myHELP'" style="font-size:1.4rem;" class="margin_bottom" :sapn="24">
                        联系方式：<a style="color:#4A98EB;border-bottom:1px solid #4A98EB;" :href="'tel:' + details.mobile">{{details.mobile}}</a>
                    </el-col>
                    <el-col :sapn="24" class="status margin_bottom"  v-if="details.is_check == 0">
                        <div class="left">
                            <template>
                                <img class="btn" :src="is_check[0].src" alt="按钮">
                                <span>{{is_check[0].title}}</span>
                            </template>
                            <span class="color_gray">{{details.format_add_time}}</span>
                        </div>
                    </el-col>
                    <el-col :sapn="24" class="status margin_bottom"  v-else-if="details.is_check == 2">
                        <div class="left">
                            <template>
                                <img class="btn" :src="is_check[1].src" alt="按钮">
                                <span>{{is_check[1].title}}</span>
                            </template>
                            <span class="color_gray">{{details.format_add_time}}</span>
                        </div>
                    </el-col>
                    <el-col :sapn="24" class="status margin_bottom" v-else>
                        <div class="left">
                            <template v-for="(item,index) in status" v-if="details.status === index">
                                <img class="btn" :src="status[index].src" alt="按钮">
                                <span>{{status[index].title}}</span>
                            </template>
                            <span class="color_gray">{{details.format_add_time}}</span>
                        </div>
                        <div class="right" v-if="type != 'myHELP' && type != 'mySOS' && details.status === 0">
                            <div class="btn" @click="help(details.id)">帮助TA</div>
                        </div>
                    </el-col>
                    <el-col :span="24" class="margin_bottom" v-if="type == 'mySOS' || type == 'myHELP'">
                        <indexlist class="bgIndex" :class="{padding:type == 'mySOS'}" :details="details.assist" :span="8"></indexlist>
                    </el-col>
                    <el-col :span="24" class="helper margin_bottom" v-if="type == 'mySOS' && details.status != 0">
                        <div class="left">
                            <img :src="details.help_img" alt="头像">
                            <span class="textoverflow span">{{details.help_name}}</span>
                            <span>{{details.avg}}</span>
                            <i class="el-icon-star-on"></i>
                        </div>
                        <div class="right">
                            <span>帮助时间：</span>
                            <span>{{details.format_hand_time}}</span>
                        </div>
                    </el-col>
                    <el-col :span="24" class="rate margin_bottom" v-if="type == 'mySOS' && details.status == 1">
                        <div class="left" @click="closeHelp(details.id)">
                            取消帮助
                        </div>
                    </el-col>
                    <el-col :span="24" class="rate margin_bottom" v-if="type == 'mySOS' && details.status == 2">
                        <div class="left" @click="appraise(details.id)">
                            评价
                        </div>
                        <div class="right">
                            <el-rate
                                v-model="rate"
                                :colors="colors">
                            </el-rate>
                        </div>
                    </el-col>
                    <el-col :span="24" class="rateReadOnly margin_bottom" v-if="(type == 'mySOS' || type == 'myHELP') && details.status == 3">
                        <el-rate
                            v-model="details.scores"
                            disabled
                            disabled-void-color="lightgray"
                            :colors="colors">
                        </el-rate>
                    </el-col>
                </el-row>
                <el-row v-if="type == 'myHELP' && details.status == 1">
                    <el-col :span="24" class="rate margin_bottom">
                        <div class="left" @click="reply(details.id)">
                            完成帮助
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    // 引入组件
    import indexlist from '@/components/oneClick/indexlist'

    import {help} from '@/api/api'
    import {reply} from '@/api/api'
    import {appraise,cancelhelp} from '@/api/api'
    export default {
        props:{
            need:{
                type:String
            },
            type:{
                type:String
            },
            details:{
                type:Object
            },
        },
        name:'secondList',
        data(){
            return {
                textoverflow:true,
                status:[
                    {title:'求助中',src:require('../../assets/oneClick/one.png')},
                    {title:'帮助中',src:require('../../assets/oneClick/two.png')},
                    {title:'已完成',src:require('../../assets/oneClick/three.png')},
                    {title:'已结单',src:require('../../assets/oneClick/four.png')},
                ],
                span:7,
                rate:5,
                colors:['#99A9BF', '#FEE056', '#FF9900'],
                rateReadOnly:0,
                is_check:[
                    {title:'审核中',src:require('../../assets/oneClick/one.png')},
                    {title:'审核驳回',src:require('../../assets/oneClick/four.png')}
                ],
            }
        },
        components:{
            indexlist,
        },
        created(){

        },
        methods:{
            closeHelp(id){
                var that = this
                that.$axios.post(cancelhelp,{
                    access_token : window.localStorage.getItem('access_token'),
                    id:id
                })
                .then(res=>{
                    that.$dialog.toast({
                        mes: "取消成功",
                        timeout: 1500
                    })
                    setTimeout(function(){
                        window.location.reload()
                    },1500)
                })
            },
            appraise(id){
                var that = this
                var params = {}
                params.access_token = window.localStorage.getItem('access_token')
                params.id = id
                params.scores = this.rate
                that.$axios.post(appraise,params)
                .then(res=>{
                    that.$dialog.toast({
                        mes: "评价成功",
                        timeout: 1500
                    })
                    setTimeout(function(){
                        window.location.reload()
                    },1500)
                })
                .catch(err=>{
                    that.$dialog.toast({
                        mes: "评价失败",
                        timeout: 1500
                    })
                })
            },
            // 回复
            reply(id){
                var that = this
                var params = {}
                params.access_token = window.localStorage.getItem('access_token')
                params.id = id
                that.$axios.post(reply,params)
                .then(res=>{
                    that.$dialog.toast({
                        mes: "完成帮助",
                        timeout: 1500
                    })
                    setTimeout(function(){
                        window.location.reload()
                    },1500)
                })
                .catch(err=>{
                    that.$dialog.toast({
                        mes: "点击完成失败",
                        timeout: 1500
                    })
                })
            },
            // 帮助
            help(id){
                var that = this
                var params = {}
                params.access_token = window.localStorage.getItem('access_token')
                params.id = id
                that.$axios.post(help,params)
                .then(res=>{
                    if(res.data.code == 10214){
                        that.$dialog.confirm({
                            title: '您还不是志愿者,是否前往注册?',
                            opts: () => {
                                that.$dialog.toast({mes: '正在跳转志愿者注册界面', timeout: 1000})
                                setTimeout(function(){
                                    that.$router.push({name:'applyvolunteer'})
                                },1000)
                            }
                        })
                    }else if(res.data.code == 20020){
                        that.$dialog.confirm({
                            title: '您还未绑定手机号，是否前往实名认证',
                            opts: () => {
                                that.$router.push({name:'bindInfo'})
                            }
                        })
                    }else if(res.data.code == 10225){
                        that.$dialog.toast({mes: '志愿者申请审核中', timeout: 1500})
                    }else if(res.data.code == 10508){
                        that.$dialog.toast({
                            mes: "自己不能帮助自己",
                            timeout: 1500
                        })
                    }else{
                        that.$dialog.toast({
                            mes: "帮助成功",
                            timeout: 1500
                        })
                        setTimeout(function(){
                            window.location.reload()
                        },1500)
                    }
                })
                .catch(err=>{
                    that.$dialog.toast({
                        mes: "帮助失败",
                        timeout: 1500
                    })
                })
            },
        },
    }
</script>
<style scoped>
    .secondList{
        background-color:#FFF;
        padding:1rem;
        color:#606060;
    }
    .img{
        text-align: center;
    }
    .img>img{
        width:100%;
        height:5rem;
        display: block;
    }
    .rightDeatils{
        padding-left:1rem;
    }
    .margin_bottom{
        margin-bottom: 1.2rem;
    }
    .margin_bottom2{
        margin-bottom: 1rem;
    }
    .color_blue{
        color:#4A98EB;
    }
    .status{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .status .left .btn{
        width:12px;
    }
    .status .left .btn,.status .left span:not(:last-child){
        margin-right:1rem;
    }
    .status .right .btn{
        color:#FFF;
        background-color:#6AC5F8;
        padding:0.2rem 1rem;
        border-radius: 2px;
    }
    .color_gray{
        color:#bbb;
    }
    .bgIndex{
        background-color:#F2F2F2;
        border-radius:5px;
    }
    .padding_top{
        padding-top:1.5rem;
    }
    .rate{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .rate .left{
        background-color: #6AC5F8;
        color:#FFF;
        padding:0.3rem 2rem;
        border-radius: 2px;
        box-shadow:0px 3px 5px #96C6FF;
    }
    .el-rate{
        height:30px !important;
    }
    .helper{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .helper .left{
        display:flex;
        align-items: center;
    }
    .helper .left img:first-child{
        width:30px;
        height:30px;
        display:block;
        border-radius: 30px;
        margin-right:10px;
    }
    .helper .left span{
        font-size:1.4rem;
        line-height:1.4rem;
    }
    .helper .left span:nth-child(2){
        margin-right:15px;
    }
    .helper .left i:last-child{
        color:#FEE056;
        font-size:1.8rem;
    }
    .helper .right{
        font-size:1.2rem;
    }
    .helper .right span:last-child{
        color:#bbb;
    }
    .rateReadOnly{
        text-align: right;
    }
    .myHELP{
        background-color:#F2F2F2;
        border-radius:5px;
        padding:1rem;
        margin-bottom:1rem;
    }
    .border_bottom{
        border-bottom:1px solid #ddd;
    }
    .padding{
        padding:1rem 1rem 0 1rem;
    }
    .textoverflow.span{
        width:60px;
    }
</style>