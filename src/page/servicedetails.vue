<!-- 志愿服务详情 -->
<template>
    <div class="servicedetails">
        <div class="img initImg">
            <!-- 图片轮播 -->
            <yd-slider autoplay="3000">
                <yd-slider-item v-for="(item,index) in details.img" :key="index">
                    <img :src="IMG_PATH + item">
                </yd-slider-item>
            </yd-slider>
        </div>
        <div class="position">
            <div class="content navigation_bottom">
                <div class="header">
                    <p class="title">{{details.title}}</p>
                    <p class="time">
                        <i class="el-icon-time"></i>
                        <span>{{details.time}}</span>
                    </p>
                </div>
                <div class="details">
                    <ul>
                        <li v-for="(item,index) in details.top" :key="index">
                            <div class="top">
                                <img :src="item.src" alt="图片">
                                <span>{{item.title}}</span>
                            </div>
                            <div class="bottom">
                                {{item.value}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="details bottom">
                    <ul>
                        <li v-for="(item,index) in details.bottom" :key="index">
                            <div class="top">
                                <img :src="item.src" alt="图片">
                                <span>{{item.title}}</span>
                            </div>
                            <div class="bottom">
                                {{item.value}}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="intro">求助内容</div>
                <div class="describe">
                    {{details.content}}
                </div>
                <el-button class="btn"  v-if="newStatus == 0 && type != 'myservice'" @click="help" :disabled="isDisabled" >我来帮助</el-button>
                <!-- 我的求助 评价页面 -->
                <div class="appraise" v-if="newStatus == 1 && type == 'myservice' && show == 'true'">
                    <div class="intro">评价</div>
                    <el-rate
                    class="star"
                    v-model="appraise"
                    :colors="colors"
                    show-text>
                    </el-rate>
                    <yd-textarea v-model.trim="content" placeholder="请输入内容" maxlength="1000"></yd-textarea>
                    <el-button class="btn" @click="submit" :disabled="isDisabled">提交</el-button>
                </div>
                <!-- 已评价页面 -->
                <div class="appraise  navigation_bottom" v-if="newStatus == 2">
                    <div class="intro">评价</div>
                    <el-rate
                    class="star"
                    v-model="details.appraise"
                    :colors="colors"
                    disabled
                    show-text>
                    </el-rate>
                    <div class="intro">评价内容</div>
                    <div class="appraisecontent">
                        <span v-if="details.appraisecontent != ''" >
                            {{details.appraisecontent}}
                        </span>
                        <span v-else style="color:#D8D8D8;">
                            未评价
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 图片预览组件 -->
        <initImg ref="initImg"></initImg>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import initImg from '@/components/initImg'

    import {get_help} from '@/api/api'
    import {post_help} from '@/api/api'
    import {post_appraise} from '@/api/api'
    export default {
        name:'servicedetails',
        data(){
            return {
                details:{
                    img:[],
                    title:'',
                    time:'',
                    top:[
                        {title:'求助人',value:'',src:require('../assets/service/details/name.png')},
                        {title:'联系方式',value:'',src:require('../assets/service/details/phone.png')},
                        {title:'求助类型',value:'',src:require('../assets/service/details/type.png')},
                    ],
                    bottom:[
                        {title:'帮助人',value:'',src:require('../assets/service/details/help.png')},
                        {title:'求助时长',value:'',src:require('../assets/service/details/time.png')},
                        {title:'求助状态',value:'',src:require('../assets/service/details/status.png')},
                    ],
                    content:'',
                    appraise:0,
                    appraisecontent:'',
                },
                status:['求助中','已接单','已完成'],
                newStatus:10,
                appraise:5,
                isDisabled:false,
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
                id:this.$route.query.id,
                content:'',
                type:this.$route.query.type,
                show:this.$route.query.show,
                IMG_PATH:IMG_PATH,
            }
        },
        created(){
            this.setNavModular({modular:1})
            this.get_help()
        },
        updated(){
            this.$refs.initImg.getImgs()
        },
        watch: {
            newStatus(newValue, oldValue) {
        　　　　if(newValue == 0){
                    this.details.bottom[2].value = this.status[0]
               }else if(newValue == 1){
                    this.details.bottom[2].value = this.status[1]
               }else if(newValue == 2){
                    this.details.bottom[2].value = this.status[2]
               }
        　　}
        },
        components:{
            initImg,
        },
        methods:{
            submit(){
                var that = this
                var params = {}
                if(that.content == ''){
                    that.$dialog.toast({
                        mes: "说点什么吧",
                        timeout: 1500
                    })
                    return
                }
                params.access_token = window.localStorage.getItem('access_token')
                params.id = that.id
                params.scores = that.appraise
                params.reply_info = that.content
                that.$axios.post(post_appraise,params)
                .then(res=>{
                    that.$dialog.toast({
                        mes: "评价成功",
                        timeout: 1500
                    })
                    setTimeout(function () {
                        that.$router.go(-1)
                    },1500)
                })
            },
            get_help(){
                var that = this
                var params = {}
                params.id = that.id
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(get_help,params)
                .then(res=>{
                    that.details.title = res.data.data.title
                    that.details.time = res.data.data.format_add_time
                    that.details.top[0].value = res.data.data.username
                    that.details.top[1].value = res.data.data.mobile
                    that.details.top[2].value = res.data.data.type
                    if(res.data.data.help_name){
                        that.details.bottom[0].value = res.data.data.help_name
                    }else{
                        that.details.bottom[0].value = "暂未接单"
                    }
                    that.details.bottom[1].value = res.data.data.duration + '小时'
                    that.newStatus = res.data.data.stauts
                    that.details.content = res.data.data.content
                    that.details.appraise = Number(res.data.data.scores)
                    that.details.appraisecontent = res.data.data.reply_info
                    that.details.img = res.data.data.img
                })
            },
            help(){
                var that = this
                var param = {}
                param.access_token = window.localStorage.getItem('access_token')
                param.id = that.id
                that.$axios.post(post_help,param)
                .then(function (response) {
                    if(response.data.status == 200 && response.data.code != 10214 && response.data.code != 10508){
                        that.$dialog.toast({
                            mes: "帮助成功",
                            timeout: 1500
                        })
                        setTimeout(function () {
                            that.$router.go(-1)
                        },1500)
                    }else if(response.data.code == 10508){
                        that.$dialog.toast({
                            mes: response.data.message,
                            timeout: 1500
                        })
                    }else {
                        that.$dialog.confirm({
                            title: '您还不是志愿者,是否前往注册?',
                            opts: () => {
                                that.$dialog.toast({mes: '正在跳转志愿者注册界面', timeout: 1000});
                                    setTimeout(function(){
                                        that.$router.push('/applyvolunteer')
                                    },1000)
                                }
                        })
                    }
                })
                .catch(err=>{
                    that.$dialog.toast({
                        mes: "帮助失败",
                        timeout: 1500
                    })
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
    .img{
        min-height:15rem;
    }
    .img img{
        max-height:30rem;
        display:block;
    }
    .position{
        position:relative;
        z-index:10;
    }
    .content{
        padding:1rem;
        background-color: #fff;
        width:90%;
        margin:0 auto;
        border-top-left-radius:15px;
        border-top-right-radius:15px;
        position:absolute;
        top:-3rem;
        left:50%;
        transform: translateX(-50%);
        z-index:10;
        box-shadow: 0px 0px 10px #CCC;
    }
    .header{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom:1rem;
        flex-wrap: wrap;
        padding:1rem 0;
    }
    .title{
        font-size:1.8rem;
        color:#303030;
        line-height:2rem;
    }
    .time{
        font-size:1.4rem;
        color:#8B8B8B;
    }
    .details{
        margin-bottom:1.5rem;
    }
    ul{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    ul>li .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size:1.4rem;
        color:#787878;
        margin-bottom:0.5rem;
    }
    ul>li img{
        width:1rem;
        display:block;
        margin-right:0.4rem;
    }
    ul>li span{
        font-size:1.4rem;
        color:#108EE9;
    }
    ul>li div{
        text-align: center; 
    }
    .details.bottom{
        padding-bottom:2rem;
        border-bottom:1px solid #D8D8D8;
        margin-bottom:0;
    }
    .intro{
        line-height:4rem;
        font-size:1.4rem;
        color:#108EE9;
    }
    .describe{
        font-size:1.4rem;
        color:#606060;
        min-height:6rem;
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
    .star{
        padding-bottom:4rem;
        border-bottom:1px solid #D8D8D8;
    }
    .appraisecontent{
        min-height:8rem;
        border:1px solid #D8D8D8;
        padding:1rem;
        font-size:1.6rem;
    }
</style>