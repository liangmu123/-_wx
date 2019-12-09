<!-- 图文混编列表 -->
<template>
    <div class="informationList navigation_bottom">
        <header-nav-tab class="header_nav_tab" :active="nowActive" @handleClick="handleClick" :navlist="navlist"></header-nav-tab>
        <section v-show="list.length > 0">
            <infinitescroll @loadData="get_list" :page="page" :pagesize="pagesize" :totalpage="totalpage" :list="list">
                <infoList v-for="(item,index) in list" modular="0" :key="index" :details="item"></infoList>
            </infinitescroll>
        </section>
    </div>
</template>
<script>
    /**
     * 
     * @param {*} headerNavTab  导航条组件
     * @param {*} infoList   图文混编列表组件 tpe区分
     * @param {*} infinitescroll 滚动加载组件
     */
    import headerNavTab from '@/components/headerNavTab'
    import infoList from '@/components/infoList'
    import infinitescroll from '@/components/infinitescroll'

    import {get_child_nav} from '@/api/api'
    import {get_module} from '@/api/api'
    import {get_activityList} from '@/api/api'

    import { mapActions } from 'vuex'
    import { mapState } from 'vuex'

    export default {
        name:'informationList',
        data(){
            return {
                page:1,
                pagesize:10,
                totalpage:1,
                list:[],
                navlist:[],
                nowActive:0,
                id:this.$route.query.id,
                nav_id:null,
                modular:0
            }
        },
        components:{
            headerNavTab,
            infoList,
            infinitescroll
        },
        created(){
            this.setNavModular({modular:0})
            this.get_child_nav()
        },
        watch:{
            $route(to,from){
                if(from.name == 'index'){
                    this.navlist = []
                    this.list = []
                    this.page = 1
                    this.nav_id = null
                    this.id = this.$route.query.id,
                    this.get_child_nav()
                    this.nowActive = 0
                    this.SET_TOP_MUTATIONS({top:0})
                }
                if(to.name == 'informationList'){
                    this.setNavModular({modular:0})
                    if(this.top != 0){
                        document.getElementsByClassName('flex_start')[0].scrollLeft = this.top
                    }
                }
            }
        },
        beforeRouteLeave (to,from,next) {
            var that = this
            if(document.getElementsByClassName('flex_start')[0]){
                if(to.name != 'index'){
                    that.SET_TOP_MUTATIONS({top:document.getElementsByClassName('flex_start')[0].scrollLeft})
                    .then(function(){
                        next()
                    })
                }else{
                    next()
                }
            }else{
                next()
            }
        },
        computed:{
            ...mapState({
                top:state => state.keepAlive.top
            })
        },
        methods:{
            handleClick(index,item){
                var that = this
                this.nowActive = index
                this.page = 1
                this.list = []
                this.nav_id = item.data_id
                if(that.nav_id == 1073 || that.nav_id == 1079 || that.nav_id == 1077 || that.nav_id == 1080 || that.nav_id == 1083){
                    switch(that.nav_id){
                        case 1073:that.getActivityList(1)
                        break;
                        case 1079:that.getActivityList(2)
                        break;
                        case 1077:that.getActivityList(3)
                        break;
                        case 1080:that.getActivityList(4)
                        break;
                        case 1083:that.getActivityList(5)
                        break;
                    }
                }else{
                    that.getContentList(that.nav_id)
                }
            },
            get_list(){
                this.page ++
                if(that.nav_id == 1073 || that.nav_id == 1079 || that.nav_id == 1077 || that.nav_id == 1080 || that.nav_id == 1083){
                    switch(that.nav_id){
                        case 1073:that.getActivityList(1)
                        break;
                        case 1079:that.getActivityList(2)
                        break;
                        case 1077:that.getActivityList(3)
                        break;
                        case 1080:that.getActivityList(4)
                        break;
                        case 1083:that.getActivityList(5)
                        break;
                    }
                }else{
                    that.getContentList(that.nav_id)
                }
            },
            // 获取子导航
            get_child_nav(){
                var that = this
                var param = {}
                param.device = 'wx'
                param.id = that.id
                that.$axios.post(get_child_nav,param)
                .then(res => {
                    if(Object.prototype.toString.call(res.data.data) == '[object Object]'){
                        that.navlist = []
                    }else{
                        that.navlist = res.data.data
                    }
                    if(that.navlist.length == 0){
                        that.nav_id = that.id
                    }else{
                        that.nav_id = that.navlist[0].data_id
                    }
                    if(that.nav_id == 1073){
                        switch(that.nav_id){
                            case 1073:that.getActivityList(1)
                            break;
                        }
                    }else{
                        that.getContentList(that.nav_id)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            getContentList(nav_id){
                var that = this
                var params = {}
                params.cid = nav_id
                params.device = 'wx'
                params.page = that.page
                params.pagesize = that.pagesize
                that.$axios.post(get_module,params)
                .then(res =>{
                    that.list = [...that.list,...res.data.data.items]
                    that.totalpage = res.data.data.totalpage
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                    }
                })
            },
            getActivityList(category){
                var that = this
                var params = {}
                params.category=category
                params.device = 'wx'
                params.page = that.page
                params.is_team = 0
                params.pagesize = that.pagesize
                that.$axios.post(get_activityList,params)
                .then(res =>{
                    that.list = [...that.list,...res.data.data.items]
                    for(let item of that.list){
                        item.tpe = 99999
                    }
                    that.totalpage = res.data.data.totalpage
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                    }
                })
            },
            ...mapActions([
                'setNavModular',
                'setShowModule',
                'SET_TOP_MUTATIONS'
            ]),
        }
    }
</script>
<style scoped>
    .informationList{
        background-color:#FFF;
        min-height: 100%;
        
    }
    .header_nav_tab{
        padding:0 1rem;
        background-color:#FFF;
    }
    section{
        padding:1rem 2rem;
        background-color:#FFF;
    }
</style>