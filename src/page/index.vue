<!-- 首页 -->
<template>
    <div class="index navigation_bottom">
        <yd-slider autoplay="3000" class="header">
            <yd-slider-item v-for="(item,index) in ad" :key="index">
                <img :src="IMG_PATH + item.image">
            </yd-slider-item>
        </yd-slider>

        <div class="nav">
            <navbar :navList="navList"></navbar>
        </div>
        
        <div class="newnav">
            <!-- <ul>
                <li v-for="(item,index) in navList2" :key="index">
                    <router-link :to="item.link">
                        <img :src="item.src" alt="图片">
                    </router-link>
                </li>
            </ul> -->
            <ul>
                <li style="background-color:#FFF;box-shadow:0 2px 5px #DDD;padding:1.2rem 1rem;" v-for="(item,index) in navList2" :key="index">
                    <router-link :to="item.link" style="display:flex;align-items:center;justify-content:space-between;">
                        <div>
                            <p style="font-size:1.6rem;">{{item.title}}</p>
                            <p style="color:#999;font-size:1.2rem;margin-top:0.3rem;">{{item.desc}}</p>
                        </div>
                        <div>
                            <img :src="item.src" alt="图片" style="width:3.5rem;">
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        
        <div class="section">
            <indexsection v-for="(item,index) in indexlist" :key="index" :id="item.id" :data_id="item.data_id" :pagesize='3' :url='url'></indexsection>
        </div>
        <!-- test -->
        <!-- <inputnumber v-model="num"></inputnumber> -->
        <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import navbar from '@/components/navbar'
    import indexsection from '@/components/indexsection'
    // import inputnumber from '@/components/inputnumber'

    import {get_nav} from '@/api/api'
    // 已废弃
    // import {get_article_index} from '@/api/api'
    import {getbroadcast} from '@/api/api'
    import {get_module} from '@/api/api'
    
    export default {
        name:'index',
        data(){
            return {
                // num:1,
                navList:[
                    {id:45,title:'理论宣讲',link:'/informationList',src:require('../assets/nav/theory.png')},
                    {id:46,title:'教育关爱',link:'/informationList',src:require('../assets/nav/educate.png')},
                    {id:47,title:'文化惠民',link:'/informationList',src:require('../assets/nav/culture.png')},
                    {id:48,title:'创业科技',link:'/informationList',src:require('../assets/nav/technology.png')},
                    {id:49,title:'体育健康',link:'/informationList',src:require('../assets/nav/health.png')},
                    // {id:1059,title:'社会治理',link:'/newInformationlist',src:require('../assets/nav/government.png')},
                    // {id:1060,title:'创业就业',link:'/newInformationlist',src:require('../assets/nav/entrepreneurship.png')},
                    // {id:40,title:'随手拍',link:'/takephotolist',src:require('../assets/nav/shoot.png')},
                ],
                navList2:[
                    // {id:197,link:'newInformationlist',src:require('../assets/nav/xijinping.png')},
                    // {link:'/supermarket',src:require('../assets/nav/shopping.png')},
                    // {link:'/suggest',src:require('../assets/nav/xijinping.png'),title:'建言献策',desc:'发布对平台的想法'},
                    // {link:'/live',src:require('../assets/nav/shopping.png'),title:'活动直播',desc:'在线观看现场活动'}
                    {link:'/order',src:require('../assets/nav/xijinping.png'),title:'百姓点单',desc:'收集百姓的活动需求'},
                    {link:'/orderlist',src:require('../assets/nav/shopping.png'),title:'活动计划',desc:'按需发布活动展示'}
                ],
                indexlist:[
                    {id:252,data_id:45,title:'理论宣讲',link:'/informationList'},
                    {id:253,data_id:46,title:'教育关爱',link:'/informationList'},
                    {id:254,data_id:47,title:'文化惠民',link:'/informationList'},
                    {id:255,data_id:48,title:'创业科技',link:'/informationList'},
                    {id:256,data_id:49,title:'体育健康',link:'/informationList'}
                    // {id:1059,data_id:1059,title:'社会治理',link:'/newInformationlist'},
                    // {id:1060,data_id:1060,title:'创业就业',link:'/newInformationlist'},
                    // {id:44,title:'随手拍',link:'/takephotolist'},
                ],
                url:get_module,
                IMG_PATH:IMG_PATH,
                ad:[],//广告图片
            }
        },
        created(){
            this.setNavModular({modular:0})
            this.getAd()
            this.get_nav()
        },
        // watch:{
        //     num(val){
        //         console.log(typeof val)
        //     }
        // },
        components:{
            navbar,
            indexsection,
            // inputnumber
        },
        methods:{
            // 获取首页导航
            get_nav(){
                var that = this
                var param = {}
                that.$axios.post(get_nav,param)
                .then(res => {
                    //console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            },
            // 获取广告位
            getAd(){
                var that = this
                var params = {}
                params.position = 10001
                that.$axios.post(getbroadcast,params)
                .then(res=>{
                    that.ad = res.data.data
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
            // open() {
            //     this.$prompt('请输入邮箱', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     inputValidator:function(value){
            //         if(value === null || value.trim() === ""){
            //             return '不能为空'
            //         }
            //         return true
            //     },
            //     })
            // },
        }
    }
</script>
<style scoped>
    .index{
        background-color:#FFF;
    }
    .header img{
        width:100%;
    }
    .index .nav{
        padding:1rem;
    }
    .section{
        padding:0 0.3rem;
    }
    .section>div{
        margin-bottom:1rem;
    }
    .newnav{
        padding:0 1rem 0 1rem;
    }
    .newnav ul{
        background-color:#FFF;
        display:flex;
        justify-content: space-between;
        padding:0 1rem;
    }
    .newnav ul li{
        width:48%;
    }
    .newnav ul li img{
        width:100%;
    }
</style>