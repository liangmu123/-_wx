<template>
    <!-- 纯文字组件 -->
    <div class="word" :class="{bottom:needBottom}" @click="jump">
        <el-row class="title">
            <el-col :span="24">
                {{details.title}}
            </el-col>
        </el-row>
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
            }
        },
        components:{
            footerer
        },
        methods:{
            jump(){
                this.$router.push('/voteAndSuggestDetails?id='+this.details.id)
            }
        }
    }
</script>
<style scoped>
    .word{
        padding:1rem 0 0 0;
    }
    .bottom{
        border-bottom:1px solid #ddd;
    }
    .title{
        font-size:1.8rem;
        line-height:2rem;
        margin-bottom:1rem;
    }
</style>