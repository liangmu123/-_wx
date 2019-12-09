<template>
    <div class="myExchangeList navigation_bottom" v-if="list.length>0">
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
                <myExchangeContent class="myExchangeContentBottom" v-for="(item,index) in list" :key="index" :details="item"></myExchangeContent>
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
    import myExchangeContent from '@/components/myExchangeContent.vue'

    import {log} from '@/api/api'
    export default {
        name:'myExchangeList',
        data(){
            return {
                list:[],
                page:1,
                pagesize:10,
            }
        },
        components:{
            myExchangeContent,
        },
        created(){
            this.setNavModular({modular:3})
            this.get_info()
        },
        methods:{
            get_info(){
                var that = this
                var params = {}
                params.page = this.page
                params.pagesize = this.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(log,params)
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
                params.page = this.page
                params.pagesize = this.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(log,params)
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
    .myExchangeList{
        padding:1rem;
        background-color: #FFF;
        min-height:100%;
    }
    .myExchangeContentBottom{
        margin-bottom:1rem;
    }
</style>