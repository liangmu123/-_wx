<!-- 志愿者活动 -->
<template>
    <div class="volunteer navigation_bottom">
        <yd-slider autoplay="3000" class="header">
            <yd-slider-item v-for="(item,index) in ad" :key="index">
                <img :src="IMG_PATH + item.image">
            </yd-slider-item>
        </yd-slider>
        <div class="nav">
            <navbar :navList="navList" second="second"></navbar>
        </div>
        <div class="section">
            <volunteersection></volunteersection>
            <secondsection v-for="(item,index) in navList2" :key="index" :id="item.id" :pagesize='3' :url='item.url' :link="item.link"></secondsection>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import navbar from '@/components/navbar'
    import secondsection from '@/components/secondsection'
    import volunteersection from '@/components/volunteersection'

    import {get_helpList} from '@/api/api'
    import {get_activityList} from '@/api/api'
    import {get_module} from '@/api/api'
    // 判断是否是志愿者
    import {is_Volunteer} from '@/api/api'
    import {getbroadcast} from '@/api/api'

    export default {
        name:'volunteer',
        data(){
            return {
                navList:[],
                navList2:[
                    // {id:287,title:'志愿点单',link:'/orderlist?type=volunteeractivity',type:'volunteeractivity',src:require('../assets/volunteer/activity.png'),url:get_activityList},
                    // {id:284,title:'活动讯息',link:'/newInformationlist?id=284',src:require('../assets/volunteer/team.png'),url:get_module},
                    // {id:302,title:'芝麻一点通',link:'/servicelist?type=service',type:'service',src:require('../assets/volunteer/service.png'),url:get_helpList},
                    {id:284,title:'活动资讯',link:'/informationList3?id=284&modular=1',src:require('../assets/volunteer/reward.png'),url:get_module},
                    {id:1019,title:'志愿者风采',link:'/informationList3?id=1019&modular=1',src:require('../assets/volunteer/reward.png'),url:get_module},
                    {id:1085,title:'志愿者培训',link:'/informationList3?id=1085&modular=1',src:require('../assets/volunteer/reward.png'),url:get_module}
                ],
                // navList3:[
                //     // {id:284,title:'活动讯息',link:'/newInformationlist',src:require('../assets/volunteer/team.png'),url:get_module},
                //     // {id:302,title:'芝麻一点通',link:'/servicelist?type=service',type:'service',src:require('../assets/volunteer/service.png'),url:get_helpList},
                //     // {id:302,title:'百姓点单',link:'/oneClick',src:require('../assets/volunteer/service.png')},
                //     {id:287,title:'志愿活动',link:'/orderlist?type=volunteeractivity',type:'volunteeractivity',src:require('../assets/volunteer/activity.png'),url:get_activityList},
                //     {id:1019,title:'志愿风采录',link:'/informationList3?id=1019&modular=1',src:require('../assets/volunteer/reward.png'),url:get_module},
                //     {id:285,title:'加入队伍',link:'/applyteam?type=appeal',src:require('../assets/volunteer/recruit.png')},
                // ],
                navList3:[
                    {id:284,title:'活动资讯',link:'/informationList3?id=284&modular=1',src:require('../assets/volunteer/1.png'),url:get_module},
                    {id:1019,title:'志愿者风采',link:'/informationList3?id=1019&modular=1',src:require('../assets/volunteer/5.png'),url:get_module},
                    {id:287,title:'志愿活动',link:'/orderlist?type=volunteeractivity',type:'volunteeractivity',src:require('../assets/volunteer/2.png'),url:get_activityList},
                    {id:1085,title:'志愿者培训',link:'/informationList3?id=1085&modular=1',src:require('../assets/volunteer/3.png'),url:get_module},
                    {id:1019,title:'加入我们',link:'/volunteerteam',src:require('../assets/volunteer/4.png'),url:get_module}
                ],
                IMG_PATH:IMG_PATH,
                ad:[],
            }
        },
        created(){
            this.setNavModular({modular:1})
            this.navList = this.navList3
            this.getAd()
            // this.is_volunteer()
        },
        mounted(){
            // document.documentElement.scrollTop = 0
        },
        components:{
            navbar,
            secondsection,
            volunteersection
        },
        methods:{
            // 获取广告位
            getAd(){
                var that = this
                var params = {}
                params.position = 12001
                that.$axios.post(getbroadcast,params)
                .then(res=>{
                    that.ad = res.data.data
                })
            },
            is_volunteer(){
                var that = this
                var params = {}
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(is_Volunteer,params)
                .then(res => {
                    if(res.data.code == 10214){
                        that.navList = that.navList4
                    }else{
                        that.navList = that.navList3
                    }
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
    .volunteer{
        min-height:100%;
        background-color: #FFF;
    }
    /* .volunteer ul{
        width:70%;
        margin:0 auto;
        display:flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap:wrap;
        height:100%;
    }
    .volunteer ul li{
        width:100%;
        background-color: #FFF;
        border-radius:10px;
        box-shadow: 1px 1px 5px #aaa;
        padding-left:3rem;
    }
    .volunteer ul li:not(:last-child){
        margin-bottom:2rem;
    }
    .volunteer ul li a{
        width:100%;
        margin:0 auto;
        display:flex;
        justify-content: flex-start;
        align-items: center;
        height:6rem;
    }
    .volunteer ul li a span:first-child{
        width:3rem;
        margin-right:4rem;
    }
    .volunteer ul li a span:first-child img{
        width:100%;
    }
    .volunteer ul li a span:last-child{
        font-size:1.6rem;
    } */
    .nav{
        padding:1rem;
    }
    .header img{
        width:100%;
    }
    .section{
        padding:0 0.3rem;
    }
    .section>div{
        margin-bottom:1rem;
    }
</style>