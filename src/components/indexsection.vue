<!-- 首页展示 -->
<template>
    <div class="indexsection" v-if="list.length > 0">
        <div class="header">
            <h2 style="display:flex;align-items:center;"><span style="width:10px;height:10px;display:block;background-color:red;transform: rotate(45deg);margin-right:10px;margin-left:1rem;"></span>{{categoryname}}</h2>
            <span>
                <router-link :to="{name:'informationList',query:{id:data_id}}">
                    <i style="font-size:1.6rem;" class="el-icon-arrow-right"></i>
                </router-link>
            </span>
        </div>
        <div class="main">
            <infoList v-for="(item,index) in list" :key="index" :details="item"></infoList>
        </div>
    </div>
</template>
<script>
    import infoList from '@/components/infoList'
    export default {
        name:'indexsection',
        props:['id','pagesize','url','data_id'],
        data(){
            return {
                categoryname:'',
                list:[]
            }
        },
        created(){
            this.get_article_index()
        },
        components:{
            infoList
        },
        methods:{
            // 获取首页资讯
            get_article_index(){
                var that = this
                var param = {}
                param.cid = that.id
                param.pagesize = that.pagesize;
                param.is_show_index = 1;
                that.$axios.post(that.url,param)
                .then(res => {
                    that.categoryname = res.data.data.categoryname
                    that.list = res.data.data.items
                    //console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>
<style scoped>
    .indexsection{
        background-color:#FFF;
        padding:1rem;
    }
    .header{
        display:flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #E5E5E5;
        padding-bottom:0.5rem;
        margin-bottom:1rem;
    }
    .header h2{
        color:#333333;
        font-size:1.8rem;
        font-weight:normal;
    }
    .header span a{
        color:#333333;
        font-size:1.4rem;
    }
    .main .indexarticle,.main .indexvideo,.main .indexactivity{
        border-bottom:1px solid #E5E5E5;
        margin-bottom:1rem;
    }
</style>