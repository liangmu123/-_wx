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
        <ul class="statistics">
            <li v-for="(item,index) in statistics" :key="index">
                <span>{{item.value}}</span>
                <span>{{item.title}}</span>
            </li>
        </ul>
        <div class="section">
            <volunteersection></volunteersection>
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
    import {is_Volunteer,get_userInfo} from '@/api/api'
    import {getbroadcast,get_Statistics} from '@/api/api'

    export default {
        name:'volunteer',
        data(){
            return {
                navList:[],
                navList2:[
                    {id:249,title:'志愿者风采',link:'/infoList?id=249',src:require('../assets/volunteer/2222.png')},
                    {id:284,title:'我来帮忙',link:'/oneClickList',src:require('../assets/volunteer/11.png'),url:get_module},
                    {id:1019,title:'我要求助',link:'/appeal',src:require('../assets/volunteer/22.png'),url:get_module},
                    {id:1085,title:'扫码打卡',link:'#',src:require('../assets/volunteer/33.png'),url:get_module},
                    
                    {id:287,title:'活动招募',link:'/orderlist?type=volunteeractivity',type:'volunteeractivity',src:require('../assets/volunteer/44.png'),url:get_activityList},
                    {id:1019,title:'加入我们',link:'/volunteerteam',src:require('../assets/volunteer/reward.png'),url:get_module}
                ],
                navList3:[
                    {id:1098,title:'志愿者风采',link:'/infoList?id=1098',src:require('../assets/volunteer/2222.png')},
                    {id:284,title:'我来帮忙',link:'/oneClickList',src:require('../assets/volunteer/11.png'),url:get_module},
                    {id:1019,title:'我要求助',link:'/appeal',src:require('../assets/volunteer/22.png'),url:get_module},
                    {id:1085,title:'扫码打卡',link:'#',src:require('../assets/volunteer/33.png'),url:get_module},
                    {id:287,title:'活动招募',link:'/orderlist?type=volunteeractivity',type:'volunteeractivity',src:require('../assets/volunteer/44.png'),url:get_activityList},
                    
                    {id:287,title:'成为志愿者',link:'/applyvolunteer',src:require('../assets/volunteer/55.png')}
                ],
                IMG_PATH:IMG_PATH,
                ad:[],
                statistics:[
                    {title:'志愿者人数',value:0},
                    {title:'活动数量',value:0},
                    {title:'活动时长',value:0}
                ],
                details:{}
            }
        },
        created(){
            this.setNavModular({modular:1})
            this.getAd()
            this.get_userInfo()
            this.get_Statistics()
            
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
            get_userInfo(){
                var that = this
                var params = {}
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(get_userInfo,params)
                .then(res=>{
                    that.details = res.data.data
                    if(that.details.volunteer_status == 0){
                        this.navList = this.navList3
                    }else{
                        this.navList = this.navList2
                    }
                })
            },
            get_Statistics(){
                var that = this
                var params = {

                }
                that.$axios.post(get_Statistics,params)
                .then(res=>{
                    that.statistics[0].value = res.data.data.volunteer_num
                    that.statistics[1].value = res.data.data.volunteer_activity_num
                    that.statistics[2].value = res.data.data.activity_time
                })
            },
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
    .statistics{
        width:90%;
        margin:0 auto;
        display:flex;
        justify-content: space-between;
    }
    .statistics li{
        width:30%;
        background-color:#FFF;
        box-shadow: 0 2px 3px #ddd;
        display:flex;
        flex-direction: column;
        align-items: center;
        padding:0.5rem;
    }
    .statistics li>span:first-child{
        color:#333333;
        font-size:2rem;
        line-height:2rem;
        margin-bottom:0.5rem;
    }
    .statistics li>span:last-child{
        color:#A0A0A0;
        font-size:1.4rem;
        line-height:1.4rem;
    }
</style>