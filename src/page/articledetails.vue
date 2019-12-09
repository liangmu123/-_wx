<!-- 资讯详情 -->
<template>
    <div class="articledetails navigation_bottom initImg">
        <div class="title">{{details.title}}</div>
            <p class="time">
                <i class="el-icon-time"></i> {{details.format_add_time}}
            </p>
            <!-- 图片轮播 -->
            <yd-slider autoplay="3000" v-if="details.photos">
                <yd-slider-item v-for="(item,index) in details.photos" :key="index">
                    <img :src="IMG_PATH + item">
                </yd-slider-item>
            </yd-slider>
            <yd-slider autoplay="3000" v-else-if="details.img">
                <yd-slider-item>
                    <img :src="IMG_PATH + details.img">
                </yd-slider-item>
            </yd-slider>
            <div class="inner" :class="{innerP:modular == 2}" v-if="details.content" v-html="details.content"></div>
            <div class="inner" v-else-if="details.deed" v-html="details.deed"></div>
            <!-- 图片预览组件 -->
            <initImg ref="initImg"></initImg>
        </div>  
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import initImg from '@/components/initImg'

    import {get_article} from '@/api/api'
    // 统计
    import {get_postview} from '@/api/api'
    // 用户足迹
    import {add_records} from '@/api/api'
    export default {
        name:'articledetails',
        data(){
            return {
                type:this.$route.query.type,
                id:this.$route.query.id,
                details:{},
                IMG_PATH:IMG_PATH,
                modular:this.$route.query.modular
            }
        },
        created(){
            if(this.modular && this.modular == 1){
                this.setNavModular({modular:1})
            }else if(this.modular && this.modular == 2){
                this.setNavModular({modular:2})
            }else{
                this.setNavModular({modular:0})
            }
            // 获取详情
            this.get_article()
            // 统计接口
            // this.get_postview()
            // 用户足迹
            // this.add_records()
        },
        updated(){
            this.$refs.initImg.getImgs()
        },
        mounted(){
            // document.documentElement.scrollTop = 0
        },
        components:{
            initImg,
        },
        methods:{
            get_article(){
                var that = this
                var params = {}
                params.id = that.id
                params.type = "wx"
                that.$axios.post(get_article,params)
                .then(res=>{
                    that.details = res.data.data
                })
            },
            // 统计接口
            get_postview(){
                var that = this;
                var param = {}
                param.device = 'wx'
                param.id = that.id
                param.tpe = 1
                that.$axios.post(get_postview,param)
                .then(function(res){
                //console.log(res)
                })
                .catch(function(err){
                //console.log(err)
                })
            },
            // 用户足迹
            add_records(){
                var that = this;
                var param = {}
                param.cid = that.id
                param.type = 2
                param.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(add_records,param)
                .then(function(res){
                //console.log(res)
                })
                .catch(function(err){
                //console.log(err)
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
    .articledetails{
        min-height:100%;
        background-color:#FFF;
        padding:1rem;
        width:100%;
        overflow: hidden;
    }
    .articledetails .title{
        font-size:1.8rem;
        margin-bottom:1rem;
        /* color:#606060; */
    }
    .articledetails .time{
        font-size:1.2rem;
        color:#606060;
        margin-bottom:1rem;
    }
    .articledetails .inner{
        font-size:1.6rem;
        padding-top:1rem;
    }
    .innerP p{
        text-indent: 2rem;
        border:1px solid red;
    }
</style>
<style>
    .articledetails .inner img{
        width:100%;
    }
    .innerP p{
        text-indent: 2rem;
        /* border:1px solid red; */
    }
</style>