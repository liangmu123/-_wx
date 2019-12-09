<!-- 一点通列表 -->
<template>
    <div class="oneClickList navigation_bottom">
        <!-- <indexlist class="header" :need="need" :details="details"></indexlist>
        <div class="middle">
            <div class="btn fontSize_1_8rem" @click="jump">
                <span>我要求助</span>
                <img src="../../assets/oneClick/appeal.png" alt="发布按钮" style="width:20px;">
            </div>
        </div> -->
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
                <div class="content">
                    <secondlist v-for="(item,index) in list" :details="item" :key="index"></secondlist>
                </div>
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
    // 引入组件
    import indexlist from '@/components/oneClick/indexlist'
    import secondlist from '@/components/oneClick/secondlist'

    import {assistInfo} from '@/api/api'
    import {sosList} from '@/api/api'

    export default {
        name:'oneClickList',
        data(){
            return {
                need:'I NEED YOU',
                id:this.$route.query.id,
                details:{},
                list:[],
                page:1,
                pagesize:10,
            }
        },
        components:{
            indexlist,
            secondlist
        },
        created(){
            this.setNavModular({modular:1})
            this.get_assistInfo()
            this.get_sosList()
        },
        methods:{
            // 获取栏目详情
            get_assistInfo(){
                var that = this
                var params = {}
                params.id = this.id
                that.$axios.post(assistInfo,params)
                .then(res=>{
                    that.details = res.data.data.assist
                })
            },
            // 获取栏目下求助清单
            get_sosList(){
                var that = this
                var params = {}
                params.id = this.id
                params.page = this.page
                params.pagesize = this.pagesize
                that.$axios.post(sosList,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                })
            },
            loadList(){
                var that = this
                var params = {}
                params.id = this.id
                params.page = this.page
                params.pagesize = this.pagesize
                that.$axios.post(sosList,params)
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
            // 跳转
            jump(){
                this.$router.push({name:'appeal',query:{id:this.id}})
            },
            ...mapActions([
                'setNavModular'
            ]),
        },
    }
</script>
<style scoped>
    .oneClickList{
        background-color: #FFF;
        min-height: 100%;
        margin:0 1rem;
    }
    .header{
        background-color: #FFF;
        border-bottom:1px solid #DDD;
        padding:1rem 1rem 0 1rem;
    }
    .middle{
        display:flex;
        justify-content: center;
        padding:1.5rem 0;
        background-color:#FFF;
    }
    .btn{
        background-color: #6AC5F8;
        margin:0 auto;
        color:#FFF;
        display:flex;
        align-items: center;
        padding:0.5rem 2rem;
        border-radius: 2px;
        box-shadow:0px 3px 5px #96C6FF;
    }
    .btn>span:first-child{
        margin-right:1rem;
    }
</style>