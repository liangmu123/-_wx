<!-- 志愿服务列表 -->
<template>
    <div class="servicelist navigation_bottom">
        <!-- 顶部导航栏 -->
        <div class="top" v-if="type && type == 'myservice'">
            <yd-tab v-model="tab2" :prevent-default="false" :item-click="itemClick2">
                <yd-tab-panel v-for="(item,index) in navList2" :key="index" :label="item.title"></yd-tab-panel>
            </yd-tab>
        </div>
        <!-- 顶部导航栏 -->
        <div class="top">
            <yd-tab v-model="tab" :horizontal-scroll="isScroll" :prevent-default="false" :item-click="itemClick">
                <yd-tab-panel v-for="(item,index) in navList" :key="index" :label="item"></yd-tab-panel>
            </yd-tab>
        </div>
        <div class="middle">
            <ul>
                <li v-for="(item,index) in navtab" :key="index" :class="{active:isActive == index}" @click="isActive = index">{{item.type}}</li>
            </ul>
        </div>
        <div class="content">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <servicecontent class="borderbottom" v-for="(item,index) in list" :key="index" :details="item" :type="type" :show="isShow"></servicecontent>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <span slot="doneTip">没有数据啦~~</span>
                <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                <i slot="loadingTip" style="font-size:30px;" class="el-icon-loading"></i>
            </yd-infinitescroll>
        </div>
        <router-link to="applyservice">
            <img class="service" src="../assets/service/service.png" alt="发布接口">
        </router-link>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import servicecontent from '@/components/servicecontent'
    import {get_helpList} from '@/api/api'
    import {get_myQiuzhuList} from '@/api/api'
    import {get_myHelpList} from '@/api/api'
    export default {
        name:'servicelist',
        data(){
            return {
                tab:0,
                tab2:0,
                navList:["全部","社会治理","家庭修配","陪护老人",
                        "生活缴费","咨询辅导","日用代购",
                        "预约预定","法律服务","其他类型"],
                navList2:[
                    {title:'我的帮助',id:1,type:'article'},
                    {title:'我的求助',id:1,type:'article'}
                ],
                isScroll:true,
                isActive:0,
                navtab:[
                    {type:'全部',status:''},
                    {type:'求助中',status:0},
                    {type:'已接单',status:1},
                    {type:'已完成',status:2}
                ],
                type:this.$route.query.type,
                page:1,
                pagesize:10,
                list:[],
                nav_id:0,
                status:'',
                helpType:"全部",
                isShow:'false',//是否显示评价
            }
        },
        created(){
            this.setNavModular({modular:1})
            if(this.type == 'myservice'){
                this.get_myHelpList()
            }else{
                this.get_service_list()
            }
        },
        watch:{
            isActive(val){
                this.setShowModule({isShow:false})
                if(val == 0){
                    this.status = ''
                }else{
                    this.status = val - 1
                }
                this.list = []
                this.page = 1
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
                if(this.type == 'myservice' && this.tab2 == 0){
                    this.get_myHelpList()                    
                }else if(this.type == 'myservice' && this.tab2 == 1){

                    this.get_myQiuzhuList()
                }else{
                    this.get_service_list()
                }
            },
        },
        components:{
            servicecontent,
        },
        methods:{
            // 切换导航
            itemClick(key) {
                this.setShowModule({isShow:false})
                this.page = 1
                this.list = []
                this.tab = key
                this.helpType = this.navList[key]
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
                if(this.type == 'myservice' && this.tab2 == 0){
                    this.get_myHelpList()
                }else if(this.type == 'myservice' && this.tab2 == 1){
                    this.get_myQiuzhuList()
                }else{
                    this.get_service_list()
                }
            },
            // 切换导航
            itemClick2(key) {
                this.setShowModule({isShow:false})
                this.page = 1
                this.list = []
                this.tab2 = key
                if(this.tab2 == 1){
                    this.isShow = 'true'
                }else{
                    this.isShow = 'false'
                }
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
                if(this.tab2 == 0){
                    this.get_myHelpList()
                }else if(this.tab2 == 1){
                    this.get_myQiuzhuList()
                }
            },
            // 获取所有帮助信息
            get_service_list(){
                var that = this
                var param = {}
                param.cid = that.nav_id
                param.device = 'wx'
                param.page = that.page
                param.pagesize = that.pagesize
                if(that.helpType != '全部'){
                    param.type = that.helpType
                }
                if(that.status !== ''){
                    param.status = that.status
                }
                that.$axios.post(get_helpList,param)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                    }
                })
                .catch(err=>{

                })
            },
            // 获取我的求助信息
            get_myQiuzhuList(){
                var that =this
                var params = {}
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                if(that.helpType != '全部'){
                    params.type = that.helpType
                }
                if(that.status !== ''){
                    params.status = that.status
                }
                that.$axios.post(get_myQiuzhuList,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                    }
                })
            },
            // 获取我的帮助信息列表
            get_myHelpList(){
                var that =this
                var params = {}
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                if(that.helpType != '全部'){
                    params.type = that.helpType
                }
                if(that.status !== ''){
                    params.status = that.status
                }
                that.$axios.post(get_myHelpList,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                    }
                })
            },
            loadList(){
                var that = this
                var params = {}
                var url = get_helpList
                params.page = that.page
                params.pagesize = that.pagesize
                if(that.helpType != '全部'){
                    params.type = that.helpType
                }
                if(that.status !== ''){
                    params.status = that.status
                }
                if(that.type == 'myservice'){
                    params.access_token = window.localStorage.getItem('access_token')
                }
                if(that.helpType != '全部'){
                    params.type = that.helpType
                }
                if(that.status !== ''){
                    params.status = that.status
                }
                if(that.tab2 && that.tab2 == 0){
                    url = get_myHelpList
                }
                if(that.tab2 && that.tab2 == 1){
                    url = get_myQiuzhuList
                }
                that.$axios.post(url,params)
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
    .servicelist{
        position: relative;
    }
    .middle ul{
        display:flex;
        justify-content: space-between;
        padding:1rem;
    }
    .middle ul li{
        background-color:#ABABAB;
        width:18%;
        font-size:1.6rem;
        line-height:3rem;
        color:#FFF;
        text-align: center;
        border-radius:4px;
    }
    .middle ul li.active{
        background: -webkit-linear-gradient(#FF6666, #B60000); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FF6666, #B60000); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FF6666, #B60000); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FF6666, #B60000); /* 标准的语法 */
        box-shadow: 1px 1px 5px #AAA;
    }
    .content{
        padding:0 1rem 1rem 1rem;
    }
    .servicelist a{
        position:fixed;
        right:4rem;
        bottom:10rem;
        width:5rem;
    }
    .service{
        width:100%;
    }
    .borderbottom:not(:last-child){
        border-bottom:1px solid #ddd;
    }
</style>