<!-- 视频列表组件 -->
<template>
    <div class="ysp_video">
        <router-link v-if="modular == 0" :to="'/videodetails?id=' + details.id">
            <div class="top">
                <img :src="IMG_PATH + details.img" alt="缩略图">
            </div>
            <p>{{details.title}}</p>
            <img class="position" src="../assets/play.png" alt="播放按钮">
        </router-link>
        <router-link v-else-if="modular == 1" :to="'/videodetails?modular=1&id=' + details.id">
            <div class="top">
                <img :src="IMG_PATH + details.img" alt="缩略图">
            </div>
            <p>{{details.title}}</p>
            <img class="position" src="../assets/play.png" alt="播放按钮">
        </router-link>
        <router-link v-else-if="modular == 2" :to="'/videodetails?modular=2&id=' + details.id">
            <div class="top">
                <img :src="IMG_PATH + details.img" alt="缩略图">
            </div>
            <p>{{details.title}}</p>
            <img class="position" src="../assets/play.png" alt="播放按钮">
        </router-link>
    </div>
</template>
<script>
    export default {
        props:{
            details:{
                type:Object
            },
            modular:{
                type:[Number,String],
                default:0
            }
        },
        name:'videoComponent',
        data(){
            return {
                IMG_PATH:IMG_PATH
            }
        },
        created(){
        },
    }
</script>
<style scoped>
    .ysp_video{
        padding:1rem 0;
        position: relative;
    }
    .ysp_video .top{
        width:100%;
        margin-bottom:1rem;
    }
    .ysp_video .top img{
        width:100%;
        display:block;
        border-radius:5px;
    }
    .ysp_video>a>p{
        font-size:1.8rem;
        color:#333333;
    }
    .position{
        position: absolute;
        z-index:10;
        top:45%;
        left:50%;
        transform: translate(-50%,-50%);
        width:6rem;
    }
</style>