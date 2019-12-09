<!-- 发布随手拍 -->
<template>
    <div class="takephotos navigation_bottom">
        <div class="title">发布随手拍</div>
        <el-input v-model.trim="title" placeholder="请输入标题"></el-input>
        <yd-cell-group class="textarea">
            <yd-cell-item>
                <yd-textarea v-model.trim="describe" slot="right" placeholder="请输入内容" maxlength="1000"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
        <el-upload
            class="upload-demo left"
            accept="image/*"
            :headers="headers"
            name="file"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="uploadFile"
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
        <el-button type="primary" style="width:100%;margin-top:6rem;" :disabled="isDisabled" @click="submit">发布</el-button>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import fileUtil from '../util/fileUtil.js'

    import {appealphotos} from '@/api/api'
    export default {
        name:'takephotos',
        data(){
            return {
                describe:'',
                fileList: [],
                img: [],
                isDisabled:false,
                title:'',
                headers:{'Content-Type':'multipart/form-data'}
            }
        },
        created(){
            this.setNavModular({modular:3})
        },
        methods:{
            submit(){
                this.isDisabled = true
                if(this.title == ""){
                    this.$dialog.toast({
                        mes: "请输入标题",
                        timeout: 1500
                    })
                    this.isDisabled = false
                    return
                }
                if(this.describe == ""){
                    this.$dialog.toast({
                        mes: "请输入内容",
                        timeout: 1500
                    })
                    this.isDisabled = false
                    return
                }else if(this.img.length == 0){
                    this.$dialog.toast({
                        mes: "拍点什么吧",
                        timeout: 1500
                    })
                    this.isDisabled = false
                    return
                }
                var that = this
                var params = {}
                params.access_token = window.localStorage.getItem('access_token')
                params.title = that.title
                params.content = that.describe
                params.img = []
                for(let item of that.img){
                    params.img.push(item.src)
                }
                params.category = 1006
                that.$axios.post(appealphotos,params)
                .then(res=>{
                    that.$dialog.toast({
                        mes: "发布成功，请等待审核",
                        timeout: 1500
                    })
                    setTimeout(function () {
                        that.$router.replace({name:'appealphotos',query:{type:'myappealphotos'}})
                    },1500)
                })
                .catch(err=>{
                    that.$dialog.toast({
                        mes: "发布失败",
                        timeout: 1500
                    })
                    that.isDisabled = false
                })
            },
            ...mapActions([
                'setNavModular'
            ]),
            exceedFile(){
                this.$dialog.toast({
                    mes: "最多只能上传3张图片",
                    timeout: 1500
                })
            },
            handleRemove(file, fileList) {
                console.log(file,3333)
                // var _this = this;
                // var len = fileList.length;
                // var path = [];
                // for(var i=0;i<len;i++){
                //     if(fileList[i].response.filename){
                //         path.push(fileList[i].response.filename)
                //     }
                // }
                // _this.img = path;
                //console.log(file, fileList);
                for(var i=0;i<this.img.length;i++){
                    if(this.img[i].name == file.name){
                        this.img.splice(i,1)
                        break;
                    }
                }
                console.log(this.img,9999)
            },
            handlePreview(file) {
                //console.log(file);
            },
            successUp(response, file, fileList){
                // console.log(this.fileList,2222)
                // console.log(file, fileList,111)
                // var _this = this;
                // var len = fileList.length;
                // var path = [];
                // for(var i=0;i<len;i++){
                //     if(fileList[i].response.filename){
                //         path.push(fileList[i].response.filename)
                //     }
                // }
                // _this.img = path;
                //console.log(_this.img)
            },
            errorUp(err, file, fileList){
                //console.log(err);
            },
            uploadFile(file){
                 var formData=new FormData()
                 formData.append('file',file)
                 var files = formData
                 var that = this
                 this.$axios.post("http://cms.gxwmsj.com/api/v2/commons/swf_upload_pic",files).then((res)=>{
                    //console.log(res.data.filename)
                    that.img.push({
                        name:file.name,
                        src:res.data.filename
                    })
                    console.log(that.img,111)
                 })
            },
            beforeUpLoad(file) {
                const _this = this
                console.log(file)
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
                    }else{
                        resolve(file)
                    }
                })
                })
            },
        },
    }
</script>
<style scoped>
    .takephotos{
        background-color:#fff;
        min-height:100%;
        padding:1rem;
    }
    .title{
        font-size:1.8rem;
        margin-bottom:2rem;
    }
    .textarea{
        margin-bottom:2rem;
    }
</style>