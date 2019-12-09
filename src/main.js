import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'

// 引入微信
var wx = require('weixin-js-sdk')

// 引入基础样式
import './style/common.css'
import './style/ydui.css'
import './style/element.css'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入ydui
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';

import axios from 'axios'

// 分享接口
import {get_article} from '@/api/api'
import {get_activity} from '@/api/api'
// 统计
import {get_postview} from '@/api/api'
import {postintegral} from '@/api/api'

import VueVideoPlayer from 'vue-video-player'

Vue.use(VueVideoPlayer)

Vue.prototype.$axios= axios
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(YDUI)

// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化


// loading框设置局部刷新，且所有请求完成后关闭loading框
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading () {
    store.dispatch('SET_LOAD_MUTATIONS',{loading:true})
}
function endLoading () {
    store.dispatch('SET_LOAD_MUTATIONS',{loading:false})
}
function startLoading2 () {
    store.dispatch('SET_LOAD_MUTATIONS2',{loading:true})
}
function endLoading2 () {
    store.dispatch('SET_LOAD_MUTATIONS2',{loading:false})
}
function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
function hideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
// console.log(router,6666)
//路由守卫
router.beforeEach((to, from, next) => {
    //清除"缓存"
    if(to.name == 'index' || to.name == 'volunteer'){
        // store.dispatch('SET_TOP_MUTATIONS',{top:0})
        // store.dispatch('SET_TAB_MUTATIONS',{tab:0})
        // store.dispatch('SET_LIST_MUTATIONS',{list:[]})
        // store.dispatch('SET_PAGE_MUTATIONS',{page:1})
        // store.dispatch('SET_ID_MUTATIONS',{id:''})
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }
    if(to.name == 'newInformationlist'){
        startLoading2()
        setTimeout(function(){
            endLoading2() 
        },1000)
    }
    // 关闭数据为空时显示的图片
    store.dispatch('setShowModule',{isShow:false})

    // 获取token
    if(!store.state.user.token){
        var path = BASE_THREE + to.fullPath
        // alert(to.fullPath)
        // alert(to.query.access_token)
        store.dispatch('getToken',{path:path,access_token:to.query.access_token})
        .then(function(){
            // 判断用户是否绑定
            if(!store.state.user.isBind){
                store.dispatch('SET_BIND')
                .then(function(){
                    shareDemo(to)
                    // 统计
                    if(to.name != 'interactive' && to.name != 'center'){
                        postView(to)
                    }
                })
            }
            next()
        })
    }else{
        // 判断用户是否绑定
        if(!store.state.user.isBind){
            store.dispatch('SET_BIND')
        }
        shareDemo(to)
        // 统计
        if(to.name != 'interactive' && to.name != 'center'){
            postView(to)
        }
        next()
    }
})

setTimeout(function(){
    integral()
},600000)

// 十分钟后统计积分
function integral(){
    var param = {}
    // param.device = 'wx'
    param.access_token = window.localStorage.getItem('access_token')
    axios.post(postintegral,param)
    .then(function(res){
        //console.log(res)
    })
    .catch(function(err){
        //console.log(err)
    })
}

//统计
function postView(to){
    var param = {}
    param.device = 'wx'
    param.access_token = window.localStorage.getItem('access_token')
    if(to.query.id){
        param.id = to.query.id
    }
    param.tpe = 1
    axios.post(get_postview,param)
    .then(function(res){
        //console.log(res)
    })
    .catch(function(err){
        //console.log(err)
    })
}

// 分享
function shareDemo(to){
    // 分享
    //console.log(to)
    let a = BASE_THREE
    let base = a.substring(0,a.length-1)
    let urls = window.location.search
    //console.log(to.fullPath,222)
    axios.post(BASE+"/index.php/api/v2/user/getJsApiConf",{url:base+urls})
        .then(function (response) {
            wx.config(
                JSON.parse(response.data.data)
            );
        }).then(function () {
            var shareData = {
                title: '赣县区新时代文明实践中心',
                desc: '欢迎进入赣县区新时代文明实践中心',//这里请特别注意是要去除html
                link: BASE_THREE+to.fullPath,
                imgUrl: require('./assets/logo.png')
            }
            if(to.name == 'volunteerDetails222' || to.name == 'orderSheetDetails222' ){
                var param = {}
                param.access_token = window.localStorage.getItem("token")
                param.id = to.query.id
                param.device = 'wx'
                param.share = 1
                axios.post(get_activity,param)
                    .then(function (response){
                        shareData = {
                            title: response.data.data.title,
                            desc: response.data.data.brief,//这里请特别注意是要去除html
                            link: BASE_THREE+to.fullPath,
                            imgUrl: IMG_PATH+response.data.data.images
                        };
                        share(shareData);
                    })
            }else if(to.name == 'articledetails' || to.name == 'videodetails'){
                var param = {};
                param.id = to.query.id;
                param.device = 'wx';
                param.share = 1;
                axios.post(get_article,param)
                .then(function (response) {
                    shareData = {
                        title: response.data.data.title,
                        desc: response.data.data.brief,//这里请特别注意是要去除html
                        link: BASE_THREE+to.fullPath,
                        imgUrl: IMG_PATH+response.data.data.img
                    }
                    share(shareData)
                })
            }else {
                share(shareData)
            }

            function share() {
                wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                    // wx.updateAppMessageShareData(shareData)
                    // if(wx.onMenuShareTimeline){ //微信文档中提到这两个接口即将弃用，故判断
                    //     wx.onMenuShareAppMessage(shareData)
                    //     wx.onMenuShareTimeline(shareData)//1.0分享到朋友圈
                    // }else{
                    //     wx.updateTimelineShareData(shareData)//1.4分享到朋友圈
                    // }
                        if(wx.updateAppMessageShareData) {
                            wx.updateAppMessageShareData(shareData)
                        }else{
                            wx.onMenuShareAppMessage(shareData)
                        }
                        //分享给朋友圈
                        if (wx.updateTimelineShareData) {
                            wx.updateTimelineShareData(shareData)
                        } else {
                            wx.onMenuShareTimeline(shareData)
                        }
                })
            }
    })
    .catch(function (error) {
        //alert(error)
    })
}

// //request拦截器
axios.interceptors.request.use(
    config => {
        //console.log(config.url,1000000)
        if(config.url != "/auth/sendCode" && config.url != 'http://gzcms.cst-info.cn/index.php/api/v2/user/getJsApiConf' && config.url != 'http://dshcms.cst-info.cn:7001/api/v2/commons/swf_upload_pic'){
            
            showFullScreenLoading()
        }
        //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
        if(store.state.user.token){
            //config.headers.Authorization = `token ${store.state.token}`;
        }else{
            store.dispatch('getToken')
        }
        return config;
    },
    err => {
      hideFullScreenLoading()
      return Promise.reject(err)
    }
)

// //respone拦截器
axios.interceptors.response.use(
    response => {
        hideFullScreenLoading()
        if(response.data.code == 10002){
            var hash = window.location.hash
            var url = encodeURIComponent(BASE_TWO + '/' + hash)
            window.location.href = BASE + '/home/auth/wxlogin?redirect_uri='+url
        }
        return response
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        hideFullScreenLoading()
        if(error.response){   
        }
        return Promise.reject(error.response);
    }
)


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
