<!-- 一点通发布信息 -->
<template>
    <div class="appeal navigation_bottom">
        <div class="header">
            <yd-textarea placeholder="请输入内容" maxlength="1000" v-model.trim="content"></yd-textarea>
        </div>
        <div class="middle">
            <div class="btn fontSize_1_8rem" @click="appeal">
                发布
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import {suggest} from '@/api/api'
    export default {
        name:'appeal',
        data(){
            return {
                content:'',
                id:this.$route.query.id,
            }
        },
        created(){
            this.setNavModular({modular:0})
        },
        methods:{
            // 发布求助
            appeal(){
                var that = this
                var params = {}
                if(!this.content){
                    this.$dialog.toast({
                        mes: "请输入内容",
                        timeout: 1500
                    })
                    return
                }
                params.content = this.content
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(suggest,params)
                .then(res=>{
                    if(res.data.code == 10512){
                        that.$dialog.toast({
                            mes: res.data.message,
                            timeout: 1500
                        })
                    }else{
                        that.$dialog.toast({
                            mes: "发布成功，请等待管理员审核",
                            timeout: 1500
                        })
                        setTimeout(function () {
                            that.$router.go(-1)
                        },1500)
                    }
                })
                .catch(err=>{
                    that.$dialog.toast({
                        mes: "发布失败",
                        timeout: 1500
                    })
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        },
    }
</script>
<style scoped>
    .header{
        padding:1rem;
    }
    .appeal{
        min-height:100%;
        background-color: #FFF;
    }
    .middle{
        display:flex;
        justify-content: center;
        padding:1rem 0;
        background-color:#FFF;
    }
    .btn{
        background-color: #6AC5F8;
        margin:0 auto;
        color:#FFF;
        display:flex;
        align-items: center;
        padding:0.8rem 6rem;
        border-radius: 2px;
        box-shadow:0px 3px 5px #96C6FF;
    }
</style>
<style>
    .appeal .yd-textarea>textarea{
        height:30rem !important;
        font-size:2rem !important;
        border:1px solid #ccc !important;
        padding:1rem !important;
        margin-bottom:1rem !important;
        border-radius:10px !important;
    }
</style>