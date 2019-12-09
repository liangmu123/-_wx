<!-- 发布服务 -->
<template>
    <div class="applyservice navigation_bottom">
        <div class="header">
            <img src="../assets/service/apply/header.png" alt="图片">
            <span>发布服务</span>
        </div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">
                    <img src="../assets/service/apply/title.png" alt="图片">
                </span>
                <yd-input slot="right" v-model.trim="ruleform[0].value" :regex="ruleform[0].regex" placeholder="请输入标题"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">
                    <img src="../assets/service/apply/name.png" alt="图片">
                </span>
                <yd-input slot="right" ref='name' v-model.trim="ruleform[1].value" :regex="ruleform[1].regex" placeholder="请输入姓名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">
                    <img src="../assets/service/apply/phone.png" alt="图片">
                </span>
                <yd-input slot="right" ref='phone' v-model.trim="ruleform[2].value" :regex="ruleform[2].regex" placeholder="请输入手机号码"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">
                    <img src="../assets/service/apply/address.png" alt="图片">
                </span>
                <yd-input slot="right" v-model.trim="ruleform[3].value" placeholder="请输入地址"></yd-input>
            </yd-cell-item>
            <yd-cell-item class="time">
                <span slot="left">
                    <img src="../assets/service/apply/time.png" alt="图片">
                </span>
                <yd-flexbox slot="right">  
                    <yd-flexbox-item>
                        <yd-input ref='time' v-model.trim="ruleform[4].value" :show-clear-icon="false" :show-error-icon="false" placeholder="请输入服务时长(非必填)"></yd-input>
                    </yd-flexbox-item>
                    <div>小时</div>
                </yd-flexbox>
            </yd-cell-item>
        </yd-cell-group>
        <el-row class="type">
            <el-col :span="3" class="flex">
                <img src="../assets/service/apply/type.png" alt="图片">
            </el-col>
            <el-col :span="14">
                <el-select v-model="ruleform[5].value" clearable placeholder="请选择服务类型">
                    <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <yd-cell-group>
            <yd-cell-item class="textarea">
                    <yd-textarea slot="right" v-model.trim="ruleform[6].value" placeholder="请输入内容" maxlength="1000"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
        <el-upload
            class="upload-demo left"
            action="http://192.168.1.112:8000/api/v2/commons/swf_upload_pic"
            :accept="'image/*'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpLoad"
            :on-success="successUp"
            :on-exceed="exceedFile"
            :on-error="errorUp"
            :file-list="fileList"
            list-type="picture"
            :multiple=true
            :limit="3">
            <el-button size="small" type="primary">点击上传图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3张</div>
        </el-upload>
        <el-button class="btn" @click="submit" :disabled="isDisabled">提交</el-button>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import fileUtil from '../util/fileUtil.js'

    import {faBuAppeal} from '@/api/api'

    export default {
        name:'applyservice',
        data(){
            return {
                ruleform:[
                    {value:'',prompt:'请输入标题',isrequired:true},
                    {value:'',prompt:'请输入姓名',isrequired:true,regex:'/^[\u4e00-\u9fa5]{2,4}$/'},
                    {value:'',prompt:'请输入手机号码',isrequired:true,regex:'/^1[2|3|4|5|6|7|8|9][0-9]{9}$/'},
                    {value:'',prompt:'请输入地址',isrequired:true},
                    {value:'',isrequired:false},
                    {value:'',prompt:'请选择服务类型',isrequired:true},
                    {value:'',prompt:'请输入内容',isrequired:true},
                    {value:[],prompt:'请上传图片',isrequired:true}
                ],
                isDisabled:false,
                fileList: [],
                options:["社会治理","家庭修配","陪护老人",
                        "生活缴费","咨询辅导","日用代购",
                        "预约预定","法律服务","其他类型"],
            }
        },
        created(){
            this.setNavModular({modular:1})
        },
        methods:{
            submit(){
                var that = this
                that.isDisabled = true
                var result = that.ruleform.filter(item => {
                    if(item.isrequired){
                        if(item.value == ''){
                            return item
                        }
                    }
                })
                //console.log(result)
                if(result.length > 0){
                    this.$dialog.toast({
                        mes: result[0].prompt,
                        timeout: 1500
                    })
                    that.isDisabled = false
                    return
                }
                var input = that.$refs.name
                if(!input.valid){
                    this.$dialog.toast({
                        mes: "请输入两位到四位的中文名字",
                        timeout: 1500
                    })
                    that.isDisabled = false
                    return
                }
                var input = that.$refs.phone
                if(!input.valid){
                    this.$dialog.toast({
                        mes: "请输入正确格式的手机号码",
                        timeout: 1500
                    })
                    that.isDisabled = false
                    return
                }
                var params = {}
                //console.log(that.ruleform)
                params.title = that.ruleform[0].value
                params.username = that.ruleform[1].value
                params.mobile = that.ruleform[2].value
                params.address = that.ruleform[3].value
                params.duration = that.ruleform[4].value
                params.type = that.ruleform[5].value
                params.content = that.ruleform[6].value
                params.access_token = window.localStorage.getItem('access_token')
                params.img = that.ruleform[7].value
                that.$axios.post(faBuAppeal,params)
                .then(res=>{
                    if(res.data.status == 200){
                        that.$dialog.toast({
                            mes: "发布成功，请等待审核",
                            timeout: 1500
                        })
                        setTimeout(function () {
                            that.$router.go(-1)
                        },1500)
                    }
                })
            },
            exceedFile(){
                this.$dialog.toast({
                    mes: "最多只能上传3张图片",
                    timeout: 1500
                })
            },
            handleRemove(file, fileList) {
                var _this = this;
                var len = fileList.length;
                var path = [];
                for(var i=0;i<len;i++){
                path.push(fileList[i].response.filename);
                }
                _this.ruleform[7].value = path;
                //console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            successUp(response, file, fileList){
                var _this = this;
                var len = fileList.length;
                var path = [];
                for(var i=0;i<len;i++){
                path.push(fileList[i].response.filename);
                }
                _this.ruleform[7].value = path;
            },
            errorUp(err, file, fileList){
                //console.log(err);
            },
            beforeUpLoad(file) {
                return new Promise((resolve) => {
                fileUtil.getOrientation(file).then((orient) => {
                    if (orient && orient === 6) {
                    let reader = new FileReader();
                    let img = new Image();
                    reader.onload = (e) => {
                        img.src = e.target.result;
                        img.onload = function () {
                        const data = fileUtil.rotateImage(img, img.width, img.height);
                        const newFile = fileUtil.dataURLtoFile(data, file.name);
                        resolve(newFile)
                        }
                    },
                    reader.readAsDataURL(file)
                    } else {
                        // let img = new Image()
                        // console.log(img)
                        // let _URL = window.URL || window.webkitURL;
                        // img.onload = function() {
                        //     console.log(img.width,img.height)
                        // }
                        // img.src = _URL.createObjectURL(file)
                        resolve(file)
                    }
                })
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
        }
    }
</script>
<style scoped>
    .applyservice{
        min-height:100%;
        padding-top:2rem;
        padding-left:2rem;
        padding-right:2rem;
        position:relative;
    }
    .header{
        display: flex;
        align-items: center;
        margin-bottom:1rem;
    }
    .header>img{
        width:3rem;
        margin-right:2rem;
    }
    .header span{
        font-size:1.6rem;
    }
    .btn{
        width:60%;
        display:block;
        color:#FFF;
        margin:2rem auto;
        background-color:#409EFF;
    }
    .type img{
        width:1.5rem;
        margin-left:0.2rem;
    }
    .type .flex{
        display:flex;
        align-items: center;
    }
    .type .flex.el-col{
        height:41px;
    }
    .type .el-col{
        border-bottom:1px solid #D8D8D8;
    }
    .el-row{
        padding:0.5rem 0;
    }
</style>