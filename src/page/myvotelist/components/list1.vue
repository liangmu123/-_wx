<template>
    <div class="list1">
        <ul class="fontSize_1_8rem">
            <li class="textoverflow">
                    <el-popover
                    placement="top-start"
                    trigger="click"
                    :content="details.title">
                    <span slot="reference">{{details.title}}</span>
                    </el-popover>
            </li>
            <li class="textoverflow">
                    <el-popover
                    placement="top-start"
                    trigger="click"
                    :content="details.tickets+'票'">
                    <span slot="reference">{{details.tickets}}票</span>
                    </el-popover>
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
        name:"list1",
        props:{
            details:{
                type:Object
            },
        },
        data(){
            return {
                nowStatus:'',
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
    .list1{
        width:100%;
    }
    .list1 ul{
        display:flex;
        align-items: center;
        padding:1rem;
    }
    .list1 ul li:first-child{
        width:55%;
    }
    .list1 ul li:nth-child(2){
        width:25%;
    }
    .list1 ul li:nth-child(3){
        width:20%;
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