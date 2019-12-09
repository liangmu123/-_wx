<template>
    <div class="votelist navigation_bottom">
        <!-- 搜索框 -->
        <!-- <yd-search v-model="keyword" :on-submit="submitHandler"></yd-search> -->
        <div class="content">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <ordercontent class="marginbottom" :needBtn="false" v-for="(item,index) in list" :key="index" :details="item" link="myvotedetails"></ordercontent>
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
    // import voteliststyle from './components/voteliststyle'
    import ordercontent from '@/components/ordercontent'
    import {myvotelist} from '@/api/api'
    import { mapActions } from 'vuex'
    export default {
        name:"myvotelist",
        data(){
            return {
                keyword:'',
                list:[],
                link:'/myvotedetails',
                page:1,
                pagesize:10,
            }
        },
        components:{
            ordercontent,
            // voteliststyle,
        },
        created(){
            this.setNavModular({modular:3})
            this.get_list()
        },
        methods:{
            submitHandler(value) {
                this.$dialog.toast({mes: `搜索：${value}`});
            },
            get_list(){
                var that = this
                var params = {}
                params.page = that.page
                params.pagesize = that.pagesize
                params.tpe = 1
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(myvotelist,params)
                .then(function (res) {
                    that.list = res.data.data
                    that.page++
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
                params.tpe = 1
                that.$axios.post(myvotelist,params)
                .then(function (response) {
                    const _list = response.data.data
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
    .marginbottom{
        margin-bottom:1rem;
    }
    .content{
        padding:1rem;
    }
</style>