<template>
  <div class="order navigation_bottom">
    <transition name="fade">
        <dialog-window v-if="showDialog" :count="count" @handleClose="handleClose"></dialog-window>
    </transition>
    <el-row class="header" :gutter="20">
      <el-col :span="4">
        <img src="../assets/1111.png" alt="">
      </el-col>
      <el-col :span="20">
        <yd-rollnotice autoplay="2000" :height="50">
          <yd-rollnotice-item v-for="(item,index) in orderList" :key="index">{{item.name}}点单了{{item.tpe}}</yd-rollnotice-item>
      </yd-rollnotice>
      </el-col>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <p class="title">
          <i class="dp"></i>所属区域
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
        <p class="title">
          <i class="dp"></i>服务类型
        </p>
        <el-form-item prop="service">
            <el-select @change="serviceChange" v-model="ruleForm.service" placeholder="请选择服务类型">
                <el-option v-for="(item,index) in serviceoptions" :key="index" :label="item.title" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <p class="title">
          <i class="dp"></i>服务内容
        </p>
        <p style="background-color:#eee;padding:1rem;font-size:1.6rem;color:#333;">
          {{content}}
        </p>
        <p class="title">
          <i class="dp"></i>月份
        </p>
        <el-form-item prop="month">
            <el-select v-model="ruleForm.month" placeholder="请选择服务月份">
                <el-option v-for="(item,index) in monthoptions" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <span class="btn" @click="submitForm('ruleForm')">提交</span>
    <p
      class="tip"
    >说明：请您选择所在的实践站、服务类型、期望在哪个月份举报活动，我们会根据百姓点单数据的统计情况，举办对应的活动，接单情况我们及时在个人中心给您反馈，欢迎大家踊跃参与。</p>
  </div>
</template>

<script>
import DialogWindow from '@/components/DialogWindow'
import {get_area,submitOrderSuggest,get_wishList,get_service_type} from '@/api/api'
export default {
    data() {
      return {
        showDialog:false,
        count:0,
        ruleForm: {
            suo: '',
            zhan:'',
            service:'',
            month:''
        },
        rules: {
            suo: [
              { required: true, message: '请选择文明实践所', trigger: 'blur' }
            ],
            zhan: [
              { required: true, message: '请选择文明实践站', trigger: 'blur' }
            ],
            service: [
              { required: true, message: '请选择服务类型', trigger: 'blur' }
            ],
            month: [
              { required: true, message: '请选择服务月份', trigger: 'blur' }
            ]
        },
        suooptions:[],
        zhanoptions:[],
        serviceoptions:[],
        monthoptions:[],
        orderList:[],
        content:''
      }
    },
    components:{
        DialogWindow
    },
    created(){
        this.get_wishList()
        this.handleSuoFocus()
        this.get_months()
        this.get_service_type()
    },
    methods:{
      serviceChange(val){
        for(var i=0;i<this.serviceoptions.length;i++){
          if(val == this.serviceoptions[i].id){
            this.content = this.serviceoptions[i].content
          }
        }
      },
      get_service_type(){
          var that = this
          that.$axios.post(get_service_type,{id:0})
          .then(res=>{
              that.serviceoptions = res.data.data
              that.ruleForm.service = that.serviceoptions[0].id
              that.content = that.serviceoptions[0].content
          })
      },
      handleClose(){
        this.showDialog = false
        this.ruleForm.suo = ''
        this.ruleForm.zhan = ''
        this.ruleForm.service = ''
        this.ruleForm.month = ''
      },
      get_wishList(){
        var that = this
        var params = {
          page:1,
          pagesize:10
        }
        that.$axios.post(get_wishList,params)
        .then(res=>{
            that.orderList = res.data.data.items
            
        })
      },
        get_months() {

            let list = []

            for(let i=1; i<13; i++){

              list.push(i+'月份')

            }

            let previousMonth = new Date().getMonth()
            
            this.monthoptions = list.slice(previousMonth, )

        },
        submitForm(formName) {
          var that = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //console.log(that.ruleForm)
              var params = {
                station:that.ruleForm.zhan,
                place:that.ruleForm.suo,
                month:that.ruleForm.month.slice(0,-2),
                tpe:that.ruleForm.service,
                access_token : window.localStorage.getItem('access_token')
              }
              that.$axios.post(submitOrderSuggest,params)
              .then(res=>{
                        // that.$dialog.toast({
                        //     mes: "发布成功",
                        //     timeout: 1500
                        // })
                        // setTimeout(function () {
                        //     that.$router.go(-1)
                        // },1500)
                        that.count = res.data.data.total
                        that.showDialog = true
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
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
        }
    }
}
</script>

<style  scoped>
.order{
  background-color:#FFF;
}
.header {
  margin-bottom:2rem;
}
.header .el-col.el-col-4{
  height:50px;
}
.header .el-col.el-col-4 img{
  width:100%;
  height:100%;
  display:block;
}
.tip {
  color: #999;
  margin-top: 10rem;
}
.btn {
  text-align: center;
  line-height: 4.2rem;
  border-radius: 5px;
  color: #fff;
  width: 200px;
  height: 4.2rem;
  font-size: 1.8rem;
  background: #87c6ff;
  display: block;
  margin-left: 50%;
  transform: translate(-50%, 100%);
}
.order {
  padding: 2rem 2rem 8rem;
}
.title {
  margin-top: 1.2rem;
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
  background: rgba(255, 77, 77, 1);
  margin-right: 20px;
}
.el-select {
  display: block;
  position: relative;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>