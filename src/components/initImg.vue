<!-- 图片放大显示 -->
<!-- 志愿者活动 -->
<template>
    <!-- 图片预览触摸 -->
    <div class="imgTouch">
        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
   
            <!-- Background of PhotoSwipe. 
                It's a separate element as animating opacity is faster than rgba(). -->
            <div class="pswp__bg"></div>
        
            <!-- Slides wrapper with overflow:hidden. -->
            <div class="pswp__scroll-wrap">
        
                <!-- Container that holds slides. 
                    PhotoSwipe keeps only 3 of them in the DOM to save memory.
                    Don't modify these 3 pswp__item elements, data is added later on. -->
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
        
                <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
                <div class="pswp__ui pswp__ui--hidden">
        
                    <div class="pswp__top-bar">
        
                        <!--  Controls are self-explanatory. Order can be changed. -->
        
                        <div class="pswp__counter"></div>
        
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
        
                        <!-- <button class="pswp__button pswp__button--share" title="Share"></button> -->
        
                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
        
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
        
                        <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                        <!-- element will get class pswp__preloader--active when preloader is running -->
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div> 
                    </div>
        
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                    </button>
        
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                    </button>
        
                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
        
                </div> 
            </div>
        </div>
        <div style="opacity: 0;"></div>
      </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        name:'initImg',
        data(){
            return {
                items : [],
                index:0,
            }
        },
        computed:{
            imgList(){
                var arr = []
                for(var i=0;i<this.items.length;i++){
                    for(var j=0;j<this.items.length;j++){
                        if(this.items[j].index == i){
                            arr.push(this.items[j])
                            break
                        }else{
                            continue
                        }
                    }
                }
                console.log(arr,666)
                return arr
            }
        },
        methods:{
            getImgs(){
                //console.log($('img').not('.navigation img'),'执行了')
                var that = this;
                var arr = $('.initImg img')
                console.log(arr)
                for(let i=0;i<arr.length;i++){
                        arr[i].setAttribute("data-index",i)
                        arr[i].addEventListener("click",function(e){
                            //console.log(e.target)
                            //console.log(e.target.getAttribute("data-index"))
                            that.index = Number(e.target.getAttribute("data-index"))
                            that.initImg()
                        })
                    //console.log(arr[i].src)
                    let obj = {}
                    obj.index = i
                    obj.src = arr[i].src
                    let theImage = new Image()
                    theImage.src = arr[i].src
                    theImage.onload = function(){
                        var imageWidth = theImage.width
                        var imageHeight = theImage.height
                        obj.w = imageWidth
                        obj.h = imageHeight
                        that.items.push(obj)
				    }
                }
                //that.initImg();
                //console.log(that.items)
            },
            initImg(){
                //console.log("执行了")
                var that = this;
                var pswpElement = document.querySelectorAll('.pswp')[0];
        
                // build items array
                var items = that.imgList
        
                // define options (if needed)
                var options = {
                    // optionName: 'option value'
                    // for example:
                    index: that.index // start at first slide
                };
        
                // Initializes and opens PhotoSwipe
                var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
            },
        }
    }
</script>