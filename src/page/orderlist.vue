<!-- 百姓点单 -->
<template>
    <div class="orderlist navigation_bottom">
        <!-- 顶部导航栏 -->
        <div class="top">
            <yd-tab v-model="tab" :horizontal-scroll="isScroll" :prevent-default="false" :item-click="itemClick">
                <template v-if="type && type == 'volunteeractivity'">
                    <yd-tab-panel v-for="(item,index) in navList2" :key="index" :label="item.title"></yd-tab-panel>
                </template>
                <template v-else>
                    <yd-tab-panel v-for="(item,index) in navList1" :key="index" :label="item.title"></yd-tab-panel>
                </template>
            </yd-tab>
        </div>
        <!-- 中部菜单栏 -->
        <div class="middle" v-if="type != 'volunteeractivity' && tab != 1">
            <ul>
                <li v-for="(item,index) in middleNav" :key="index" :class="{active:isActive == index}" @click="changeNav(index)">
                    <router-link to="#">
                        <div class="img">
                            <img :src="item.src" alt="图片">
                        </div>
                        <div class="param">
                            {{item.title}}
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="content">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <ordercontent @showdialogForm="showdialogForm" class="marginbottom" v-for="(item,index) in list" :key="index" :details="item" :type="type" :tab='tab'></ordercontent>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <span slot="doneTip">没有数据啦~~</span>
                <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                <i slot="loadingTip" style="font-size:30px;" class="el-icon-loading"></i>
            </yd-infinitescroll>
        </div>
        <appointDialog :dialogForm="dialogFormVisible" :id="id" @closedialogForm="closedialogForm"></appointDialog>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import ordercontent from '@/components/ordercontent'
    import appointDialog from '@/components/appointDialog'

    import {get_activityList} from '@/api/api'
    import {get_myactivityList} from '@/api/api'
    export default {
        name:'orderlist',
        data(){
            return {
                navList1:[
                    {title:'活动展览',id:1},
                    {title:'我的点单',id:2},
                ],
                navList2:[
                    {title:'活动展览',id:1},
                    {title:'我的活动',id:2},
                ],
                middleNav:[
                    {title:'全部',src:require('../assets/order/all.png'),category:1},
                    {title:'理论宣讲',src:require('../assets/order/lilun.png'),category:1},
                    {title:'教育关爱',src:require('../assets/order/educate.png'),category:1},
                    {title:'文化惠民',src:require('../assets/order/culture.png'),category:1},
                    {title:'创业科技',src:require('../assets/order/keji.png'),category:1},
                    {title:'体育健康',src:require('../assets/order/sport.png'),category:1}
                ],
                list:[],
                isScroll:false,
                tab:this.$route.query.tab,
                type:this.$route.query.type,
                page:1,
                pagesize:5,
                dialogFormVisible:false,
                id:'',
                isActive:0,
            }
        },
        created(){
            this.type && this.type == 'volunteeractivity' ? this.setNavModular({modular:1}) : this.setNavModular({modular:0})
            this.tab == 1 ? this.tab = 1 :this.tab = 0
            if(this.tab == 0){
                this.get_activityList()
            }else if(this.tab == 1){
                this.get_myactivityList()
            }
            console.log(this.tab != 1)
        },
        components:{
            ordercontent,
            appointDialog
        },
        methods:{
            // 切换中部导航
            changeNav(index){
                this.setShowModule({isShow:false})
                this.isActive = index
                this.list = []
                this.page = 1
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
                if(this.tab == 0){
                    this.get_activityList()
                }else if(this.tab == 1){
                    this.get_myactivityList()
                }
            },
            // 显示弹框
            showdialogForm(id){
                //console.log(this.dialogFormVisible)
                this.dialogFormVisible = true
                this.id = id
            },
            // 关闭弹窗
            closedialogForm(){
                //console.log(this.dialogFormVisible)
                this.dialogFormVisible = false
            },
            // 切换导航
            itemClick(key) {
                this.setShowModule({isShow:false})
                this.page = 1
                this.list = []
                this.tab = key
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
                if(this.tab == 0){
                    this.get_activityList()
                }else if(this.tab == 1){
                    this.get_myactivityList()
                }
            },
            // 获取活动列表
            get_activityList(){
                var that = this
                var params = {}
                if(this.type && this.type == 'volunteeractivity'){
                    params.is_team = 1
                }else{
                    params.is_team = 0
                }
                switch(this.isActive){
                    case 0:break;
                    case 1: params.category = 1;break;
                    case 2: params.category = 2;break; 
                    case 3: params.category = 3;break; 
                    case 4: params.category = 4;break; 
                    case 5: params.category = 5;break; 
                }
                params.device = "wx"
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(get_activityList,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                    if(that.list.length == 0){
                        this.setShowModule({isShow:true})
                    }
                })
            },
            // 获取我的活动列表
            get_myactivityList(){
                var that = this
                var params = {}
                if(this.type && this.type == 'volunteeractivity'){
                    params.is_team = 1
                }else{
                    params.is_team = 0
                }
                switch(this.isActive){
                    case 0:break;
                    case 1: params.category = 1;break;
                    case 2: params.category = 2;break; 
                    case 3: params.category = 3;break; 
                    case 4: params.category = 4;break; 
                    case 5: params.category = 5;break; 
                }
                params.device = "wx"
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(get_myactivityList,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                    if(that.list.length == 0){
                        this.setShowModule({isShow:true})
                    }
                })
            },
            loadList(){
                var that = this
                var params = {}
                var url = get_activityList
                if(this.type && this.type == 'volunteeractivity'){
                    params.is_team = 1
                }else{
                    params.is_team = 0
                }
                if(this.tab == 0){
                    url = get_activityList
                }else if(this.tab == 1){
                    url = get_myactivityList
                }
                switch(this.isActive){
                    case 0:break;
                    case 1: params.category = 1;break;
                    case 2: params.category = 2;break; 
                    case 3: params.category = 3;break; 
                    case 4: params.category = 4;break; 
                    case 5: params.category = 5;break; 
                }
                params.device = "wx"
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
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
    .content{
        padding:1rem;
    }
    .marginbottom{
        margin-bottom:1rem;
    }
    .middle{
        background-color:#FFF;
        margin-top:1rem;
    }
    .middle ul{
        display:flex;
        justify-content: space-between;
        padding:0 1rem;
    }
    .middle ul li{
        width:16.666%;
        padding:1rem 0;
    }
    .middle ul li.active{
        background: linear-gradient(to top, #FF9191 0%, #FFF 110%);
    }
    .middle ul li a{
        width:100%;
        height:100%;
        display:block;
    }
    .middle ul li .img{
        height:2rem;
        margin-bottom:5px;
    }
    .middle ul li .img img{
        height:100%;
        display:block;
        margin:0 auto;
    }
    .middle ul li .param{
        text-align: center;
    }
    .middle ul li:not(:first-child) a{
        border-left:1px solid #CCC;
    }
</style>