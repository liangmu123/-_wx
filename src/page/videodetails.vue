<!-- 视频详情页 -->
<template>
    <div class="videodetails navigation_bottom">
        <liveckplayer v-if="type && type == 'live'"></liveckplayer>
        <ckplayer v-else :video_url="details.video_path"></ckplayer>
        <div class="content">
            <div class="title">{{details.title}}</div>
            <p class="time">
                <i class="el-icon-time"></i> {{details.format_add_time}}
            </p>
            <p class="intro" v-if="details.content">内容简介</p>
            <div class="inner" v-html="details.content"></div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import ckplayer from '@/components/ckplayer'

    import liveckplayer from '@/components/liveckplayer'

    import {get_article} from '@/api/api'
    // 用户足迹
    import {add_records} from '@/api/api'
    export default {
        name:'videodetails',
        data(){
            return {
                id:this.$route.query.id,
                details:{},
                type:this.$route.query.type,
                modular:this.$route.query.modular
            }
        },
        created(){
            if(this.modular && this.modular == 1){
                this.setNavModular({modular:1})
            }else if(this.modular && this.modular == 2){
                this.setNavModular({modular:2})
            }else{
                this.setNavModular({modular:0})
            }
            if(this.type && this.type == 'live'){

            }else{
                this.get_article()
                // 用户足迹
                // this.add_records()
            }
        },
        mounted(){
            // document.documentElement.scrollTop = 0
        },
        components:{
            ckplayer,
            liveckplayer,
        },
        methods:{
            get_article(){
                var that = this
                var params = {}
                params.id = that.id
                params.device = "wx"
                that.$axios.post(get_article,params)
                .then(res=>{
                    that.details = res.data.data
                })
            },
            // 用户足迹
            add_records(){
                var that = this;
                var param = {}
                param.cid = that.id
                param.type = 2
                param.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(add_records,param)
                .then(function(res){
                //console.log(res)
                })
                .catch(function(err){
                //console.log(err)
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        },
    }
</script>
<style scoped>
    .videodetails{
        min-height:100%;
        background-color:#FFF;
    }
    .content{
        width:90%;
        margin:0 auto;
        box-shadow: 1px 1px 5px #bbb;
        padding:1rem;
        min-height:calc(100% - 20rem);
    }
    .content .title{
        font-size:1.8rem;
        margin-bottom:1rem;
    }
    .content .time{
        font-size:1.2rem;
        color:#999;
        margin-bottom:1rem;
    }
    .content .intro{
        font-size:1.6rem;
        margin-bottom:1rem;
    }
    .content .inner{
        font-size:1.6rem;
        min-height:20rem;
    }
</style>