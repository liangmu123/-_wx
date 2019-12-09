<template>
    <div class="supermarket navigation_bottom">
        <div class="top">
            <p>{{details.integral}}</p>
            <p>当前积分</p>
        </div>
        <div class="content">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <supermarketContent class="supermarketContentBottom" v-for="(item,index) in list" :key="index" :details="item"></supermarketContent>
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
    import supermarketContent from '@/components/supermarketContent.vue'

    import {shoppinglist} from '@/api/api'
    import {get_userInfo} from '@/api/api'
    export default {
        name:'supermarket',
        data(){
            return {
                page:1,
                pagesize:10,
                list:[],
                details:{},
            }
        },
        components:{
            supermarketContent,
        },
        created(){
            this.get_list()
            this.get_userInfo()
        },
        methods:{
            get_userInfo(){
                var that = this
                var params = {}
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(get_userInfo,params)
                .then(res=>{
                    that.details = res.data.data
                })
            },
            loadList() {
                var that = this
                var params = {}
                params.page = this.page
                params.pagesize = this.pagesize
                that.$axios.post(shoppinglist,params)
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
            get_list(){
                var that = this
                var params = {}
                params.page = this.page
                params.pagesize = this.pagesize
                that.$axios.post(shoppinglist,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                })
            },
        },
    }
</script>
<style scoped>
    .supermarket{
        min-height: 100%;
        background-color: #FFF;
    }
    .top{
        background:linear-gradient(-81deg,rgba(224,141,140,1),rgba(220,21,23,1));
        padding:1rem 0;
    }
    .top p:first-child{
        font-size:4rem;
        color:#FFF;
        text-align: center;
    }
    .top p:last-child{
        font-size:2rem;
        color:#FFF;
        text-align: center;
    }
    .content .yd-list{
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding:2rem;
    }
    .supermarketContentBottom{
        margin-bottom:2rem;
    }
</style>