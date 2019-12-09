<!-- 一点通首页 -->
<template>
    <div class="oneClick navigation_bottom">
        <!-- 搜索框 -->
        <div class="header">
            <yd-search class="ysp_oneClick" v-model.trim="keywords" :on-submit="submitHandler" :on-cancel="cancelHandler"></yd-search>
            <img src="../../assets/oneClick/menu.png" alt="菜单键" class="menuBtn" @click="handleMenuShow">
        </div>
        <div class="menuList" v-show="showMenu">
            <ul class="leftMenuList">
                <li v-for="(item,index) in leftMenuList" :class="{active:leftActive == index}" @click="getSecondColumn(item.id,index)">{{item.title}}</li>
            </ul>
            <ul class="rightMenuList">
                <li v-for="(item,index) in rightMenuList" :class="{active:rightActive == index}" @click="getList(item.id,index)">{{item.title}}</li>
            </ul>
        </div>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
                <div class="content">
                    <indexlist class="marginBottom" v-for="(item,index) in list" :key="index" :details="item" @click.native="jump(item.id)"></indexlist>
                </div>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <i slot="loadingTip" style="font-size:30px;" class="el-icon-loading"></i>
        </yd-infinitescroll>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    // 引入组件
    import indexlist from '@/components/oneClick/indexlist'
    // 引入接口
    import {column} from '@/api/api'
    import {allColumnData} from '@/api/api'
    export default {
        name:'oneClick',
        data(){
            return {
                keywords:'',//关键字搜索
                showMenu:false,//展开列表
                // 左侧大栏目列表
                leftMenuList:[],
                leftActive:'空',
                // 右侧栏目列表
                rightMenuList:[],
                rightActive:'空',
                page:1,
                pagesize:10,
                list:[],
                cate_id:'',
            }
        },
        components:{
            indexlist,
        },
        created(){
            this.setNavModular({modular:1})
            this.getFirstColumn()
            this.getAllList()
        },
        methods:{
            // 获取所有栏目下数据
            getAllList(){
                var that = this
                var params = {}
                params.keywords = that.keywords
                params.page = that.page
                params.pagesize = that.pagesize
                that.$axios.post(allColumnData,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                })
            },
            // 获取一级栏目
            getFirstColumn(){
                var that = this
                var params = {}
                params.id = 0
                that.$axios.post(column,params)
                .then(res=>{
                    that.leftMenuList = res.data.data
                })
            },
            // 获取二级栏目
            getSecondColumn(id,index){
                this.leftActive = index
                this.rightActive = '空'
                this.rightMenuList = []
                this.cate_id = ''
                var that = this
                var params = {}
                params.id = id
                that.$axios.post(column,params)
                .then(res=>{
                    that.rightMenuList = res.data.data
                })
            },
            // 二级栏目下数据
            getList(id,index){
                this.rightActive = index
                this.list = []
                this.page = 1
                this.cate_id = id
                var that = this
                var params = {}
                params.cate = id
                params.keywords = that.keywords
                params.page = that.page
                params.pagesize = that.pagesize
                that.$axios.post(allColumnData,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                })
            },
            // 展开或折叠菜单列表
            handleMenuShow(){
                this.showMenu = !this.showMenu
                if(!this.showMenu){
                    this.page = 1
                    this.list = []
                    this.cate_id = ''
                    this.leftActive = '空'
                    this.rightActive = '空'
                    this.getAllList()
                }
            },
            // 搜索关键字
            submitHandler(){
                this.list = []
                this.page = 1
                var that = this
                var params = {}
                if(this.cate_id !== ''){
                    params.cate = this.cate_id
                }
                params.keywords = that.keywords
                params.page = that.page
                params.pagesize = that.pagesize
                that.$axios.post(allColumnData,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                })
            },
            // 取消
            cancelHandler(){
                this.list = []
                this.page = 1
                this.keywords = ''
                var that = this
                var params = {}
                if(this.cate_id !== ''){
                    params.cate = this.cate_id
                }
                params.page = that.page
                params.pagesize = that.pagesize
                that.$axios.post(allColumnData,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                })

            },
            // 跳转详情列表
            jump(id){
                this.$router.push({name:'oneClickList',query:{id:id}})
            },
            loadList() {
                var that = this
                var params = {}
                if(this.cate_id !== ''){
                    params.cate = this.cate_id
                }
                params.keywords = that.keywords
                params.page = that.page
                params.pagesize = that.pagesize
                that.$axios.post(allColumnData,params)
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
                'setNavModular'
            ]),
        },
    }
</script>
<style scoped>
    .header{
        position:relative;
    }
    .menuBtn{
        width:25px;
        height:25px;
        position:absolute;
        left:10px;
        top:15px;
    }
    .menuList{
        font-size:1.8rem;
        display:flex;
        color:#606060;
    }
    .leftMenuList{
        background-color:#FFF;
        width:40%;
        padding:1rem;
        height:240px;
        overflow:auto;
    }
    .leftMenuList>li{
        text-align: center;
    }
    .leftMenuList>li.active{
        color:#3C7BFF;
    }
    .leftMenuList>li:not(:last-child){
        margin-bottom:1rem;
    }
    .rightMenuList{
        width:60%;
        height:240px;
        overflow:auto;
        font-size:1.6rem;
        padding:1rem;
    }
    .rightMenuList>li{
        text-align: center;
    }
    .rightMenuList>li.active{
        color:#3C7BFF;
    }
    .rightMenuList>li:not(:last-child){
        margin-bottom:2rem;
    }
    .content{
        padding:1rem;
    }
    .marginBottom{
        background-color:#FFF;
        margin-bottom: 1rem;
        padding:1rem 1rem 0 1rem;
    }
</style>
<!-- 修改组件样式 -->
<style>
    .ysp_oneClick .yd-search-input{
        background-color:transparent;
        padding-left:50px;
    }
    .ysp_oneClick .search-input{
        border-radius:50px;
    }
    .ysp_oneClick .yd-search-input>.search-input{
        height:35px;
        padding-left:10px;
    }
</style>