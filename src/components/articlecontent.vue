<!-- 资讯内容 -->
<template>
    <div class="articlecontent">
        <router-link :to="{name:link,query:{type:type,id:id}}">
            <div class="details" :class="{imgNone:!details.img}">
                <p class="textoverflow" :class="{imgNone:!details.img}">{{details.title}}</p>
                <p>
                    <span>
                        <i class="el-icon-time"></i>{{details.add_time}}
                    </span>
                    <span>
                        <i class="el-icon-view"></i>
                        {{details.click_count}}
                    </span>
                </p>
            </div>
            <div v-if="details.img" class="img">
                <img :src="IMG_PATH + details.img" alt="图片">
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        name:'articlecontent',
        props:{
            link:String,
            type:String,
            id:[String, Number],
            details:{
                type:Object,
                default: function() {
                    return {
                        title:'',
                        add_time:''
                    }
                }
            },
        },
        data(){
            return {
                IMG_PATH:IMG_PATH
            }
        },
        created(){
        },
        methods:{
        }
    }
</script>
<style scoped>
    .articlecontent{
        width:100%;
    }
    .articlecontent>a{
        display:flex;
        justify-content: space-between;
        padding:1rem;
    }
    .articlecontent .img{
        width:9rem;
        height:6rem;
    }
    .articlecontent .img2{
        width:6rem;
        height:9rem;
    }
    .articlecontent .img>img,.articlecontent .img2>img{
        width:100%;
        height:100%;
    }
    .articlecontent .details.imgNone{
        width:100%;
    }
    .articlecontent .details.imgNone>.imgNone{
        margin-bottom:2rem;
    }
    .articlecontent .details{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size:1.6rem;
        /* color:#606060; */
        width:calc(100% - 10rem);
    }
    .articlecontent .details p:last-child{
        color:#999;
        display:flex;
        justify-content: space-between;
    }
    /* .articlecontent .details p:last-child span:last-child{
        background-color:rgba(0,0,0,.6);
        padding:0 0.5rem;
        border-radius:2px;
        color:white;
    } */
    .articlecontent .details i{
        margin-right:0.5rem;
    }
</style>