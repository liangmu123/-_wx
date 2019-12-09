<!-- 直播盒子 -->
<template>
    <div class="livecontent">
        <router-link :to="{name:'videodetails2',query:{type:'live',id:details.id}}">
            <div class="img">
                <img src="../assets/play.png" alt="播放" style="position:absolute;z-index:998;display:block;top:50%;left:50%;width:60px;height:60px;transform: translate(-50%,-50%)">
                <img :src="details.img" alt="封面">
                <div class="details">
                    <!-- <div class="portrait">
                        <img src="../assets/interactive/live.png" alt="头像">
                        <span>袁树平</span>
                    </div> -->
                    <!-- <div class="amount">
                        <span>
                            <i class="el-icon-user-solid"></i>
                        </span>
                        <span>2222</span>
                    </div> -->
                </div>
            </div>
            <div class="title">
                {{details.name}}
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        name:'livecontent',
        props:['details'],
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
    .livecontent{
        border-radius:10px;
        box-shadow: 1px 1px 5px #AAA;
    }
    .livecontent .img{
        width:100%;
        height:10rem;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        position: relative;
    }
    .livecontent .img>img{
        width:100%;
        height:100%;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
    }
    .livecontent .img .details{
        position:absolute;
        z-index:998;
        width:100%;
        padding:0.5rem 1rem;
        left:0;
        bottom:0;
        display:flex;
        justify-content: space-between;
    }
    .livecontent .img .details .portrait,.livecontent .img .details .amount{
        display:flex;
        justify-content: flex-start;
        align-items: center;
    }
    .livecontent .img .details .portrait img{
        width:1.6rem;
        margin-right:1rem;
    }
    .livecontent .img .details .portrait span{
        font-size:1.2rem;
        color:#FFF;
    }
    .livecontent .img .details .amount{
        font-size:1.2rem;
        color:#FFF;
    }
    .livecontent .img .details .amount span:first-child{
        margin-right:0.5rem;
    }
    .livecontent .title{
        background-color:#FFF;
        font-size:1.6rem;
        line-height:3rem;
        padding:0 1rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-bottom-left-radius:20px;
        border-bottom-right-radius:20px;
        text-align: center;
    }
</style>