<template>
    <!-- 点单弹框 -->
    <div class="dialogWindow">
        <div class="outer">
            <i @click="handleClose" class="el-icon-close closeBtn"></i>
            <div class="inner">
                <p class="margin_bottom_1rem bold">该服务类型点单量</p>
                <p class="margin_bottom_2rem bold font_size_3rem">{{count}}</p>
                <p class="margin_bottom_1rem">您的点单需求已提交</p>
                <p>感谢参与</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            count:{
                type:[Number,String]
            }
        },
        data(){
            return {

            }
        },
        methods:{
            handleClose(){
                this.$emit('handleClose')
            }
        }
    }
</script>
<style scoped>
    .dialogWindow{
        width:100vw;
        height:100vh;
        background-color:rgba(0,0,0,.6);
        position:fixed;
        z-index:100;
        top:0;
        left:0;
    }
    .outer{
        background-color:#fff;
        width:80%;
        position:fixed;
        top:20%;
        left:50%;
        transform: translateX(-50%);
        padding:4rem 2rem 4rem 2rem;
        border-radius:5px;
    }
    .closeBtn{
        position:absolute;
        top:1rem;
        right:1rem;
        font-size:2rem;
        color:#333;
    }
    .inner{
        font-size:2rem;
        color:#333;
        text-align: center;
    }
    .margin_bottom_2rem{
        margin-bottom:2rem;
    }
    .margin_bottom_1rem{
        margin-bottom:1rem;
    }
    .bold{
        font-weight:600;
    }
    .font_size_3rem{
        font-size:3rem;
    }
</style>