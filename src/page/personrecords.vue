<!-- 个人足迹 -->
<template>
    <div class="personrecords navigation_bottom">
        <div class="main" v-if="list.length>0">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                    <yd-list theme="1" slot="list">
                        <template v-for="(item,index) in list">
                            <articlecontent class="article" v-if="item.tpe == 2" :key="index" :id="item.aid" link='articledetails' type="article" :details="item"></articlecontent>
                            <videocontent class="video" v-if="item.tpe == 4" :id="item.aid" :key="index" :details="item"></videocontent>
                            <!-- <activitycontent class="indexactivity" v-if="item.tpe == 5" :id="item.id" :key="index"></activitycontent> -->
                        </template>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <span slot="doneTip">没有数据啦~~</span>
                <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                <i slot="loadingTip" style="font-size:30px;" class="el-icon-loading"></i>
            </yd-infinitescroll>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import articlecontent from '@/components/articlecontent'
    import videocontent from '@/components/videocontent'

    import {myRecordsList} from '@/api/api'
    export default {
        name:'personrecords',
        data(){
            return {
                list:[],
                page:1,
                pagesize:8,
            }
        },
        components:{
            articlecontent,
            videocontent
        },
        created(){
            this.setNavModular({modular:3})
            this.get_myRecordsList()
        },
        methods:{
            get_myRecordsList(){
                var that = this
                var params = {}
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(myRecordsList,params)
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
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(myRecordsList,params)
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
        },
    }
</script>
<style scoped>
    .personrecords{
        min-height:100%;
    }
    .main{
        background-color:#FFF;
        padding:1rem;
    }
    .main .article,.main .video,.main .activity{
        border-bottom:1px solid #E5E5E5;
        margin-bottom:1rem;
    }
</style>