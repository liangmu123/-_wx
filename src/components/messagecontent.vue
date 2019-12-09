<!-- 资讯内容 -->
<template>
    <div class="messagecontent">
        <div class="title">
            <h2>{{details.title}}</h2>
        </div>
        <div class="content" :class="{over_hidden:over_hidden}">
            <p id="overcontent">
                {{details.brief}}
            </p>
        </div>
        <!-- <p>用户对你的评价是</p>
        <p class="rate">
            <el-rate
                v-model="rate"
                disabled
                :colors="colors">
            </el-rate>
        </p> -->
        <p style="text-align: right;color:#BBB;">{{details.add_time}}</p>
        <p v-if="hiddenBtn" class="color">
            <span v-if="over_hidden" @click="over_hidden = false">展开</span>
            <span v-else @click="over_hidden = true">收起</span>
        </p>
    </div>
</template>
<script>
    export default {
        name:'messagecontent',
        props:{
            details:{
                type:Object,
            },
        },
        data(){
            return {
                IMG_PATH:IMG_PATH,
                over_hidden:true,
                colors:['#99A9BF', '#FEE056', '#FF9900'],
                rate:5,
                hiddenBtn:false,
            }
        },
        created(){
        },
        mounted(){
            this.judgeHeight()
        },
        methods:{
            judgeHeight(){
                var height = document.getElementById('overcontent').offsetHeight
                console.log(height)
                if(height > 60){
                    this.over_hidden = true
                    this.hiddenBtn = true
                }else{
                    this.over_hidden = false
                    this.hiddenBtn = false
                }
            },
        }
    }
</script>
<style scoped>
    .messagecontent{
        font-size:1.6rem;
        border-bottom: 1px solid #ddd;
        padding-bottom:1rem;
        margin-bottom:1rem;
    }
    .title{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom:1rem;
    }
    h2{
        font-size:2rem;
        line-height: 2rem;
        font-weight: normal;
        color:#606060;
    }
    .title>p{
        color:#aaa;
    }
    .content{
        font-size:16px;
        margin-bottom:1rem;
    }
    .content>p{
        text-align: justify;
        
        color:#4A98EB;
    }
    .over_hidden{
        position: relative;
        line-height: 20px;
        height: 60px;
        overflow: hidden;
    }
    .over_hidden::after {
        content: "\02026";
        font-weight: bold;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0 20px 1px 45px;
        background:-webkit-linear-gradient(left,transparent,#fff 55%);
        background:-o-linear-gradient(right,transparent,#fff 55%);
        background:-moz-linear-gradient(right,transparent,#fff 55%);
        background:linear-gradient(to right,transparent,#fff 55%);
    }
    .rate{
        text-align: right;
    }
    .color{
        color:#4A98EB;
    }
</style>