<!-- 滚动加载组件 -->
<template>
    <div class="ysp_infinitescroll">
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <div slot="list">
                <slot></slot>
            </div>
            <!-- 数据全部加载完毕显示 -->
            <span class="srcollend" slot="doneTip">没有数据啦~~</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <i class="srcolling el-icon-loading" slot="loadingTip"></i>
        </yd-infinitescroll>
    </div>
</template>
<script>
    export default {
        props:{
            page:{
                type:Number,
                default:1
            },
            pagesize:{
                type:Number
            },
            totalpage:{
                type:Number
            },
            list:{
                type:Array
            }
        },
        name:'infinitescroll',
        data(){
            return {
                
            }
        },
        watch:{
            page(val){
                /* 单次请求数据完毕 */
                if(val == 1){
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
                }
                if(val >= 2){
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
                }
            }
        },
        methods:{
            loadList() {
                if(this.page >= this.totalpage){
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                    return
                }
                this.$emit('loadData')
            }
        },
    }
</script>
<style scoped>
    .srcollend{
        font-size:18px;
        padding:1rem;
        display:block;
    }
    .srcolling{
        font-size:30px;
    }
</style>