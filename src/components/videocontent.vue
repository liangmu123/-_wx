<!-- 视频内容组件 -->
<template>
    <div class="videocontent">
        <router-link :to="{name:'videodetails',query:{id:id}}">
            <div class="img">
                <img :src="IMG_PATH + details.img" alt="视频图片">
                <div class="describe">
                    <span>{{details.add_time}}</span>
                    <span>
                        <i class="el-icon-view"></i>
                        {{details.click_count}}
                    </span>
                </div>
                <img src="../assets/play.png" alt="播放" style="position:absolute;z-index:998;display:block;top:50%;left:50%;width:60px;height:60px;transform: translate(-50%,-50%)">
            </div>
            <div class="title">
                {{details.title}}
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        name:'videocontent',
        props:['id','details','link','type'],
        data(){
            return {
                IMG_PATH:IMG_PATH,
            }
        },
        created(){
        },
        methods:{
        }
    }
</script>
<style scoped>
    .videocontent{
        width:100%;
    }
    .videocontent .img{
        width:100%;
        position:relative;
    }
    .videocontent .img>img{
        width:100%;
    }
    .videocontent .img .describe{
        position:absolute;
        z-index:10;
        left:0;
        bottom:0;
        width:100%;
        padding:0 1rem 1rem 1rem;
        display:flex;
        justify-content: space-between;
    }
    .videocontent .img .describe span{
        font-size:1.2rem;
        color:#FFF;
    }
    .videocontent .img .describe span:last-child{
        background-color:rgba(0,0,0,.6);
        padding:0 0.5rem;
        border-radius:2px;
    }
    .videocontent .img .describe span:last-child i{
        margin-right:0.5rem;
    }
    .videocontent .title{
        background-color:#FFF;
        padding:1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:1.6rem;
    }
</style>