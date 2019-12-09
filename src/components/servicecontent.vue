<!-- 志愿服务组件 -->
<template>
    <div class="servicecontent">
        <router-link :to="{name:'servicedetails',query:{id:details.id,type:type,show:show}}">
            <div class="details">
                <p class="title textoverflow">{{details.title}}</p>
                <p class="time">
                    <i class="el-icon-time"></i>
                    <span>{{details.format_add_time}}</span>
                </p>
                <p class="type">
                    类型：{{details.type}}
                </p>
            </div>
            <div class="img">
                <img :src="IMG_PATH + details.img" alt="图片">
            </div>

            <!-- 订单状态 -->
            <img class="status" v-if="details.stauts == 0" src="../assets/service/ing.png" alt="状态">
            <img class="status" v-if="details.stauts == 1" src="../assets/service/start.png" alt="状态">
            <img class="status" v-if="details.stauts == 2" src="../assets/service/end.png" alt="状态">
            
        </router-link>
    </div>
</template>
<script>
    export default {
        name:'servicecontent',
        props:['details','type','show'],
        data(){
            return {
                IMG_PATH:IMG_PATH
            }
        },
        created(){
        },
        methods:{

        }
    }
</script>
<style scoped>
    .servicecontent{
        width:100%;
    }
    .servicecontent>a{
        display:flex;
        justify-content: space-between;
        background-color:#FFF;
        padding:1rem;
        position: relative;
    }
    .details{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        width:calc(100% - 10rem);
    }
    .title{
        font-size:1.6rem;
        color:#303030;
    }
    .time{
        font-size:1.4rem;
        color:#8B8B8B;
    }
    .type{
        font-size:1.4rem;
        color:#8B8B8B;
    }
    .img{
        width:10rem;
        height:7rem;
    }
    .img img{
        width:100%;
        height:100%;
    }
    .status{
        width:4rem;
        position: absolute;
        right:0.5rem;
        top:0.5rem;
    }
</style>