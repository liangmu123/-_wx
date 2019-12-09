<template>
    <div class="votedetails navigation_bottom">
        <!-- 搜索框 -->
        <!-- <yd-search v-model="keyword" :on-submit="submitHandler"></yd-search> -->
        <!-- 提示 -->
        <div class="rule">
            <p class="fontSize_1_8rem">投票规则：</p>
            <p class="fontSize_1_6rem line_height padding_left">1.投票有效时间：</p>
            <p class="fontSize_1_6rem line_height padding_left">{{time.format_start_time}} - {{time.format_end_time}}</p>
            <p class="fontSize_1_6rem padding_left">2.每人每天共有{{tickets}}票</p>
        </div>
        <!-- 内容 -->
        <div class="content">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <template v-if="isShow">
                        <list_one class="border_bottom" v-for="(item,index) in list" :key="index" :details="item"></list_one>
                    </template>
                    <template v-else>
                        <list_two v-for="(item,index) in list" :key="index" :details="item"></list_two>
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
    import list_one from './components/list1'
    import list_two from './components/list2'

    import {votelist} from '@/api/api'

    import { mapActions } from 'vuex'
    export default {
        name:"myvotedetails",
        data(){
            return {
                keyword:'',
                list:[],
                page:1,
                pagesize:10,
                isShow:false,
                id:this.$route.query.id,
                tickets:0,
                time:{},
            }
        },
        components:{
            list_one,
            list_two,
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
                params.id = that.id
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(votelist,params)
                .then(function (res) {
                    that.tickets = res.data.data.tickets
                    that.time = res.data.data.time
                    that.list = res.data.data.options
                    if(that.list[0].img === null){
                        that.isShow = true
                    }
                    that.page ++
                })
            },
            loadList(){
                var that = this
                var params = {}
                params.id = that.id
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(votelist,params)
                .then(function (response) {
                    const _list = res.data.data.options
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
                'setNavModular'
            ]),
        },
    }
</script>
<style scoped>
    .rule{
        background-color:#FFF;
        padding:1rem;
    }
    .line_height{
        line-height:3rem;
    }
    .padding_left{
        padding-left:1rem;
    }
    .content{
        background-color:#FFF;
        padding:1rem;
        margin-top:1rem;
    }
    .border_bottom{
        border-bottom:1px solid #ccc;
    }
    article{
        display:flex;
        flex-wrap:wrap;
        justify-content: space-between;
    }
</style>