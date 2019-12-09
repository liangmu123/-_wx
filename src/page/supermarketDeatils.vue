<!-- 兑换商品详情 -->
<template>
    <div class="supermarketDeatils navigation_bottom">
        <div class="top">
            <img :src="IMG_PATH + details.img" alt="兑换商品">
            <p>
                <span>{{details.name}}</span>
                <span>{{details.integral}}积分</span>
            </p>
        </div>
        <div class="content">
            <h2>积分使用规则：</h2>
            <p>(1) 平台积分只能用于文明超市兑换礼品</p>
            <p>(2) 积分使用过程中不找零、不兑现、不开发票，不可转移至其他账户</p>
            <p>(3) 使用积分进行兑换，兑换申请一经提交, 一律不能取消(除礼品缺货等特殊情况)</p>
            <p>
                (4) 如电视平台缺货等原因导致的退货退款，
                则抵扣的积分将返还到电视用户账户，如因用户个人原因导致的退货退款，则不返还抵扣积分
            </p>
            <p>
                (5) 兑换礼品请用户到有线营业厅自行办理。
            </p>
            <p v-html="details.content"></p>
            <el-button class="btn" @click="exchange">兑换</el-button>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { goodInfo } from '@/api/api'
    import { exchange } from '@/api/api'
    export default {
        name:'supermarketDeatils',
        data(){
            return {
                id:this.$route.query.id,
                details:{},
                IMG_PATH:IMG_PATH,
            }
        },
        created(){
            this.get_info()
        },
        computed:{
        },
        methods:{
            get_info(){
                var that = this
                var params = {}
                params.id = this.id
                that.$axios.post(goodInfo,params)
                .then(res=>{
                    that.details = res.data.data
                })
            },
            exchange(){
                var that = this
                this.$dialog.confirm({
                    title: '是否兑换该商品',
                    opts: () => {
                        var params = {}
                        params.goods_id = this.id
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
                            }
                        })
                    }
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
    .supermarketDeatils{
        min-height:100%;
        background-color:#FFF;
    }
    .content{
        padding:2rem;
    }
    .top{
        width:100%;
        position: relative;
    }
    .top img{
        width:100%;
        display:block;
    }
    .top p{
        width:100%;
        position: absolute;
        bottom:0;
        color:#FFF;
        line-height:4rem;
        background-color:rgba(0,0,0,.5);
        font-size:1.8rem;
        padding:0 2rem;
        display:flex;
        justify-content: space-between;
    }
    .btn{
        width:80%;
        display:block;
        color:#FFF;
        margin:0 auto;
        margin-top:3rem;
        padding:1rem;
        background: -webkit-linear-gradient(#FF6666, #B60000); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FF6666, #B60000); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FF6666, #B60000); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FF6666, #B60000); /* 标准的语法 */
    }
    .content h2{
        font-size:1.8rem;
        margin-bottom:1rem;
    }
    .content p{
        font-size:1.6rem;
        line-height:2.4rem;
        text-align: justify;
    }
</style>