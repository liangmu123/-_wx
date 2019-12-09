<template>
    <div class="supermarketContent">
        <div>
            <router-link :to="{name:'supermarketDeatils',query:{id:details.id}}">
                <img :src="IMG_PATH + details.img" alt="兑换商品">
                <p class="details">
                    <span class="fontSize_1_2rem textoverflow">{{details.name}}</span>
                    <span class="fontSize_1_2rem">{{details.integral}}积分</span>
                </p>
            </router-link>
        </div>
        <el-button round class="btn" @click="exchange(details.id)">兑换</el-button>
    </div>
</template>
<script>
    import { exchange } from '@/api/api'
    export default {
        props:['details'],
        name:'supermarketContent',
        data(){
            return {
                IMG_PATH:IMG_PATH,
            }
        },
        methods:{
            exchange(id){
                var that = this
                this.$dialog.confirm({
                    title: '是否兑换该商品',
                    opts: () => {
                        var params = {}
                        params.goods_id = id
                        params.access_token = window.localStorage.getItem('access_token')
                        that.$axios.post(exchange,params)
                        .then(res=>{
                            if(res.data.code == 11005){
                                that.$dialog.toast({
                                    mes: res.data.message,
                                    timeout: 1500
                                })
                            }else{
                                that.$dialog.toast({
                                    mes: "兑换成功",
                                    timeout: 1500
                                })
                                setTimeout(function(){
                                    window.location.reload()
                                },1500)
                            }
                        })
                    }
                })
            },
        },
    }
</script>
<style scoped>
    .supermarketContent{
        width:46%;
    }
    .supermarketContent>div:first-child>a{
        display:block;
        width:100%;
        position:relative;
    }
    .supermarketContent>div:first-child>a>img{
        width:100%;
        height:12rem;
        display:block;
        border:1px solid #BBB;
        border-radius:15px;
    }
    .supermarketContent>div:first-child>a>p{
        position:absolute;
        width:100%;
        background-color:rgba(0,0,0,.3);
        bottom:0;
        color:#FFF;
        display: flex;
        justify-content: space-between;
        line-height:3rem;
        border-bottom-left-radius:15px;
        border-bottom-right-radius:15px;
        padding:0 1rem;
    }
    .supermarketContent>div:first-child>a>p>span{
        width:50%;
    }
    .supermarketContent>div:first-child>a>p>span:last-child{
        text-align: right;
    }
    .btn{
        width:80%;
        display:block;
        color:#FFF;
        margin:0 auto;
        margin-top:1rem;
        padding:0.6rem;
        background: -webkit-linear-gradient(#FF6666, #B60000); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FF6666, #B60000); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FF6666, #B60000); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FF6666, #B60000); /* 标准的语法 */
    }
</style>