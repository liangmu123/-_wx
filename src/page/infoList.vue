<!-- 图文混编列表 -->
<template>
    <div class="informationList navigation_bottom">
        <yd-search v-if="id == 249" style="margin-bottom:1rem;" v-model="inputValue" :on-cancel="cancelHandler" :on-submit="submitHandler"></yd-search>
        <!-- <div class="flex">
            <el-radio v-model="radio1" label="1" border>最新发布</el-radio>
            <el-radio v-model="radio1" label="2" border>点赞最多</el-radio>
        </div> -->
        <header-nav-tab class="header_nav_tab" :active="nowActive" @handleClick="handleClick" :navlist="navlist"></header-nav-tab>
        <section v-show="list.length > 0">
            <infinitescroll @loadData="get_list" :page="page" :pagesize="pagesize" :totalpage="totalpage" :list="list">
                <infoList v-for="(item,index) in list" modular="1" :key="index" :details="item"></infoList>
            </infinitescroll>
        </section>
        <img v-if="isShow" style="margin:0 auto;width:60%;display:block;margin-top:10rem;" src="../assets/nomore.png" alt="图片">
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
                radio1:'',
                navlist:[],
                nowActive:0,
                id:this.$route.query.id,
                nav_id:null,
                inputValue:'',
                isShow:false
            }
        },
        components:{
            headerNavTab,
            infoList,
            infinitescroll
        },
        activated(){
            if(this.$route.query.id != this.id){
                this.navlist = []
                this.list = []
                this.nowActive = 0
                this.page = 1
                this.isShow = false
                this.id = this.$route.query.id
                this.get_child_nav()
            }
        },
        created(){
            this.isShow = false
            if(this.id == 249){
                this.setNavModular({modular:1})
            }else{
                this.setNavModular({modular:0})
            }
            this.get_child_nav()
        },
        methods:{
            cancelHandler(){
                this.inputValue = ''
                this.page = 1
                this.list = []
                this.isShow = false
                this.getContentList(this.nav_id)
            },
            submitHandler(){
                this.page = 1
                this.list = []
                this.isShow = false
                this.getContentList(this.nav_id)
            },
            handleClick(index,item){
                var that = this
                this.nowActive = index
                this.page = 1
                this.list = []
                this.isShow = false
                this.nav_id = item.data_id
                this.getContentList(this.nav_id)
            },
            get_list(){
                this.page ++
                this.getContentList(this.nav_id)
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
                    that.getContentList(that.nav_id)
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
                params.keyword = that.inputValue
                that.$axios.post(get_module,params)
                .then(res =>{
                    that.list = [...that.list,...res.data.data.items]
                    that.totalpage = res.data.data.totalpage
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                        that.isShow = true
                    }else{
                        that.isShow = false
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
    .flex{
        display:flex;
        justify-content: center;
    }
</style>