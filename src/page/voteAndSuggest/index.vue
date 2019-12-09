<template>
    <!-- 投票评议 -->
    <div class="voteAndSuggest navigation_bottom">
        <!-- <h2>投票评议</h2> -->
        <h2 v-if="category == 1">问计于民</h2>
        <h2 v-if="category == 2">问需于民</h2>
        <h2 v-if="category == 3">问效于民</h2>
        <section v-show="list.length > 0">
            <infinitescroll @loadData="get_list" :page="page" :pagesize="pagesize" :totalpage="totalpage" :list="list">
                <template v-for="(item,index) in list" >
                    <articler v-if="item.img" :key="index" :details="item"></articler>
                    <word v-else :key="index" :details="item"></word>
                </template>
            </infinitescroll>
        </section>
    </div>
</template>
<script>
    import word from './word'
    import articler from './articler'
    import infinitescroll from '@/components/infinitescroll'

    import { mapActions } from 'vuex'

    import {voteAndSuggestList,myvotelist} from '@/api/api'
    export default {
        data(){
            return {
                page:1,
                pagesize:10,
                totalpage:1,
                list:[],
                type:this.$route.query.type,
                category:this.$route.query.category
            }
        },
        components:{
            infinitescroll,
            word,
            articler
        },
        created(){
            this.setNavModular({modular:0})
            this.get_All_list()
        },
        methods:{
            get_list(){
                this.page ++
                this.get_All_list()
            },
            get_All_list(){
                var that = this
                var url = ''
                url = that.type == 'myvote' ? myvotelist : voteAndSuggestList
                that.$axios.post(url,{
                    category:that.category,
                    access_token : that.type == 'myvote' ? window.localStorage.getItem('access_token') : undefined
                })
                .then(res=>{
                    that.list = [...that.list,...res.data.data.items]
                    that.totalpage = res.data.data.totalpage
                })
            },
            ...mapActions([
                'setNavModular'
            ])
        }
    }
</script>
<style scoped>
    .voteAndSuggest{
        min-height:100%;
        background-color:#FFF;
        padding:1rem 1rem;
    }
    h2{
        font-size:1.8rem;
        line-height:2rem;
        margin-bottom:2rem;
        font-weight: normal;
        padding-left:2rem;
        border-left:5px solid red;
    }
</style>