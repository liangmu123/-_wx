<!-- 页面导航栏 -->
<template>
    <div class="navbar">
        <ul :class="{ul:navList.length <= 5}">
            <li v-for="(item,index) in navList" :key="index">
                <template v-if="item.link == '#'">
                    <div @click="getJSPConfig">
                        <img :src="item.src" alt="导航">
                    </div>
                    <div>{{item.title}}</div>
                </template>
                <router-link v-else-if="second && second == 'second'" :to="item.link">
                    <div>
                        <img :src="item.src" alt="导航">
                    </div>
                    <div>{{item.title}}</div>
                </router-link>
                <router-link v-else-if="item.type == 'volunteeractivity'" :to="item.link">
                    <div>
                        <img :src="item.src" alt="导航">
                    </div>
                    <div>{{item.title}}</div>
                </router-link>
                <router-link v-else :to="item.link + '?id=' + item.id">
                    <div>
                        <img :src="item.src" alt="导航">
                    </div>
                    <div>{{item.title}}</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    var wx = require('weixin-js-sdk')
    export default {
        name:'navbar',
        props:['navList','second'],
        data(){
            return {}
        },
        created(){
        },
        methods:{
            getJSPConfig(){
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    }
                })
                // var that = this
                // let a = BASE_THREE
                // let base = a.substring(0,a.length-1)
                // let urls = window.location.search
                // //console.log(to.fullPath,222)
                // that.$axios.post(BASE+"/index.php/api/v2/user/getJsApiConf",{url:base+urls})
                // .then(res=>{
                //     wx.config(
                //         JSON.parse(res.data.data)
                //     )
                // })
                // .then(function(){
                //     wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                //         //console.log("执行了ready")
                //         wx.scanQRCode({
                //             needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                //             scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                //             success: function (res) {
                //                 var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                //             }
                //         })
                //     })
                // })
            }
        }
    }
</script>
<style scoped>
    .navbar{
        width:100%;
        /* background-color:#FFF; */
        overflow: auto;
    }
    .navbar ul{
        padding:1rem 0.5rem;
        display:flex;
        width:37rem;
        justify-content: flex-start;
    }
    .navbar ul.ul{
        width:100%;
        justify-content: space-between;
    }
    .navbar ul li{
        width:6rem;
    }
    .navbar ul.ul li{
        flex:1;
    }
    .navbar ul li div:first-child{
        width:4rem;
        height:4rem;
        margin:0 auto;
        margin-bottom:1rem;
    }
    .navbar ul li div:first-child img{
        width:100%;
        height:100%;
    }
    .navbar ul li div:last-child{
        text-align: center;
    }
</style>