<!-- 志愿者活动 -->
<template>
    <div class="interactive navigation_bottom">
        <!-- 顶部导航栏 -->
        <div class="top">
            <yd-tab v-model="tab" :horizontal-scroll="false" :prevent-default="false" :item-click="itemClick">
                <yd-tab-panel v-for="(item,index) in navList" :key="index" :label="item.title"></yd-tab-panel>
            </yd-tab>
        </div>
        <div class="content" v-if="tab == 0" style="padding:0 1rem;">
            <div class="top">
                <p>{{details.integral}}</p>
                <p>当前积分</p>
            </div>
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                        <integralDetails v-for="(item,index) in list" :key="index" :details="item"></integralDetails>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <span slot="doneTip">没有数据啦~~</span>
                <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                <i slot="loadingTip" style="font-size:30px;" class="el-icon-loading"></i>
            </yd-infinitescroll>
        </div>
        <div class="content2" v-else>
            <getIntegral></getIntegral>
        </div>
    </div>
</template>
<script>
    import integralDetails from '@/components/integralDetails'
    import getIntegral from '@/components/getIntegral'
    import {integralLog} from '@/api/api'
    import { mapActions } from 'vuex'
    import {get_userInfo} from '@/api/api'
    export default {
        name:'interactive',
        data(){
            return {
                navList:[
                    {title:'积分明细',link:'/orderlist',src:require('../assets/interactive/order.png')},
                    {title:'积分规则',link:'/votelist',src:require('../assets/interactive/vote.png')}
                ],
                IMG_PATH:IMG_PATH,
                tab:0,
                list:[],
                page:1,
                pagesize:10,
                details:{},
            }
        },
        created(){
            this.setNavModular({modular:3})
            this.get_integralLog()
            this.get_userInfo()
        },
        components:{
            integralDetails,
            getIntegral
        },
        methods:{
            get_userInfo(){
                var that = this
                var params = {}
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(get_userInfo,params)
                .then(res=>{
                    that.details = res.data.data
                })
            },
            get_integralLog(){
                var that = this
                var params = {}
                params.page = this.page
                params.pagesize = this.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(integralLog,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                })
            },
            // 切换导航
            itemClick(key) {
                this.setShowModule({isShow:false})
                this.page = 1
                this.list = []
                this.tab = key
                if(!key){
                    this.get_integralLog()
                }else{
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
                }
            },
            loadList(){
                var that = this
                var params = {}
                params.page = this.page
                params.pagesize = this.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(integralLog,params)
                .then(function (response) {
                    const _list = response.data.data.items
                    that.list = [...that.list, ..._list]
                    if (that.page >= response.data.data.totalpage) {
                    /* 所有数据加载完毕 */
                    that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                    return;
                    }
                    /* 单次请求数据完毕 */
                    that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
                    that.page++;
                })
                .catch(function (error) {

                })
            },
            ...mapActions([
                'setNavModular',
                'setShowModule'
            ]),
        }
    }
</script>
<style scoped>
    .interactive{
        min-height:100%;
        background-color:#FFF;
    }
    .nav{
        padding:1rem;
    }
    .header img{
        width:100%;
    }
    .nav ul{
        display:flex;
        background-color: #FFF;
        padding:1rem;
    }
    .nav ul li{
        width:50%;
    }
    .nav ul li:last-child{
        border-left:1px solid #ddd;
    }
    .nav ul li a{
        width:100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .nav ul li a span:first-child{
        width:3rem;
        margin-right:2rem;
    }
    .nav ul li a span:first-child img{
        width:100%;
    }
    .nav ul li a span:last-child{
        font-size:1.6rem;
        line-height:5rem;
    }
    .section{
        padding:0 1rem;
    }
    .section>div{
        margin-bottom:1rem;
    }
    .content2{
        padding:1rem 2rem 2rem 2rem;
    }
    .content .top{
        background:linear-gradient(-81deg,rgba(224,141,140,1),rgba(220,21,23,1));
        padding:1rem 0;
        margin:1rem 0;
    }
    .content .top p:first-child{
        font-size:4rem;
        color:#FFF;
        text-align: center;
    }
    .content .top p:last-child{
        font-size:2rem;
        color:#FFF;
        text-align: center;
    }
</style>