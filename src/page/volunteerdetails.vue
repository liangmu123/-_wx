<!-- 志愿者详情 -->
<template>
    <div class="volunteerdetails navigation_bottom">
        <div class="img">
            <img :src="IMG_PATH + details.img" alt="图片">
        </div>
        <div class="content">
            <div class="header">
                <div>
                    <span>队伍名称</span>
                    <span>{{details.title}}</span>
                </div>
                <div>
                    <span>队伍类型</span>
                    <span>生活类</span>
                </div>
                <div>
                    <span>服务数量</span>
                    <span>123次</span>
                </div>
            </div>
            <p class="intro">内容介绍</p>
            <p class="inner" v-html="details.content"></p>
            <div v-if="type && type == 'vote'" class="vote">投他一票</div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import {get_article} from '@/api/api'

    export default {
        name:'volunteerdetails',
        data(){
            return {
                type:this.$route.query.type,
                id:this.$route.query.id,
                details:'',
                IMG_PATH:IMG_PATH,
            }
        },
        created(){
            if(this.type && this.type == 'vote'){
                // 投票篇
                this.setNavModular({modular:2})
            }else if(this.type && this.type == 'team'){
                // 志愿队伍篇
                this.setNavModular({modular:1})
                this.get_article()
            }
        },
        methods:{
            get_article(){
                var that = this
                var params = {}
                params.device = 'wx'
                params.id = that.id
                that.$axios.post(get_article,params)
                .then(res=>{
                    that.details = res.data.data
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
    .volunteerdetails{
        min-height:100%;
        background-color:#FFF;
    }
    .img{
        width:100%;
    }
    .img>img{
        width:100%;
        display: block;
    }
    .content{
        padding:2rem;
        background-color:#FFF;
        position: relative;
        padding-top:4rem;
    }
    .header{
        width:90%;
        display:flex;
        padding:1rem;
        border-radius:10px;
        justify-content: space-between;
        align-items: flex-start;
        box-shadow: 1px 1px 5px #aaa;
        background-color:#FFF;
        position:absolute;
        left:50%;
        top:-3rem;
        transform: translateX(-50%);
    }
    .header div span{
        display:block;
        text-align: center;
    }
    .header div span:first-child{
        margin-bottom:1rem;
    }
    .intro{
        font-size:1.8rem;
        color:#000;
        margin-bottom:1rem;
    }
    .inner{
        font-size:1.6rem;
    }
    /* 投票css */
    .vote{
        text-align:center;
        line-height:3rem;
        font-size:1.2rem;
        width:60%;
        margin: 0 auto;
        margin-top:4rem;
        color:#FFF;
        border-radius:5px;
        background: -webkit-linear-gradient(#FFB1B1, #F60F0F); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FFB1B1, #F60F0F); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FFB1B1, #F60F0F); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FFB1B1, #F60F0F); /* 标准的语法 */
    }
</style>