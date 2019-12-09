<template>
    <div class="list2">
        <ul class="fontSize_1_8rem">
            <li>
                <img :src="IMG_PATH + details.img" alt="图片">
            </li>
            <li>
                <span class="textoverflow" style="flex:1;">
                        <el-popover
                        placement="top-start"
                        trigger="click"
                        :content="details.title">
                        <span slot="reference">{{details.title}}</span>
                        </el-popover>
                </span>
                <span class="textoverflow" style="flex-basis: 60px;text-align: right;">
                        <el-popover
                        placement="top-start"
                        trigger="click"
                        :content="details.tickets+'票'">
                        <span slot="reference">{{details.tickets}}票</span>
                        </el-popover>
                </span>
            </li>
            <li>
                <!-- <ysp_btn @click.native="vote" :name="details.status" class="btn" :class="{color3:details.status == 1}"></ysp_btn> -->
                <ysp_btn @click.native="vote(details.id)" class="btn"></ysp_btn>
            </li>
        </ul>
    </div>
</template>
<script>
    import ysp_btn from "./button1.vue"
    import {vote} from '@/api/api'
    export default {
        name:"list2",
        props:{
            details:{
                type:Object
            },
        },
        data(){
            return {
                IMG_PATH:IMG_PATH,
                id:this.$route.query.id,
            }
        },
        components:{
            ysp_btn,
        },
        methods:{
            vote(id){
                var that = this
                var params = {}
                params.id = that.details.tid
                params.oid = id
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(vote,params)
                .then(function (res) {
                    if(res.data.code == 0 && res.data.status == 200){
                        that.$dialog.toast({
                            mes: "投票成功",
                            timeout: 1500
                        })
                    }else if(res.data.code == 10210){
                        that.$dialog.toast({
                            mes: res.data.message,
                            timeout: 1500
                        })
                    }
                })
            },
        },
    }
</script>
<style scoped>
    .list2{
        box-shadow: 0px 2px 5px #CCC;
        margin-bottom:1rem;
        width:48%;
    }
    .list2 ul li:first-child img{
        width:100%;
        display:block;
        height:10rem;
    }
    .list2 ul li:nth-child(2){
        display:flex;
        justify-content: space-between;
        padding:1rem;
        align-items: center;
    }
    .list2 ul li:nth-child(3){
        padding:0 1rem 1rem 1rem;
    }
    .btn{
        padding:0;
        height:3rem;
        width:100%;
    }
    .color1{
        background-color:#FF8888 !important;
        border:#FF8888 !important;
    }
    .color3{
        background-color:#CCCCCC !important;
        border:#CCCCCC !important;
    }
</style>