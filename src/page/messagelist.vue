<!-- 活动列表 -->
<template>
    <div class="messagelist navigation_bottom" v-if="list.length>0">

        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
                <messagecontent v-for="(item,index) in list" :key="index" :details="item"></messagecontent>
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
    import { mapState } from 'vuex'

    import messagecontent from '@/components/messagecontent'
    import {stationLetter} from '@/api/api'
    export default {
        name:'messagelist',
        data(){
            return {
                pagesize:10,
                page:1,
                list:[],
            }
        },
        components:{
            messagecontent
        },
        created(){
            this.getContentList()
        },
        methods:{
            getContentList(){
                var that = this
                var params = {}
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(stationLetter,params)
                .then(res =>{
                    that.list = res.data.data.items
                    that.page ++
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                    }
                })
            },
            loadList() {
                var that = this
                var params = {}
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(stationLetter,params)
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
                'setShowModule',
            ]),
        }
    }
</script>
<style scoped>
    .messagelist{
        background-color: #FFF;
        min-height: 100%;
        padding:1rem;
    }
</style>