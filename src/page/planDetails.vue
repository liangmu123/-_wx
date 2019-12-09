<!-- 活动详情 -->
<template>
    <div class="activitydetails navigation_bottom">
        <h2 class="title">{{details.title}}</h2>
        <p class="details">
            <span v-if="middleNav[details.category]">{{middleNav[details.category].title}}</span>
            <span>发布时间：{{details.format_start_time}}</span>
        </p>
        <el-row class="modular">
            <el-col :span="12">
                <i class="el-icon-view"></i>
                <span>{{details.click_count}}</span>
            </el-col>
            <!-- <el-col :span="8">
                <i class="el-icon-star-off"></i>
                <span>123</span>
            </el-col> -->
            <el-col :span="12" @click.native="dianzan">
                <yd-icon name="good" size="1.6rem" color="#333"></yd-icon>
                <span>{{details.likes}}</span>
            </el-col>
        </el-row>
        <el-row class="intro">
            <el-col :span="4">
                报名数
            </el-col>
            <el-col :span="20">
                {{details.joiner ? details.joiner.length : 0}} / {{details.person_limit}}
            </el-col>
        </el-row>
        <el-row class="intro">
            <el-col :span="4">
                时间
            </el-col>
            <el-col :span="20">
                {{details.format_start_time}} 至 {{details.format_end_time}}
            </el-col>
        </el-row>
        <el-row class="intro">
            <el-col :span="4">
                地点
            </el-col>
            <el-col :span="20">
                {{details.address}}
            </el-col>
        </el-row>
        <el-row class="intro">
            <el-col :span="4">
                联系人
            </el-col>
            <el-col :span="20">
                {{details.contacter}}
            </el-col>
        </el-row>
        <el-row class="intro">
            <el-col :span="5">
                联系电话
            </el-col>
            <el-col :span="19">
                {{details.phone}}
            </el-col>
        </el-row>
        <el-button class="btn" type="danger" v-if="details.status!=2 && details.is_join==0" @click="showdialogForm(id)">
            <span v-if="type == 'volunteeractivity'">报名</span>
            <span v-else>点单</span>
        </el-button>
        <el-button type="info" class="btn2" v-if="details.is_join >= 1" disabled @click.stop>
            <span v-if="type == 'volunteeractivity'">已报名</span>
            <span v-else>已点单</span>
        </el-button>
        <h2 class="subtitle">活动说明：</h2>
        <div class="img">
            <img v-if="details.images" :src="IMG_PATH + details.images" alt="图片">
        </div>
        <p class="describe" v-html="details.content"></p>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import {get_activity} from '@/api/api'

    import { mapState } from 'vuex'

    import {activity_join,post_like} from '@/api/api'
    
    export default {
        name:'activitydetails',
        data(){
            return {
                isDisabled:false,
                id:this.$route.query.id,
                details:{},
                IMG_PATH:IMG_PATH,
                type:this.$route.query.type,
                middleNav:[
                    {title:'全部',src:require('../assets/order/all.png'),category:1},
                    {title:'理论宣讲',src:require('../assets/order/lilun.png'),category:1},
                    {title:'教育关爱',src:require('../assets/order/educate.png'),category:1},
                    {title:'文化惠民',src:require('../assets/order/culture.png'),category:1},
                    {title:'创业科技',src:require('../assets/order/keji.png'),category:1},
                    {title:'体育健康',src:require('../assets/order/sport.png'),category:1}
                ],
            }
        },
        created(){
            //console.log(this.type)
            this.type && this.type == 'volunteeractivity' ? this.setNavModular({modular:1}) : this.setNavModular({modular:0})
            this.get_activity()
        },
        computed:{
            ...mapState({
                bind:state => state.user.isBind,
            })
        },
        methods:{
            // 点赞
            dianzan(){
                var that = this
                that.$axios.post(post_like,{
                    id : that.id,
                    access_token : window.localStorage.getItem('access_token')
                })
                .then(res=>{
                    if(res.data.code == 0){
                        that.$dialog.toast({
                            mes: "点赞成功",
                            icon:'success',
                            timeout: 1500
                        })
                        that.details.likes ++
                    }else{
                        that.$dialog.toast({
                            mes: res.data.message,
                            timeout: 1500
                        })
                    }
                })
            },
            // 显示弹窗
            showdialogForm(id){
                // 判断是否已实名认证
                // this.isBind(id)
                // 走的vuex
                if(!this.bind){
                    this.$dialog.toast({
                        mes: "请先进行实名认证",
                        timeout: 1500
                    })
                }else{
                    // 已绑定，直接请求
                    this.subInfo(id)
                }
            },
            // 提交信息
            subInfo(id){
                var that = this
                var params = {};
                params.access_token = window.localStorage.getItem('access_token')
                params.id = id
                that.$axios.post(activity_join,params)
                .then(res=>{
                    if(res.data.code == 10214){
                        that.$dialog.toast({
                            mes:'您还不是志愿者，正在跳转至成为志愿者界面',
                            timeout:1500
                        })
                        setTimeout(function(){
                            that.$router.push('/applyvolunteer')
                        },1500)
                        return
                    }else if(res.data.code == 10225){
                        that.$dialog.toast({mes: '志愿者申请审核中', timeout: 1500})
                    }else{
                        that.$dialog.toast({
                            mes: "报名成功，请等待工作人员联系",
                            timeout: 1500
                        })
                        that.details.is_join = 1
                    }
                })
                .catch(err=>{
                    that.$dialog.toast({
                        mes: "报名失败",
                        timeout: 1500
                    })
                })
            },
            //活动详情
            get_activity(){
                var that = this
                var params = {}
                params.id = that.id
                params.access_token = window.localStorage.getItem('access_token')
                params.device = "wx"
                that.$axios.post(get_activity,params)
                .then(res=>{
                    that.details = res.data.data
                })
            },
            submit(){},
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
    .activitydetails{
        min-height:100%;
        padding:1.5rem;
        background-color:#fff;
    }
    .img img{
        width:100%;
    }
    .title{
        font-size:1.8rem;
        color:#333;
        margin-bottom:1rem;
        font-weight:600;
    }
    .details{
        font-size:1.4rem;
        color:#333;
        margin-bottom:2rem;
        display:flex;
        align-items: center;
    }
    .details span:first-child{
        color:red;
        border:1px solid red;
        border-radius:5px;
        font-size:1.2rem;
        margin-right:1rem;
        padding:0.1rem 0.2rem;
    }
    .modular{
        font-size:1.6rem;
        text-align: center;
        border-bottom:1px solid #ddd;
        padding-bottom:1rem;
        color:#333;
    }
    .intro{
        font-size:1.6rem;
        color:#666;
        padding:1rem 0; 
        border-bottom:1px solid #ddd;
    }
    .intro .el-col:last-child{
        text-align:right;
    }
    .subtitle{
        font-size:1.6rem;
        line-height:1.8rem;
        color:#333;
        padding-left:1rem;
        border-left:5px solid red;
        font-weight:normal;
        margin:2rem 0;
    }
    .describe{
        font-size:1.6rem;
        color:#666;
        min-height:10rem;
    }
    .btn{
        width:60%;
        display:block;
        color:#FFF;
        margin:0 auto;
        margin-top:3rem;
        margin-bottom:2rem;
        background: -webkit-linear-gradient(#FF6666, #B60000); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FF6666, #B60000); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FF6666, #B60000); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FF6666, #B60000); /* 标准的语法 */
    }
    .btn2{
        width:60%;
        display:block;
        color:#FFF;
        margin:0 auto;
        margin-top:3rem;
        margin-bottom:2rem;
    }
</style>