<template>
    <div class="teamList">
        <router-link :to="'/teamdetails?id='+details.id">
            <ul class="outer">
                <li>
                    <ul class="left">
                        <li>
                            <img v-if="details.logo" :src="IMG_PATH + details.logo" alt="logo">
                            <img v-else src="../assets/logo2.png" alt="logo">
                            <p>{{details.title}}</p>
                        </li>
                        <li>
                            <span v-for="(item,index) in details.services" :key="index">
                                {{item}}
                            </span>
                        </li>
                        <li>
                            联系电话：{{details.mobile}}
                        </li>
                    </ul>
                </li>
                <li>
                    <div>
                        <span>{{details.service_time}}</span>
                        <span>服务时长</span>
                    </div>
                </li>
            </ul>
        </router-link>
    </div>
</template>
<script>
    export default {
        name:'TeamList',
        props:['details'],
        data(){
            return {
                IMG_PATH:IMG_PATH
            }
        }
    }
</script>
<style scoped>
    .teamList{
        width:100%;
    }
    .outer{
        width:100%;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .outer>li:first-child{
        width:60%;
    }
    .outer>li:last-child{
        width:40%;
        display: flex;
        justify-content: flex-end;
    }
    .outer>li:last-child>div{
        text-align: center;
    }
    .outer>li:last-child>div>span{
        display:block;
        font-size:1.4rem;
        color:#666;
    }
    .outer>li:last-child>div>span:first-child{
        color:red;
        font-size:2.8rem;
    }
    .left{
        width:100%;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .left>li:first-child{
        width:100%;
        display:flex;
        align-items: center;
        font-size:1.8rem;
        color:#333;
    }
    .left>li:first-child>img{
        width:4rem;
        display:block;
        margin-right:1rem;
    }
    .left>li:nth-child(2){
        font-size:1.4rem;
        color:#666;
        padding:1rem 0 0.5rem 0;
        display:flex;
        align-items: center;
        flex-wrap:wrap;
    }
    .left>li:nth-child(2)>span{
        background-color:#E3E3E3;
        line-height:2rem;
        padding:0 0.5rem;
        display:block;
        margin-right:0.5rem;
        margin-bottom:0.5rem;
    }
    .left>li:last-child{
        font-size:1.6rem;
        color:#666;
    }
</style>