<!-- 志愿者活动 -->
<template>
    <div class="takephotosdetails navigation_bottom">
        <div class="img initImg">
            <!-- 图片轮播 -->
            <yd-slider autoplay="3000">
                <yd-slider-item v-for="(item,index) in details.img" :key="index">
                    <img :src="IMG_PATH + item">
                </yd-slider-item>
            </yd-slider>
        </div>

        <!-- 图片预览组件 -->
        <initImg ref="initImg"></initImg>

        <div class="position">
            <div class="content">
                <!-- 访问量 -->
                <!-- <div class="amount">
                    <i class="el-icon-view"></i>
                    223
                </div>
                <div class="clearfix"></div> -->
                <div class="header">
                    <div class="portrait">
                        <img :src="details.user_img" alt="头像">
                    </div>
                    <div class="details">
                        <div class="name textoverflow">{{details.username}}</div>
                        <div class="time">{{details.addtime}}</div>
                    </div>
                </div>
                <div class="title">
                        {{details.title}}
                    </div>
                <div class="intro">
                    {{details.content}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import initImg from '@/components/initImg'

    import {get_Cases} from '@/api/api'
    export default {
        name:'takephotosdetails',
        data(){
            return {
                id:this.$route.query.id,
                details:{},
                IMG_PATH:IMG_PATH,
            }
        },
        components:{
            initImg,
        },
        created(){
            this.setNavModular({modular:0})
            this.get_Cases()
        },
        updated(){
            this.$refs.initImg.getImgs()
        },
        methods:{
            get_Cases(){
                var that = this
                var params = {}
                params.id = that.id
                that.$axios.post(get_Cases,params)
                .then(res=>{
                    that.details = res.data.data
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
    .takephotosdetails{
        background-color:#fff;
        min-height:100%;
    }
    .takephotosdetails .img img{
        width:100%;
        display: block;
    }
    .takephotosdetails .position{
        width:100%;
        position: relative;
        z-index:999;
        top:0;
        left:0;
        height:10px;
    }
    .takephotosdetails .content{
        position:absolute;
        width:90%;
        left:50%;
        transform: translateX(-50%);
        top:-3rem;
        z-index:1000;
    }
    .takephotosdetails .header{
        padding:1rem;
        border-radius:10px;
        box-shadow: 1px 1px 5px #aaa;
        display:flex;
        align-items: center;
        margin-bottom:1.5rem;
        background-color:#fff;
    }
    .takephotosdetails .header .portrait{
        width:4rem;
        height:4rem;
        border-radius:4rem;
        margin-right:1rem;
    }
    .takephotosdetails .header .portrait img{
        width:100%;
        height:100%;
        border-radius:4rem;
    }
    .header .details{
        display:flex;
        width:calc(100% - 6rem);
        height:4rem;
        flex-direction: column;
        justify-content: space-between;
    }
    .header .details .name{
        font-size:1.8rem;
        color:#333333;
    }
    .header .details .time{
        font-size:1.2rem;
        color:#B3B3B3;
    }
    .intro{
        font-size:1.6rem;
        color:#333333;
        background-color:#fff;
    }
    .title{
        font-size:1.8rem;
        color:#333333;
        background-color:#fff;
        margin-bottom:1rem;
    }
    .amount{
        color:#FFF;
        font-size:1.2rem;
        line-height:1.6rem;
        border-radius:4px;
        background-color:rgba(0,0,0,.6);
        float:right;
        padding:0 1rem;
        margin-bottom:1rem;
    }
    .amount i{
        margin-right:0.5rem;
    }
</style>