<!-- 预约报名窗口 -->
<!-- 实名认证窗口 -->
<template>
    <div class="bindInfo">
        <h2>实名认证</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" @resetFields>
            <el-form-item prop="name">
                <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请填写姓名"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-row>
                    <el-col :span="16">
                        <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请填写联系方式"></el-input>
                    </el-col>
                    <el-col :span="8">
                      <yd-sendcode
                        v-model="start"
                        storage-key="60"
                        @click.native="sendCode('ruleForm')"
                        type="warning"
                        init-str="获取验证码"
                      ></yd-sendcode>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item  prop="code">
                <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="subInfo('ruleForm')" id="btns">提交</el-button>
    </div>
</template>
<script>
    import {activity_join} from '@/api/api'
    import {sendCode} from '@/api/api'
    import {bind} from '@/api/api'

    import { mapActions } from 'vuex'
    export default {
        name:'bindInfo',
        props:['dialogForm','id'],
        data(){
            var name_validator = (rule, value, callback) =>  {
                if(!(/^[\u4e00-\u9fa5]{2,4}$/.test(value))){
                    callback(new Error('请输入2-4位的中文汉字'))
                }else {
                    callback();
                }
            }
            var phone_validator = (rule, value, callback) =>  {
                if(!(/^1[2|3|4|5|6|7|8|9][0-9]{9}$/.test(value))){
                    callback(new Error('请输入正确格式的手机号码'));
                }else {
                    callback();
                }
            }
            var code_validator = (rule, value, callback) =>  {
                if(!(/^[0-9]{6}$/.test(value))){
                    callback(new Error('请输入6位数字的验证码'));
                }else {
                    callback();
                }
            }
            return {
                dialogFormVisible:false,
                start:false,
                ruleForm: {
                    name: '',
                    phone:'',
                    code:'',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { validator: name_validator, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator: phone_validator, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { validator: code_validator, trigger: 'blur' }
                    ]
                },
            }
        },
        watch:{
            dialogForm(val){
                this.dialogFormVisible = val
                var that = this
                this.$nextTick(function(){
                    that.$refs['ruleForm'].resetFields()
                })
            }
        },
        methods:{
            // // 提交信息
            // subInfo(formName){
            //     var that = this
            //     that.$refs[formName].validate((valid) => {
            //         if(valid){
            //             var params = {};
            //             params.access_token = window.localStorage.getItem('access_token')
            //             params.id = that.id
            //             params.name = that.ruleForm.name
            //             params.mobile = that.ruleForm.phone
            //             that.$axios.post(activity_join,params)
            //             .then(res=>{
            //                 that.dialogFormVisible = false
            //                 that.$dialog.toast({
            //                     mes: "报名成功，请等待工作人员联系",
            //                     timeout: 1500
            //                 })
            //                 that.$router.go(0)
            //             })
            //             .catch(err=>{
            //                 that.$dialog.toast({
            //                     mes: "报名失败",
            //                     timeout: 1500
            //                 })
            //             })
            //         }else{
            //             return false
            //         }
            //     })
            // },
            sendCode(formName) {
                var _this = this;
                this.$refs[formName].validateField('phone',(valid) => {
                    console.log(valid)
                    if (valid == '') {
                        this.$dialog.loading.open('发送中...')
                        setTimeout(() => {
                            this.start = true;
                            this.$dialog.loading.close()
                            var param = {};
                            param.mobile = _this.ruleForm.phone
                            _this.$axios.post(sendCode, param)
                            .then(function (response) {
                            })
                            .catch(function (error) {
                            })
                            this.$dialog.toast({
                                mes: '已发送',
                                icon: 'success',
                                timeout: 1000
                            })
                        },1000);
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                })

            },
            // 实名认证接口
            subInfo(formName){
                var that = this
                that.$refs[formName].validate((valid) => {
                    if(valid){
                        var params = {};
                        params.access_token = window.localStorage.getItem('access_token')
                        // params.id = that.id
                        params.real_name = that.ruleForm.name
                        params.mobile = that.ruleForm.phone
                        params.code = that.ruleForm.code
                        that.$axios.post(bind,params)
                        .then(res=>{
                            if(res.data.code == 20017){
                                that.$dialog.toast({
                                    mes: "验证码填写错误",
                                    timeout: 1500
                                })
                            }else{
                                that.$dialog.toast({
                                    mes: "实名认证成功",
                                    timeout: 1500
                                })
                                setTimeout(function(){
                                    that.$router.go(-1)
                                },1500)
                                
                                //that.SET_BIND()
                            }
                            // that.$router.go(0)
                        })
                        .catch(err=>{
                            that.$dialog.toast({
                                mes: "验证码发送失败",
                                timeout: 1500
                            })
                        })
                    }else{
                        return false
                    }
                })
            },
            // 关闭弹窗
            closedialogForm(){
                this.$emit('closedialogForm')
            },
            ...mapActions([
                'SET_BIND',
            ]),
        }
    }
</script>
<style scoped>
    .bindInfo{
        min-height: 100%;
        background-color: #FFF;
        padding:2rem;
    }
    h2{
        font-size:1.8rem;
        line-height:2rem;
        margin-bottom:2rem;
        font-weight: normal;
        padding-left:2rem;
        border-left:5px solid red;
    }
    #btns{
        width:90%;
        margin:0 auto;
        display:block;
        margin-top:5rem;
    }
</style>