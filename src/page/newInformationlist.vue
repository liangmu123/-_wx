<!-- 活动列表 -->
<template>
    <div class="informationlist navigation_bottom" v-if="ysp_show">
        <!-- 顶部导航栏 -->
        <div class="top" v-if="navList.length>0">
            <yd-tab v-model="tab" :horizontal-scroll="isScroll" :prevent-default="false" :item-click="itemClick">
                <yd-tab-panel v-for="(item,index) in navList" :key="index" :label="item.name"></yd-tab-panel>
            </yd-tab>
        </div>

        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">

                <!-- 视频资讯混合列表 -->
                <div class="infoContent">
                    <template v-for="(item,index) in list">
                        <videocontent v-if="item.tpe == 4" class="video" :key="index" link="videodetails" :type="type" :details="item" :id="item.id"></videocontent>
                        <articlecontent v-if="item.tpe == 2 || item.tpe == 1 || item.tpe == 3" class="article" :key="index" link="articledetails" :type="type" :details="item" :id="item.id"></articlecontent>
                    </template>
                </div>

            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <i slot="loadingTip" style="font-size:30px;" class="el-icon-loading"></i>
        </yd-infinitescroll>
        <appointDialog :dialogForm="dialogFormVisible" :id="article_id" @closedialogForm="closedialogForm"></appointDialog>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { mapState } from 'vuex'

    import videocontent from '@/components/videocontent'
    import activitycontent from '@/components/activitycontent'
    import articlecontent from '@/components/articlecontent'
    import volunteercontent from '@/components/volunteercontent'
    import appointDialog from '@/components/appointDialog'

    import {get_child_nav} from '@/api/api'
    import {get_module} from '@/api/api'
    import {get_activityList} from '@/api/api'
    import $ from 'jquery'
    export default {
        name:'newInformationlist',
        data(){
            return {
                id:this.$route.query.id,
                tab:0,
                isScroll:false,
                navList:[],
                type:this.$route.query.type,
                link:'',
                pagesize:10,
                page:1,
                nav_id:0,
                list:[],
                dialogFormVisible:false,
                article_id:'',
                category:0,
                ysp_show:true,
            }
        },
        components:{
            videocontent,
            articlecontent,
            volunteercontent,
            activitycontent,
            appointDialog
        },
        // watch:{
        //     // 监听路由 合理缓存
        //     $route(to,from){
        //         //console.log(val.name)
        //         console.log(to)
        //         console.log(from)
        //         this.list = []
        //         this.type = this.$route.query.type
        //         this.id = this.$route.query.id
        //         this.judgetype()
        //     },
        // },
        created(){
            
        },
        mounted(){
            this.judgetype()
        },
        beforeRouteLeave (to, from , next) {
            // 离开前设置"缓存"
            var that = this
            if(document.getElementsByClassName('yd-tab-box')[0]){
                that.SET_TOP_MUTATIONS({top:document.getElementsByClassName('yd-tab-box')[0].scrollLeft})
                .then(function(){
                    next()
                })
            }else{
                next()
            }
            // .then(
            //     that.SET_LIST_MUTATIONS({list:that.list})
            // )
            // .then(
            //     that.SET_TAB_MUTATIONS({tab:that.tab})
            // )
            // .then(
            //     that.SET_PAGE_MUTATIONS({page:++that.page})
            // )
            // .then(
            //     that.SET_ID_MUTATIONS({id:that.nav_id})
            // )
            
        },
        computed:{
            ...mapState({
                top:state => state.keepAlive.top,
                oldList:state => state.keepAlive.list,
                oldTab:state => state.keepAlive.tab,
                oldPage:state => state.keepAlive.page,
                oldID:state => state.keepAlive.id,
            })
        },
        activated(){
            var that = this
            this.ysp_show = false
            this.type = 'article'
            if(this.$route.query.id == 284 || this.$route.query.id == 1019){
                this.type = 'article2'
                this.setNavModular({modular:1})
            }else{
                this.setNavModular({modular:0})
            }
            if(this.id == this.$route.query.id){
                setTimeout(function(){
                    that.ysp_show = true
                },500)
                this.judgeNavLength()
                return
            }
            this.id = this.$route.query.id
            this.get_child_nav()
        },
        methods:{
            // 显示弹框
            showdialogForm(id){
                //console.log(this.dialogFormVisible)
                this.dialogFormVisible = true
                this.article_id = id
            },
            // 关闭弹窗
            closedialogForm(){
                //console.log(this.dialogFormVisible)
                this.dialogFormVisible = false
            },
            // 获取子导航
            get_child_nav(){
                var that = this
                var param = {}
                param.device = 'wx'
                param.id = that.id
                that.$axios.post(get_child_nav,param)
                .then(res => {
                    that.SET_TOP_MUTATIONS({top:0})
                    that.isScroll = false
                    that.navList = res.data.data
                    // 判断是否可滑动
                    that.judgeNavLength()
                    // 获取进入后得第一个导航数据
                    if(!that.navList.length){
                        that.nav_id = that.$route.query.id
                        that.page = 1
                        console.log(that.navList,444)
                        that.navList = []
                    }else{
                        that.nav_id = that.navList[0].data_id
                        that.type = that.navList[0].data_tpe
                        that.category = that.navList[0].link
                        that.tab = 0
                        that.page = 1
                    }
                    //console.log(that.oldList.length,2222)
                    // if(that.oldList.length == 0){
                    //     that.getContentList()
                    // }else{
                    //     that.list = that.oldList
                    //     that.$nextTick(function(){
                    //         that.tab = that.oldTab
                    //         that.page = that.oldPage
                    //         that.nav_id = that.oldID
                    //         document.documentElement.scrollTop = that.top
                    //     })
                    // }
                    //console.log(res)
                    that.getContentList()
                })
                .catch(err => {
                    console.log(err)
                })
            },
            // 判断当前类型
            judgetype(){
                if(this.type && this.type == 'vote'){
                    // 投票篇
                    this.setNavModular({modular:2})
                    this.link = 'volunteerdetails'
                }else if(this.type && this.type == 'team'){
                    // 志愿队伍篇
                    this.setNavModular({modular:1})
                    this.link = 'volunteerdetails'
                    this.nav_id = this.$route.query.id
                    var that = this
                    // 设置"缓存"
                    // if(that.oldList.length == 0){
                    //     that.getContentList()
                    // }else{
                    //     that.list = that.oldList
                    //     that.$nextTick(function(){
                    //         that.tab = that.oldTab
                    //         that.page = that.oldPage
                    //         that.nav_id = that.oldID
                    //         document.documentElement.scrollTop = that.top
                    //     })
                    // }
                    this.getContentList()
                }else if(this.type && this.type == 'article'){
                    // 资讯列表
                    this.setNavModular({modular:0})
                    this.link = 'articledetails'
                    this.get_child_nav()
                }else if(this.type && this.type == 'article2'){
                    // 底部二导航资讯列表
                    this.setNavModular({modular:1})
                    this.link = 'articledetails'
                    this.nav_id = this.id
                    this.getContentList()
                }else if(this.type && this.type == 'video'){
                    // 视频列表
                    this.setNavModular({modular:0})
                    this.link = 'videodetails'
                }else if(this.type && this.type == 'activity'){
                    // 视频列表
                    this.setNavModular({modular:0})
                    this.link = 'activitydetails'
                }else{
                    this.setNavModular({modular:0})
                    this.get_child_nav()
                }
            },
            // 判断导航数量是否大于4，控制滚动
            judgeNavLength(){
                //alert(1)
                this.isScroll = this.navList.length > 4 ? true : false
                if(!this.isScroll){
                    this.$nextTick(function(){
                        if(document.getElementsByClassName('yd-tab-nav')[0]){
                            document.getElementsByClassName('yd-tab-nav')[0].style.width = "auto"
                        }
                    })
                }else{
                    var that = this
                    setTimeout(function(){
                        if($(".yd-tab-nav")){
                                that.$nextTick(function(){
                                    var w=0
                                    $(".yd-tab-nav .yd-tab-nav-item").each(function() {
                                        //console.log($(this).width(),333)
                                        w+=parseInt($(this).width()+45)
                                    })
                                    $(".yd-tab-nav").width(w)
                                    that.$nextTick(function(){
                                        $('.yd-tab-box').scrollLeft(that.top)
                                    })
                                })
                        }
                    },500)
                }
            },
            // 切换导航
            itemClick(key) {
                this.setShowModule({isShow:false})
                this.page = 1
                this.list = []
                this.tab = key
                this.nav_id = this.navList[key].data_id
                this.type = this.navList[key].data_tpe
                this.category = this.navList[key].link
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
                this.getContentList()
            },
            getContentList(){
                var that = this
                var params = {}
                var url = ''
                if(this.type == 'activity'){
                    params.is_team = 0
                    params.device = "wx"
                    params.category = that.category
                    params.page = that.page
                    params.pagesize = that.pagesize
                    params.access_token = window.localStorage.getItem('access_token')
                    url = get_activityList
                }else{
                    params.cid = that.nav_id
                    params.device = 'wx'
                    params.page = that.page
                    params.pagesize = that.pagesize
                    url = get_module
                }
                that.$axios.post(url,params)
                .then(res =>{
                    that.list = res.data.data.items
                    that.ysp_show = true
                    that.page ++
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                    }
                })
            },
            loadList() {
                var that = this
                var params = {}
                var url = ''
                if(this.type == 'activity'){
                    params.is_team = 0
                    params.device = "wx"
                    params.category = that.category
                    params.page = that.page
                    params.pagesize = that.pagesize
                    params.access_token = window.localStorage.getItem('access_token')
                    url = get_activityList
                }else{
                    params.cid = that.nav_id
                    params.device = 'wx'
                    params.page = that.page
                    params.pagesize = that.pagesize
                    url = get_module
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
            // 投票
            vote(){
                alert(11)
            },
            ...mapActions([
                'setNavModular',
                'setShowModule',
                'SET_TOP_MUTATIONS',
                'SET_TAB_MUTATIONS',
                'SET_LIST_MUTATIONS',
                'SET_PAGE_MUTATIONS',
                'SET_ID_MUTATIONS'
            ]),
        }
    }
</script>
<style scoped>
    .informationlist{
        min-height:100%;
    }
    .infoContent{
        padding:1rem;
    }
    .video{
        margin-bottom:1rem;
    }
    .activity{
        margin-bottom:1rem;
    }
    .article{
        border-bottom:1px solid #ddd;
        background-color:#fff;
        padding:1rem 0;
    }
    .volunteerbottom{
        padding:1rem;
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .volunteermargin{
        margin-bottom:2rem;
    }
    /* 投票css */
    .vote{
        text-align:center;
        line-height:3rem;
        font-size:1.2rem;
        color:#FFF;
        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
        background: -webkit-linear-gradient(#FFB1B1, #F60F0F); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FFB1B1, #F60F0F); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FFB1B1, #F60F0F); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FFB1B1, #F60F0F); /* 标准的语法 */
    }
    /* 志愿者队伍 */
    .team{
        text-align: center;
        line-height:3rem;
        font-size:1.2rem;
        color:#606060;
    }
</style>