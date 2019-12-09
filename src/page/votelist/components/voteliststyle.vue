<template>
    <div class="voteliststyle">
        <router-link :to="link">
                <div class="content" style="flex:1;">
                    <p class="title fontSize_1_8rem marginBottom_1rem">{{data.title}}</p>
                    <p class="time fontSize_1_4rem">截止日期：{{data.format_end_time}}</p>
                </div>
                <ysp_btn :name="data.status" class="btn" :class="{color1:data.status == 0,color3:data.status == 2}"></ysp_btn>
        </router-link>
    </div>
</template>
<script>
    import ysp_btn from "./button1.vue"
    export default {
        props:{
            data:{
                type:Object
            },
            link:{
                type:String,
                default:'#'
            },
        },
        name:"voteliststyle",
        data(){
            return {
            }
        },
        created(){
        },
        components:{
            ysp_btn,
        },
        methods:{
        },
    }
</script>
<style scoped>
    .voteliststyle a{
        width:100%;
        background-color:#FFF;
        display:flex;
        justify-content: space-between;
        align-items:center;
        padding:1rem;
    }
    .btn{
        padding:0;
        height:3rem;
        width:8rem;
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