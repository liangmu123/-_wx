<!-- 活动报名组件 -->
<template>
    <div class="activitycontent">
        <div @click="jump(details.id)">
            <div class="img">
                <img src="../assets/test.jpg" alt="图片">
                <div class="describe">
                    <span>{{details.add_time}}</span>
                    <span v-if="details.joiner.length>0">
                        {{details.joiner.length}}个人已参加
                    </span>
                    <span v-else>
                        暂无人报名
                    </span>
                </div>
            </div>
            <div class="header">
                <div class="title">{{details.title}}</div>
                <el-button type="danger" v-if="details.status!=2 && details.is_bm==99" class="btn" @click.stop="showdialogForm(details.id)">报名</el-button>
                <el-button type="info" v-if="details.is_bm == 1" disabled @click.stop>已报名</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'activitycontent',
        props:['details','link','type'],
        data(){
            return {
                IMG_PATH:IMG_PATH,
            }
        },
        created(){
        },
        methods:{
            // 显示弹窗
            showdialogForm(id){
                this.$emit('showdialogForm',id)
            },
            jump(id){
                this.$router.push({name:this.link,query:{type:this.type,id:id}})
            }
        }
    }
</script>
<style scoped>
    .activitycontent{
        width:100%;
    }
    .activitycontent .img{
        width:100%;
        height:15rem;
        position:relative;
    }
    .activitycontent .img>img{
        width:100%;
        height:100%;
    }
    .activitycontent .img .describe{
        position:absolute;
        z-index:999;
        left:0;
        bottom:0;
        width:100%;
        padding:0 1rem 1rem 1rem;
        display:flex;
        justify-content: space-between;
    }
    .activitycontent .img .describe span{
        font-size:1.2rem;
        color:#FFF;
    }
    .activitycontent .img .describe span:last-child{
        background-color:rgba(0,0,0,.6);
        padding:0 0.5rem;
        border-radius:2px;
    }
    .activitycontent .img .describe span:last-child i{
        margin-right:0.5rem;
    }
    .activitycontent .title{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:1.8rem;
        width:calc(100% - 9rem);
    }
    .header{
        display:flex;
        justify-content: space-between;
        align-items: center;
        background-color:#FFF;
        padding:0.5rem;
    }
    .btn{
        width:8rem;
        padding-top:0;
        padding-bottom:0;
        line-height:3rem;
    }
</style>