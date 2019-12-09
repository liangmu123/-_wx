<!-- 图文资讯列表组件 -->
<template>
    <div class="ysp_article">
        <router-link v-if="modular == 0" :to="'/articledetails?id=' + details.id">
            <div class="left">
                <ellipsis :index="details.id" :title="details.title"></ellipsis>
                <p v-if="details.add_time">{{details.add_time}}</p>
                <p v-else>{{details.format_start_time}}</p>
            </div>
            <div class="right">
                <img v-if="details.img" :src="IMG_PATH + details.img" alt="缩略图">
                <img v-else :src="IMG_PATH + details.thumb" alt="缩略图">
            </div>
        </router-link>
        <router-link v-else-if="modular == 1" :to="'/articledetails?modular=1&id=' + details.id">
            <div class="left">
                <ellipsis :index="details.id" :title="details.title"></ellipsis>
                <p v-if="details.add_time">{{details.add_time}}</p>
                <p v-else>{{details.format_start_time}}</p>
            </div>
            <div class="right">
                <img v-if="details.img" :src="IMG_PATH + details.img" alt="缩略图">
                <img v-else :src="IMG_PATH + details.thumb" alt="缩略图">
            </div>
        </router-link>
        <router-link v-else-if="modular == 2" :to="'/articledetails?modular=2&id=' + details.id">
            <div class="left">
                <ellipsis :index="details.id" :title="details.title"></ellipsis>
                <p v-if="details.add_time">{{details.add_time}}</p>
                <p v-else>{{details.format_start_time}}</p>
            </div>
            <div class="right">
                <img v-if="details.img" :src="IMG_PATH + details.img" alt="缩略图">
                <img v-else :src="IMG_PATH + details.thumb" alt="缩略图">
            </div>
        </router-link>
    </div>
</template>
<script>
    import ellipsis from '../ellipsis'
    export default {
        name:'articleComponent',
        props:{
            details:{
                type:Object
            },
            link:{
                type:String,
                default:'#'
            },
            modular:{
                type:[Number,String],
                default:0
            }
        },
        data(){
            return {
                route:'',
                IMG_PATH:IMG_PATH
            }
        },
        components:{
            ellipsis,
        },
        created(){
        },
    }
</script>
<style scoped>
    .ysp_article>a{
        display:flex;
        padding:1rem 0;
        justify-content: space-between;
    }
    .ysp_article .left{
        width:65%;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .ysp_article .left p{
        font-size:1.6rem;
        color:#999999;
        line-height:1.6rem;
    }
    .ysp_article .right{
        width:30%;
        height:7rem;
    }
    .ysp_article .right img{
        display:block;
        width:100%;
        height:100%;
        border-radius:5px;
    }
</style>