<template>
    <!-- 底部 -->
    <div class="footer">
        <el-row>
            <el-col :span="6">
                {{details.format_start_time}}
            </el-col>
            <el-col :span="8">
                {{details.joincount}}人参与
            </el-col>
            <el-col class="green" :span="10" v-if="details.status == 0">
                未开始
            </el-col>
            <el-col class="red" :span="10" v-else-if="details.status == 1">
                正在进行
            </el-col>
            <el-col :span="10" v-else>
                已经结束
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        props:{
            details:{
                type:Object
            }
        },
        data(){

            return {
                
            }
        }
    }
</script>
<style scoped>
    .footer .el-col{
        line-height:3rem;
        color:#999;
        font-size:1.4rem;  
    }
    .green.el-col{
        color:green;
    }
    .red.el-col{
        color:red;
    }
</style>