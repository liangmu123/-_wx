<!-- 一点通首页列表组件 -->
<!-- 一点通列表 -->
<template>
    <div class="indexlist">
        <el-row class="title">
            <el-col :span="24" class="fontSize_1_8rem">
                {{details.title}}
            </el-col>
        </el-row>
        <el-row class="margin_bottom" v-if="need == 'I NEED YOU'">
            <el-col :span="10" class="fontSize_1_6rem">
                联系人：{{details.contacter}}
            </el-col>
            <el-col :span="14" class="fontSize_1_6rem">
                联系方式：{{details.mobile}}
            </el-col>
        </el-row>
        <el-row class="margin_bottom" v-if="need == 'I NEED YOU'">
            <el-col :span="24" class="fontSize_1_6rem">
                地址：{{details.address}}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="span" class="fontSize_1_6rem">
                服务队伍：
            </el-col>
            <el-col :span="24-span" class="fontSize_1_4rem">
                <el-row>
                    <el-col :span="24" class="flex">
                        <span class="tag">{{details.team}}</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        props:{
            need:{
                type:String
            },
            span:{
                type:Number,
                default:7
            },
            details:{
                type:Object
            }
        },
        name:'indexlist',
        data(){
            return {
                IMG_PATH:IMG_PATH
            }
        },
    }
</script>
<style scoped>
    .indexlist{
        border-radius:5px;
        color:#606060;
    }
    .title{
        margin-bottom:1.5rem;
    }
    .tag{
        background-color:#6AC5F8;
        color:#FFF;
        line-height:2rem;
        display:block;
        padding:0 1rem;
        margin-bottom:1rem;
        border-radius: 3px;
    }
    .tag:not(:last-child){
        margin-right:1rem;
    }
    .flex{
        display:flex;
        flex-wrap: wrap;
    }
    .margin_bottom{
        margin-bottom: 1.5rem;
    }
</style>