<template>
    <div class="myExchangeContent">
        <router-link to="#">
            <ul class="content">
                <li>
                    <img :src="IMG_PATH + details.goodsimg" alt="缩略图">
                </li>
                <li>
                    <div>
                        <p class="textoverflow fontSize_1_8rem color">{{details.goodsname}}</p>
                        <!-- <p class="fontSize_1_2rem">有效期至2019.5.20至2019.8.30</p> -->
                    </div>
                    <div class="fontSize_1_6rem">{{details.integral}}积分</div>
                </li>
                <li v-if="details.sts == 1">
                    <span></span>
                    <span class="fontSize_1_6rem color">待领取</span>
                </li>
                <li v-else>
                    <span class="else"></span>
                    <span class="fontSize_1_6rem color">已领取</span>
                </li>
            </ul>
        </router-link>
    </div>
</template>
<script>
    export default {
        name:'myExchangeContent',
        props:['details'],
        data(){
            return {
                IMG_PATH:IMG_PATH
            }
        },
    }
</script>
<style scoped>
    .myExchangeContent{
        border-bottom:1px solid #DDD;
        padding-bottom:1rem;
    }
    .content{
        width:100%;
        display:flex;
        justify-content: space-between;
        align-items: center;
        height:6.5rem;
    }
    .content li:first-child{
        width:25%;
        height:6.5rem;
    }
    .content li:first-child img{
        width:100%;
        height:100%;
    }
    .content li:nth-child(2){
        width:50%;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        height:6rem;
    }
    .content li:nth-child(2)>div:last-child{
        color:red;
    }
    .content li:last-child{
        width:75px;
    }
    .content li:last-child span:first-child{
        width:10px;
        height:10px;
        border-radius: 10px;
        background-color:red;
        display:inline-block;
        margin-right:5px;
    }
    .content li:last-child span.else:first-child{
        width:10px;
        height:10px;
        border-radius: 10px;
        background-color:#ccc;
        display:inline-block;
        margin-right:5px;
    }
    .fontSize_1_2rem{
        color:#BBB;
    }
    .color{
        color:#3b3b3b;
    }
</style>