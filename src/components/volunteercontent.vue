<!-- 志愿者盒子 -->
<template>
    <div class="volunteercontent" @click="jumpdetails">
        <div class="img">
            <img :src="IMG_PATH + details.img" alt="图片">
        </div>
        <div class="title">
            <div class="innerHeight" ref='innerHeight' :class="{active:isActive}">
                <p class="innercontentHeight textoverflow" ref='innercontentHeight'>
                    {{details.title}}
                </p>
            </div>
        </div>
        <slot name="volunteerslot" :row="details"></slot>
    </div>
</template>
<script>
    export default {
        name:'volunteercontent',
        props:['details','link','type'],
        data(){
            return {
                isActive:false,
                IMG_PATH:IMG_PATH,
            }
        },
        mounted(){
            // this.judgeHeight()
        },
        updated(){
            // this.judgeHeight()
        },
        methods:{
            jumpdetails(){
                if(this.type){
                    this.$router.push({name:this.link,query:{type:this.type,id:this.details.id}})
                }else{
                    this.$router.push({name:this.link,query:{id:this.details.id}})
                }
            },
            // 判断字体是否超出两行
            // judgeHeight(){
            //     //console.log(this.$refs.innercontentHeight.clientHeight,this.$refs.innerHeight.clientHeight)
            //     this.$refs.innercontentHeight.clientHeight > this.$refs.innerHeight.clientHeight ? this.isActive = true :this.isActive = false
            // },
        },
    }
</script>
<style scoped>
    .volunteercontent{
        width:48%;
        background-color:#FFF;
        border-radius:10px;
        box-shadow: 1px 1px 5px #bbb;
    }
    .volunteercontent .img{
        height:12rem;
    }
    .volunteercontent .img img{
        width:100%;
        height:100%;
        display: block;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
    }
    .volunteercontent .title{
        padding:1rem;
        /* height:5.6rem; */

    }
    .volunteercontent .title>div{
        /* height:3.6rem; */
        overflow: hidden;
        position: relative;
    }
    .volunteercontent .title p{ 
        font-size:1.6rem;
        line-height:1.8rem;
        text-align: left;
        width:100%;
    }
    .volunteercontent .title>div.active::after {
        content: "..."; 
        position: absolute; 
        bottom: 0; 
        right: 0; 
        padding-left: 15px;
        padding-right: 3px;
        padding-bottom: 3px;
        font-size:1.6rem;
        line-height:1.8rem;
        background: -webkit-linear-gradient(left, transparent, #f8f8f8 45%);
        background: -o-linear-gradient(right, transparent, #f8f8f8 45%);
        background: -moz-linear-gradient(right, transparent, #f8f8f8 45%);
        background: linear-gradient(to right, transparent, #f8f8f8 45%);
    }
</style>