<!-- 志愿者活动 -->
<template>
    <div class="live navigation_bottom">
        <div class="header">
            <span><img src="../assets/interactive/live.png" alt="图标"></span>
            <span>活动直播</span>
        </div>
        <div class="content">
            <infinitescroll @loadData="get_list" :page="page" :pagesize="pagesize" :totalpage="totalpage" :list="list">
            <div class="innercontent">
                
                    <livecontent class="details" v-for="(item,index) in list" :details="item" :key="index"></livecontent>
                
            </div>
            </infinitescroll>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import livecontent from '@/components/livecontent'
    import infinitescroll from '@/components/infinitescroll'
    import {get_cameralist} from '@/api/api'

    export default {
        name:'live',
        data(){
            return {
                page:1,
                pagesize:10,
                totalpage:1,
                list:[]
            }
        },
        created(){
            this.setNavModular({modular:2})
            this.get_cameraList()
        },
        components:{
            livecontent,
            infinitescroll
        },
        methods:{
            get_list(){
                this.page ++
                this.get_cameraList()
            },
            get_cameraList(){
                var that = this
                var params = {}
                params.device = 'wx'
                params.page = that.page
                params.pagesize = that.pagesize
                that.$axios.post(get_cameralist,params)
                .then(res=>{
                    that.list = [...that.list,...res.data.data.items]
                    that.totalpage = res.data.data.totalpage
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                    }
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
    .live .header{
        display:flex;
        justify-content: flex-start;
        align-items:center;
        padding:1rem;
    }
    .live .header img{
        width:3rem;
        margin-right:1rem;
    }
    .live .header span{
        font-size:1.8rem;
    }
    .content{
        padding:1rem;
    }
    .innercontent{
        display: flex;
        flex-wrap:wrap;
        justify-content: space-between;
    }
    .innercontent>.details{
        width:48%;
        margin-bottom:2rem;
    }
</style>