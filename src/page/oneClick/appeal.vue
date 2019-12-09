<!-- 一点通发布信息 -->
<template>
    <div class="appeal navigation_bottom">
        
        <el-form style="width:90%;margin:0 auto;" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <p class="title">
                <i class="dp"></i>请选择所属区域
            </p>
            <el-form-item prop="suo">
                <el-select @change="handleSuoChange" @focus="handleSuoFocus" v-model="ruleForm.suo" placeholder="请选择文明实践所">
                    <el-option v-for="(item,index) in suooptions" :key="index" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="zhan">
                <el-select v-model="ruleForm.zhan" placeholder="请选择文明实践站">
                    <el-option v-for="(item,index) in zhanoptions" :key="index" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="header">
            <yd-textarea placeholder="请输入求助内容" maxlength="1000" v-model.trim="content"></yd-textarea>
        </div>
        <div class="middle">
            <div class="btn fontSize_1_8rem" @click="appeal">
                发布求助
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import {appeal} from '@/api/api'
    import {get_area,submitOrderSuggest,get_wishList,get_service_type} from '@/api/api'
    export default {
        name:'appeal',
        data(){
            return {
                content:'',
                id:this.$route.query.id,
                ruleForm: {
                    suo: '',
                    zhan:''
                },
                suooptions:[],
                zhanoptions:[],
                rules: {
                    suo: [
                    { required: true, message: '请选择文明实践所', trigger: 'blur' }
                    ],
                    zhan: [
                    { required: true, message: '请选择文明实践站', trigger: 'blur' }
                    ]
                },
            }
        },
        created(){
            this.setNavModular({modular:1})
            this.handleSuoFocus()
        },
        methods:{
            // 发布求助
            appeal(){
                var that = this
                var params = {}
                if(!this.ruleForm.suo){
                    this.$dialog.toast({
                        mes: "请选择文明实践所",
                        timeout: 1500
                    })
                    return
                }
                if(!this.ruleForm.zhan){
                    this.$dialog.toast({
                        mes: "请选择文明实践站",
                        timeout: 1500
                    })
                    return
                }
                if(!this.content){
                    this.$dialog.toast({
                        mes: "请输入求助内容",
                        timeout: 1500
                    })
                    return
                }
                console.log(this.ruleForm.zhan)
                params.brief = this.content
                params.id = this.id
                params.area_id = this.ruleForm.zhan ? this.ruleForm.zhan : this.ruleForm.suo
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(appeal,params)
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
            handleSuoFocus(){
            if(this.suooptions.length > 0) {
                return
            }
            var that = this
            var params = {
                // access_token : window.localStorage.getItem('access_token'),
                id : 1
            }
            that.$axios.post(get_area,params)
            .then(res=>{
                that.suooptions = res.data.data
            })
        },
        handleSuoChange(){
            var that = this
            var params = {
                // access_token : window.localStorage.getItem('access_token'),
                id : that.ruleForm.suo
            }
            that.ruleForm.zhan = ''
            that.$axios.post(get_area,params)
            .then(res=>{
                that.zhanoptions = res.data.data
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
        padding:1.5rem;
    }
    .appeal{
        min-height:100%;
        background-color: #FFF;
        padding-top:1.5rem;
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
    .title {
        font-size: 1.8rem;
        line-height: 36px;
        overflow: hidden;
        width: 90%;
        height: 36px;
        margin-bottom:1.8rem;
        }
        .dp {
        display: block;
        float: left;
        height: 100%;
        width: 10px;
        background: #6AC5F8;
        margin-right: 20px;
        }
        .el-select {
        display: block;
        position: relative;
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