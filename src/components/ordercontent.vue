<!-- 百姓点单以及志愿活动组件 -->
<template>
    <div class="ordercontent">
        <ul @click.stop="jump">
            <li class="title">{{details.title}}</li>
            <li class="time">活动时间：{{details.format_start_time}} 至 {{details.format_end_time}}</li>
            <li class="img">
                <img v-if="details.images" :src="IMG_PATH + details.images" alt="图片">
                <img v-if="details.img" :src="IMG_PATH + details.img" alt="图片">
            </li>
            <li class="flex" v-if="needBtn !== false">
                <span v-if="details.joiner && details.joiner.length>0">已有{{details.joiner.length}}人报名</span>
                <template v-if="type && type == 'volunteeractivity'">
                    <el-button type="danger" v-if="tab != 1 && details.status!=2 && details.is_bm==99" @click.stop="showdialogForm(details.id)">报名</el-button>
                    <el-button type="info" v-if="details.is_bm == 1" disabled @click.stop>已报名</el-button>
                </template>
                <template v-else>
                    <el-button type="danger" v-if="tab != 1 && details.status!=2 && details.is_bm==99" @click.stop="showdialogForm(details.id)">点单</el-button>
                    <el-button type="info" v-if="details.is_bm == 1" disabled @click.stop>已点单</el-button>
                </template>  
            </li>
        </ul>
        <img :src="status[details.status]" alt="图片" class="status">
    </div>
</template>
<script>
    import {activity_join} from '@/api/api'

    import {isBind} from '@/api/api'
    import { mapState } from 'vuex'
    export default {
        name:'ordercontent',
        props:['details','type','tab','needBtn','link'],
        data(){
            return {
                status:[require('../assets/order/start.png'),require('../assets/order/ing.png'),require('../assets/order/end.png')],
                IMG_PATH:IMG_PATH,
            }
        },
        computed:{
            ...mapState({
                bind:state => state.user.isBind,
            })
        },
        methods:{
            jump(){
                if(this.type && this.type == 'volunteeractivity'){
                    this.$router.push({name:'activitydetails',query:{id:this.details.id,type:this.type}})
                }else if(this.link && this.link == 'votedetails'){
                    this.$router.push({name:'votedetails',query:{id:this.details.id}})
                }else if(this.link && this.link == 'myvotedetails'){
                    this.$router.push({name:'myvotedetails',query:{id:this.details.aid}})
                }else{
                    this.$router.push({name:'planDetails',query:{id:this.details.id}})
                } 
            },
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
                        that.$emit('showdialogForm',id)
                    },1500)
                }else{
                    // 已绑定，直接请求
                    this.subInfo(id)
                }
            },
            // 判断是否已实名认证
            // isBind(id){
            //     var that = this
            //     var params = {}
            //     params.access_token = window.localStorage.getItem('access_token')
            //     that.$axios.post(isBind,params)
            //     .then(res=>{
            //         // 未绑定
            //         if(res.data.data.is_bind == 0){
            //             that.$dialog.toast({
            //                 mes: "请先进行实名认证",
            //                 timeout: 1500
            //             })
            //             setTimeout(function(){
            //                 that.$emit('showdialogForm',id)
            //             },1500)
            //         }else if(res.data.data.is_bind == 1){
            //             // 已绑定，直接请求
            //             that.subInfo(id)
            //         }
            //     })
            // },
            // 报名接口
            // 提交信息
            subInfo(id){
                var that = this
                var params = {};
                params.access_token = window.localStorage.getItem('access_token')
                params.id = id
                that.$axios.post(activity_join,params)
                .then(res=>{
                    that.$dialog.toast({
                        mes: "报名成功，请等待工作人员联系",
                        timeout: 1500
                    })
                    // that.$router.go(0)
                    that.details.is_bm = 1
                })
                .catch(err=>{
                    that.$dialog.toast({
                        mes: "报名失败",
                        timeout: 1500
                    })
                })
            },
        }
    }
</script>
<style scoped>
    .ordercontent{
        position:relative;
        width:100%;
    }
    ul{
        background-color:#FFF;
        border-top-left-radius:15px;
        border-top-right-radius:15px;
        padding:1rem;
        box-shadow: 0 2px 3px #ddd;
        width:100%;
    }
    .title{
        font-size:1.6rem;
        color:#303030;
        margin-bottom:1rem;
        width:80%;
    }
    .time{
        font-size:1.4rem;
        color:#808080;
        margin-bottom:1rem;
    }
    .img{
        width:100%;
        margin-bottom:1rem;
    }
    .img>img{
        width:100%;
    }
    .flex{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .flex>span{
        font-size:1.2rem;
        color:#808080;
    }
    .el-button{
        padding-top:0 !important;
        padding-bottom:0 !important;
        line-height:2.5rem;
        margin-left:1rem;
    }
    .status{
        width:4rem;
        position:absolute;
        top:0;
        right:1rem;
    }
</style>