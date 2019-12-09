// 视频记忆以及时间统计功能
var player = null
var playertime = 0
var startTime = 0
var func = null
function initVideo(video,seek){
        player = null
        playertime = 0
        startTime = seek
        // func = fun
        var videoObject = {
            container: '#ckplayer',//“#”代表容器的ID，“.”或“”代表容器的class
            variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
            // poster:'pic/wdm.jpg',//封面图片
            loop:false,//循环播放
            // seek:100,
            // loaded:'loadHandler',
            video:video//视频地址
        }   
        player=new ckplayer(videoObject)
}
function loadHandler(){
  // 只有首次加载执行此事件
  var pause = true
  //console.log('执行了load',startTime)
  // 执行跳过上次时间
  document.getElementsByTagName('video')[0].addEventListener('play', function() {
    if(document.getElementsByTagName('video')[0].currentTime < startTime && pause){
      document.getElementsByTagName('video')[0].pause()
      setTimeout(function(){
        document.getElementsByTagName('video')[0].currentTime = startTime
      },500)
      pause = false
    }
  },false)
    player.addListener('time', timeHandler) //监听播放时间
    // player.addListener('play', playHandler) //监听播放开始
    //添加视频播放结束监听器
    player.addListener('ended', setTimeend)
}
function timeHandler(time){
    playertime = time //当前视频播放时间
    //console.log(playertime,startTime)
    //console.log(playertime)
    // 禁止快进快退
    if(playertime - startTime >2 || startTime - playertime >2){
      document.getElementsByTagName('video')[0].currentTime = startTime
    }else{
      startTime = playertime
    }
}
//视频结束事件
function setTimeend() {
    // 关闭事件监听
    //player.removeListener('ended', setTimeend)
    // 重新获取新的实例
    //player=new ckplayer(videoObject)
    // 初始化时间
    func(playertime)
    startTime = 0
    playertime = 0
}