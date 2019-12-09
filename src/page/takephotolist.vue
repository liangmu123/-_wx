<!-- 随手拍列表 -->
<template>
    <div class="takephotolist navigation_bottom">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div class="content">
                        <volunteercontent class="volunteermargin marginbottom" v-for="(item,index) in list" :key="index" :details="item" :link="link" :type="type">
                            <!-- 我的随手拍列表 -->
                            <template v-slot:volunteerslot='slotProps' v-if="type && type == 'mytakephotos'">
                                <div class="mypersonnel">
                                    <div class="left">
                                        <p class="ing" v-if="slotProps.row.is_check == 0">
                                            <span></span>
                                            <span>审核中</span>
                                        </p>
                                        <p class="through" v-else-if="slotProps.row.is_check == 1">
                                            <span></span>
                                            <span>审核通过</span>
                                        </p>
                                        <p class="jj" v-else="slotProps.row.is_check == 2">
                                            <span></span>
                                            <span>审核驳回</span>
                                        </p>
                                    </div>
                                    <div class="right">
                                        5月22日 22:10
                                    </div>
                                </div>
                            </template>
                            <!-- 随手拍列表 -->
                            <template v-slot:volunteerslot='slotProps' v-else>
                                <div class="personnel">
                                    <div class="left">
                                        <img :src="slotProps.row.user_img" alt="头像">
                                        <p class="name">{{slotProps.row.username}}</p>
                                    </div>
                                    <div class="right">
                                        {{slotProps.row.addtime}}
                                    </div>
                                </div>
                            </template>
                        </volunteercontent>
                    </div>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <span slot="doneTip">没有数据啦~~</span>
                <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                <i slot="loadingTip" style="font-size:30px;" class="el-icon-loading"></i>
            </yd-infinitescroll>
        <div class="takephotos" @click="jumpTakePhotos">
            <img src="../assets/takephotos.png" alt="随手拍">
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import volunteercontent from '@/components/volunteercontent'

    import {get_lighthouse} from '@/api/api'
    import {get_myCaseList} from '@/api/api'
    export default {
        name:'takephotolist',
        data(){
            return {
                type:this.$route.query.type,//判断来自哪个页面
                link:'takephotosdetails',
                page:1,
                pagesize:10,
                list:[],
            }
        },
        created(){
            // this.type && this.type == 'mytakephotos' ? this.setNavModular({modular:3}) : this.setNavModular({modular:0})
            this.setNavModular({modular:0})
            if(this.type && this.type == 'mytakephotos'){
                this.get_myCaseList()
            }else{
                this.get_lighthouse()
            }
        },
        components:{
            volunteercontent,
        },
        methods:{
            // 跳转至随手拍发布界面
            jumpTakePhotos(){
                this.$router.push({name:'takephotos'})
            },
            // 获取所有随手拍列表
            get_lighthouse(){
                var that = this
                var params = {}
                params.page = that.page
                params.pagesize = that.pagesize
                that.$axios.post(get_lighthouse,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                    }
                })
            },
            // 获取我的随后拍列表
            get_myCaseList(){
                var that = this
                var params = {}
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(get_myCaseList,params)
                .then(res=>{
                    that.list = res.data.data.items
                    that.page ++
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
                    }
                })
            },
            loadList() {
                var that = this
                var param = {}
                param.page = that.page
                param.pagesize = that.pagesize
                var url = ''
                if(this.type && this.type == 'mytakephotos'){
                    url = get_myCaseList
                    param.access_token = window.localStorage.getItem('access_token')
                }else{
                    url = get_lighthouse
                }
                that.$axios.post(url,param)
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
    .takephotolist .personnel,.takephotolist .mypersonnel{
        width:100%;
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding:0 1rem 1rem 1rem;
        flex-wrap: wrap;
    }
    .takephotolist .personnel>div,.takephotolist .mypersonnel>div{
        display:flex;
        align-items: center;
        font-size:1.2rem;
        color:#333333;
    }
    .takephotolist .personnel>div.right,.takephotolist .mypersonnel>div.right{
        color:#8B8B8B;
    }
    .takephotolist .personnel img{
        width:2rem;
        height:2rem;
        border-radius:2rem;
        margin-right:0.5rem;
    }
    .takephotolist .personnel .name{
        line-height:2rem;
        
    }
    .content{
        padding:1rem;
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
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
    .marginbottom{
        margin-bottom:1rem;
    }
    .takephotolist .mypersonnel .left p{
        display:flex;
        align-items: center;
    }
    .takephotolist .mypersonnel .left p span:first-child{
        width:1rem;
        height:1rem;
        border-radius:1rem;
        display:block;
        margin-right:0.5rem;
    }
    .takephotolist .mypersonnel .ing{
        color:#DE3737;
    }
    .takephotolist .mypersonnel .ing span:first-child{
        background-color:#DE3737;
    }
    .takephotolist .mypersonnel .through{
        color:#61B421;
    }
    .takephotolist .mypersonnel .through span:first-child{
        background-color:#61B421;
    }
    .takephotolist .mypersonnel .jj{
        color:#818181;
    }
    .takephotolist .mypersonnel .jj span:first-child{
        background-color:#818181;
    }
</style>