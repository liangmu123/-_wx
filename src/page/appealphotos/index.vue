<!-- 随手拍列表 -->
<template>
    <div class="informationlist navigation_bottom">
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
                
                <!-- 资讯列表 -->
                <template v-if="list.length>0">
                    <div class="articlebottom">
                        <div class="articlebg">
                            <articlecontent class="article" v-for="(item,index) in list" :key="index" link="articledetails" type="随手拍" :details="item" :id="item.id"></articlecontent>
                        </div>
                    </div>
                </template>

            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <i slot="loadingTip" style="font-size:30px;" class="el-icon-loading"></i>
        </yd-infinitescroll>
        <div class="takephotos" @click="jumpTakePhotos">
            <img src="../../assets/takephotos.png" alt="随手拍">
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { mapState } from 'vuex'
    import articlecontent from '@/components/articlecontent'
    import {takePhotosList} from '@/api/api'
    export default {
        name:'appealphotos',
        data(){
            return {
                pagesize:10,
                page:1,
                list:[],
                type:this.$route.query.type,
            }
        },
        components:{
            articlecontent,
        },
        created(){
            this.setNavModular({modular:3})
            this.getContentList()
        },
        methods:{
            getContentList(){
                var that = this
                var params = {}
                params.page = that.page
                params.pagesize = that.pagesize
                if(this.type == 'myappealphotos'){
                    params.access_token = window.localStorage.getItem('access_token')
                }
                that.$axios.post(takePhotosList,params)
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
                if(this.type == 'myappealphotos'){
                    params.access_token = window.localStorage.getItem('access_token')
                }
                that.$axios.post(takePhotosList,params)
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
            // 跳转至随手拍发布界面
            jumpTakePhotos(){
                this.$router.push({name:'takephotos'})
            },
            ...mapActions([
                'setNavModular',
                'setShowModule',
            ]),
        }
    }
</script>
<style scoped>
    .informationlist{
        min-height:100%;
    }
    .videobottom{
        padding:1rem 1rem 0 1rem;
    }
    .videobottom .video{
        margin-bottom:1rem;
    }
    .activitybottom{
        padding:1rem 1rem 0 1rem;
    }
    .activitybottom .activity{
        margin-bottom:1rem;
    }
    .articlebottom{
        padding:0 1rem;
    }
    .articlebottom .articlebg{
        background-color:#fff;
        padding:1rem 0;
    }
    .articlebottom .articlebg .article{
        border-bottom:1px solid #ddd;
    }
    .volunteerbottom{
        padding:1rem;
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .volunteermargin{
        margin-bottom:2rem;
    }
    /* 投票css */
    .vote{
        text-align:center;
        line-height:3rem;
        font-size:1.2rem;
        color:#FFF;
        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
        background: -webkit-linear-gradient(#FFB1B1, #F60F0F); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FFB1B1, #F60F0F); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FFB1B1, #F60F0F); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FFB1B1, #F60F0F); /* 标准的语法 */
    }
    /* 志愿者队伍 */
    .team{
        text-align: center;
        line-height:3rem;
        font-size:1.2rem;
        color:#606060;
    }
    .takephotos{
        width:6rem;
        height:6rem;
        position:fixed;
        right:3rem;
        bottom:10rem;
    }
    .takephotos>img{
        width:100%;
        height:100%;
    }
</style>