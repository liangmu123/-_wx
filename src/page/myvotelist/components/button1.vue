<template>
    <el-button type="danger" :disabled="disabled">
        <!-- {{name | filter}} -->
        投票
    </el-button>
</template>
<script>
    export default {
        name:"button1",
        props:{
            name:{
                type:[String,Number],
                default:'按钮'
            },
            disabled:{
                type:Boolean,
                default:false,
            },
        },
        data(){
            return {
            }
        },
        filters:{
            filter:function(val){
                if(val == 0){
                    return '投票'
                }else if(val == 1){
                    return '已投票'
                }
            },
        },
        methods:{
        },
    }
</script>
<style scoped>
    .el-button--danger{
        background-color:red;
    }
</style>