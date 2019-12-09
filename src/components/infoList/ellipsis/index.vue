<!-- 两行文本溢出组件 -->
<template>
    <div :id="'ysp_ellipsis'+index" :class="{content: true, ellipsis: ellipsis}">
        {{title}}
    </div>
</template>

<script>
    export default {
        name:'ellipsis',
        props:{
            title:{
                type:String
            },
            index:{
                type:[String,Number]
            }
        },
        data(){
            return {
                ellipsis: false // 判断是否要加上...的样式
            }
        },
        watch:{
            title(){
                if (this.title){
                    const contentWidth = document.getElementById('ysp_ellipsis'+this.index).offsetWidth //这里根据具体的情况而定
                    this.ellipsis = this.isEllipsis(this.title,contentWidth)
                }
            }
        },
        mounted(){
            
        },
        methods: {
            isEllipsis(content,contentWidth){
                let el = document.createElement('div')  // 创建一个临时div
                el.innerHTML = content
                el.style.width = contentWidth + 'px'
                el.style.lineHeight = 24 + 'px'
                el.style.fontSize = 1.8 + 'rem'
                // el.style.whiteSpace = 'nowrap' // 不换行
                el.style.position = 'absolute'
                el.style.opacity = 1 // 完全透明
                document.body.appendChild(el)
                const elHeight = el.offsetHeight  // 获取这个含有content内容的临时div的宽度
                //console.log(elHeight)
                document.body.removeChild(el)
                return elHeight > 48   // 判断这个临时div的宽度是否大于原节点宽度的两倍
            }
        }
    }
</script>

<style scoped>
    .content {
        max-height: 49px; 
        line-height: 24px;
        overflow: hidden;
        position: relative;
        font-size:1.8rem;
        color:#333333;
    }
    .content.ellipsis:after{
        content: '...';
        font-weight: bold;
        position: absolute;
        top: 22px;
        right: 0;
        padding: 0 10px 1px 40px;
        background: linear-gradient(to right, transparent, #fff 50%);
    }
</style>