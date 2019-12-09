<template>
    <!-- 图文组件 -->
    <div class="article" :class="{bottom:needBottom}" @click="jump">
        <div class="imgKuang">
            <img :src="IMG_PATH + details.img" alt="">
            <p class="title">{{details.title}}</p>
        </div>
        <footerer :details="details"></footerer>
    </div>
</template>
<script>
    import footerer from './footerer'
    export default {
        props:{
            details:{
                type:Object
            },
            canJump:{
                type:Boolean,
                default:true
            },
            needBottom:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return {
                IMG_PATH:IMG_PATH
            }
        },
        components:{
            footerer
        },
        methods:{
            jump(){
                if(!this.canJump){
                    return
                }
                this.$router.push('/voteAndSuggestDetails?id='+this.details.id)
            }
        }
    }
</script>
<style scoped>
    .article{
        padding:1rem 0 0 0;
    }
    .bottom{
        border-bottom:1px solid #ddd;
    }
    .imgKuang img{
        width:100%;
        display:block;
    }
    .imgKuang{
        position:relative;
    }
    .title{
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        line-height: 2rem;
        font-size:1.8rem;
        padding:0.4rem 0.2rem;
        color:#fff;
        z-index:10;
        background-color:rgba(0,0,0,.6);
    }
</style>