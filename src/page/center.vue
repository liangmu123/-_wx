<!-- 个人中心 -->
<template>
    <div class="center navigation_bottom">
        <template v-if="isBind">
            <div class="header">
                <img src="../assets/center/top.png" alt="背景图">
                <div class="protrait">
                    <div>
                        <img :src="details.head_img" alt="头像">
                    </div>
                    <div>{{details.real_name}}</div>
                </div>
            </div>
            <el-button class="btn" type="danger" round>
                <span v-if="details.volunteer_status == 0">您还不是志愿者</span>
                <span v-else-if="details.volunteer_status == 1">志愿者申请审核中</span>
                <span v-else-if="details.volunteer_status == 2">志愿者</span>
            </el-button>
            <ul class="middle">
                <li v-for="(item,index) in shopList" :key="index">
                    <router-link :to="item.link">
                        <img :src="item.src" alt="图片">
                        <span>
                            {{item.title}}
                        </span>
                    </router-link>
                </li>
            </ul>
            <div class="nav">
                <navbox class="navlist" v-for="(item,index) in navlist" :key="index" :details="item"></navbox>
            </div>
        </template>
        <appointDialog :dialogForm="dialogFormVisible"  @closedialogForm="closedialogForm"></appointDialog>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { mapState } from 'vuex'
    import navbox from '@/components/navbox.vue'
    import appointDialog from '@/components/appointDialog'

    import {get_userInfo} from '@/api/api'
    import {isBind} from '@/api/api'
    export default {
        name:'center',
        data(){
            return {
                shopList:[
                    {title:'积分商城',src:require('../assets/center/1.png'),link:'/supermarket'},
                    {title:'我的积分',src:require('../assets/center/2.png'),link:'/interactive'},
                    {title:'兑换记录',src:require('../assets/center/3.png'),link:'/myExchangeList'}
                ],
                navlist:[
                    {
                        name:'我的点单',
                        src:require('../assets/center/order.png'),
                        link:{name:'orderlist',query:{tab:1}}
                    },
                    
                    // {
                    //     name:'我的随手拍',
                    //     src:require('../assets/center/mine_photo.png'),
                    //     link:{name:'appealphotos',query:{type:'myappealphotos'}}
                    // },
                    // {
                    //     name:'积分宝兑换记录',
                    //     src:require('../assets/center/service.png'),
                    //     link:{name:'myExchangeList'}
                    // },
                    {
                        name:'我的帮助',
                        src:require('../assets/center/help.png'),
                        link:{name:'myhelp'}
                    },
                    {
                        name:'我的求助',
                        src:require('../assets/center/sos.png'),
                        link:{name:'myrequest'}
                    },
                    // {
                    //     name:'文明泗阳随手拍',
                    //     src:require('../assets/center/sos.png'),
                    //     link:{name:'appealphotos'}
                    // },
                    {
                        name:'个人消息',
                        src:require('../assets/center/message.png'),
                        link:{name:'messagelist'}
                    },
                    // {
                    //     name:'我的积分',
                    //     src:require('../assets/center/money.png'),
                    //     link:{name:'interactive'}
                    // },
                    {
                        name:'我的队伍',
                        src:require('../assets/center/team.png'),
                        link:{name:'applyteam',query:{type:'appeal'}}
                    },
                    // {
                    //     name:'我的服务记录',
                    //     src:require('../assets/center/service.png'),
                    //     link:{name:'servicelist',query:{type:'myservice'}}
                    // },
                    // {
                    //     name:'我的投票记录',
                    //     src:require('../assets/center/service.png'),
                    //     link:{name:'voteAndSuggest',query:{type:'myvote'}}
                    // },
                    {
                        name:'我的活动记录',
                        src:require('../assets/center/volunteer_history.png'),
                        link:{name:'orderlist',query:{type:'volunteeractivity',tab:1}}
                    },
                    // {
                    //     name:'我的投票记录',
                    //     src:require('../assets/center/vote.png'),
                    //     link:{name:'myvotelist'}
                    // },
                    // {
                    //     name:'我的学习记录',
                    //     src:require('../assets/center/videohistory.png'),
                    //     link:{name:'personrecords'}
                    // },
                ],
                details:{},
                dialogFormVisible:false,
                isBind:false,
            }
        },
        created(){
            if(!this.bind){
                this.get_isBind()
            }
            //this.get_userInfo()
        },
        activated(){
            if(!this.isBind){
                this.get_isBind()
            }
        },
        components:{
            navbox,
            appointDialog,
        },
        computed:{
            ...mapState({
                bind:state => state.user.isBind,
            })
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
            // 关闭弹窗
            closedialogForm(){
                //console.log(this.dialogFormVisible)
                this.dialogFormVisible = false
            },
            get_isBind(){
                // 判断是否已实名认证
                var that = this
                var params = {}
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(isBind,params)
                .then(res=>{
                    // 未绑定
                    if(res.data.data.is_bind == 0){
                        that.$dialog.confirm({
                            title: '您还未绑定手机号，是否前往实名认证',
                            opts: () => {
                                that.$router.push({name:'bindInfo'})
                            }
                        })
                    }else if(res.data.data.is_bind == 1){
                        this.get_userInfo()
                        that.isBind = true
                    }
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
.btn{
    width:90%;
    margin:0 auto;
    display:block;
    margin-bottom:2rem;
    background-color:#E03F3F;
}
    .center{
        min-height:100%;
        background-color:#FFF;
    }
    .header{
        position:relative;
    }
    .header>img{
        width:100%;
        display:block;
    }
    .header .protrait{
        position:absolute;
        top:60%;
        left:50%;
        z-index:999;
        transform: translate(-50%,-50%);
    }
    .header .protrait div:first-child{
        width:5rem;
        height:5rem;
        margin:0 auto;
        border-radius: 50px;
        margin-bottom:0.5rem;
    }
    .header .protrait div:last-child{
        text-align: center;
        font-size:1.6rem;
    }
    .header .protrait div:first-child img{
        width:100%;
        height:100%;
        border-radius: 50px;
    }
    .nav{
        background-color:#FFF;
        padding:2rem;
        padding-top:0;
    }
    .nav .navlist{
        border-bottom:1px solid #D8D8D8;
    }
    .middle{
        background-color:#FFF;
        display:flex;
        justify-content: space-between;
        width:90%;
        margin:0 auto;
        box-shadow: 0 0 5px #ccc;
        margin-bottom:1rem;
        padding:1rem 0;
    }
    .middle li{
        width:30%;
    }
    .middle li a{
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    .middle li a img{
        display:block;
        width:2.5rem;
        margin-bottom:0.5rem;
    }
</style>