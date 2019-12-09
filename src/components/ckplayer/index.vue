<!-- 视频组件 -->
<template>
    <div id="ysp_ckplayer"></div>
</template>
<script>
    export default {
        props:{
            // 是否禁止快进快退
            prohibitionOfAdvanceAndRetreat:{
                type:Boolean,
                default:false,
            },
            // 是否自动播放
            autoplay:{
                type:Boolean,
                default:false
            },
            // 是否循环播放
            loop:{
                type:Boolean,
                default:false
            },
            video_url:{
                type:String
            }
        },
        name:'ckplayer',
        data(){
            return {
                player:null,
                nowPlayTime:0,//当前播放时间
                startTime:0,//默认跳转时间
            }
        },
        watch:{
            video_url(val){
                var videoObject = {
                    container: "#ysp_ckplayer", //“#”代表容器的ID，“.”或“”代表容器的class
                    variable: "player", //该属性必需设置，值等于下面的new chplayer()的对象
                    // poster: require('../../assets/test.jpg'), //封面图片
                    autoplay:this.autoplay,
                    loop:this.loop,
                    video: val //视频地址
                }
                // videoObject["seek"] = this.startTime
                this.player = new ckplayer(videoObject)
                // this.onPlay()
                // this.createBeforeunloadHandler()
            }
        },
        mounted(){
            var videoObject = {
                container: "#ysp_ckplayer", //“#”代表容器的ID，“.”或“”代表容器的class
                variable: "player", //该属性必需设置，值等于下面的new chplayer()的对象
                // poster: require('../../assets/test.jpg'), //封面图片
                autoplay:this.autoplay,
                loop:this.loop,
                video: this.video_url //视频地址
            }
            // videoObject["seek"] = this.startTime
            this.player = new ckplayer(videoObject)
            // this.onPlay()
            // this.createBeforeunloadHandler()
        },
        // beforeDestroy(){
        //     //在 beforeDestroy 钩子移除beforeunload事件
        //     this.$emit('handleLeave',this.nowPlayTime)
        //     this.destroyedBeforeunloadHandler()
        // },
        methods:{
            // 监听播放开始事件
            // onPlay(){
            //     var that = this
            //     //var pause = true
            //     // 执行跳过上次时间
            //     // document.getElementsByTagName('video')[0].addEventListener('play', function() {
            //     //     if(document.getElementsByTagName('video')[0].currentTime < that.startTime && pause){
            //     //     document.getElementsByTagName('video')[0].pause()
            //     //     setTimeout(function(){
            //     //         document.getElementsByTagName('video')[0].currentTime = that.startTime
            //     //     },500)
            //     //     pause = false
            //     //     }
            //     // },false)
            //     this.player.addListener('time', this.loadedHandler) //监听播放时间
            //     //添加视频播放结束监听器
            //     //this.player.addListener('ended', this.setTimeend)
            // },
            // 监听当前播放时间
            // loadedHandler() {
            //     //播放器加载后会调用该函数
            //     this.player.addListener("time", this.timeHandler) //监听播放时间,addListener是监听函数，需要传递二个参数，'time'是监听属性，这里是监听时间，timeHandler是监听接受的函数
            // },
            // 监听当前播放时间事件
            // timeHandler(t) {
            //     // console.log("当前播放的时间：" + t);
            //     this.nowPlayTime = parseInt(t)
            //     if(this.prohibitionOfAdvanceAndRetreat){
            //         if(this.nowPlayTime - this.startTime >2 || this.startTime - this.nowPlayTime >2){
            //             document.getElementsByTagName('video')[0].currentTime = this.startTime
            //         }else{
            //             this.startTime = this.nowPlayTime
            //         }
            //     }
            // },
            //视频结束事件
            // setTimeend() {
            //     // 关闭事件监听
            //     //player.removeListener('ended', setTimeend)
            //     // 重新获取新的实例
            //     //player=new ckplayer(videoObject)
            //     // 初始化时间
            //     this.startTime = 0
            //     this.nowPlayTime = 0
            // },
            //添加beforeunload监听事件
            // createBeforeunloadHandler() {
            //     var that = this
            //     window.addEventListener('beforeunload', that.beforeunloadHandler, false)
            // },
            // // 具体行为
            // beforeunloadHandler(e) {
            //     this.$emit('handleLeave',this.nowPlayTime)
            // },
            // //移除beforeunload事件
            // destroyedBeforeunloadHandler() {
            //     var that = this
            //     window.removeEventListener('beforeunload', this.beforeunloadHandler, false)
            // }
        }
    }
</script>
<style scoped>
    #ysp_ckplayer{
        width:100%;
        height:20rem;
    }
</style>