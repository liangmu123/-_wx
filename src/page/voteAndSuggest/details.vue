<template>
    <!-- 详情 -->
    <div class="details navigation_bottom">
        <articler v-if="details.img" :canJump="false" :needBottom="false" :details="details"></articler>
        <word v-else :canJump="false" :needBottom="false" :details="details"></word>
        <div class="block"></div>
        <section>
            <el-row>
                <el-col :span="8">
                    活动时间：
                </el-col>
                <el-col :span="16">
                    {{details.format_start_time}} 至 {{details.format_end_time}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    限制次数：
                </el-col>
                <el-col :span="16">
                    {{details.can_use_tickets}}次/人
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    {{details.brief}}
                </el-col>
            </el-row>
            <el-row>
                <el-col class="option" :span="24">
                    选项
                </el-col>
            </el-row>
            <el-row>
                <el-col class="center" :span="24" v-for="(item,index) in options" :key="index">
                    <el-radio :disabled="details.status == 2" size="medium" v-model="radio" :label="index">{{item.title}}</el-radio>
                </el-col>
            </el-row>
            <el-input
            class="ysp_textarea"
            type="textarea"
            :rows="6"
            placeholder="请输入选择该选项的原因"
            v-model="textarea">
            </el-input>
            <el-button v-if="details.status == 1" type="danger" @click="submit" style="width:100%;margin:0 auto;display:block;margin-bottom:4rem;">提交</el-button>
        </section>
    </div>
</template>
<script>
    import word from './word'
    import articler from './articler'
    import {mapActions} from 'vuex'
    import {voteAndSuggestDetails,submitVote} from '@/api/api'
    export default {
        data(){
            return {
                radio:'',
                details:{},
                options:[],
                textarea:''
            }
        },
        components:{
            word,
            articler
        },
        created(){
            this.setNavModular({modular:0})
            this.get_details()
        },
        methods:{
            get_details(){
                var that = this
                that.$axios.post(voteAndSuggestDetails,{
                    id:this.$route.query.id
                })
                .then(res=>{
                    that.details = res.data.data.vote
                    that.options = res.data.data.options
                })
            },
            submit(){
                var that = this
                if(that.radio === ''){
                    that.$dialog.toast({
                        mes:"请选择",
                        timeout:1500
                    })
                    return
                }
                that.$axios.post(submitVote,{
                    id:that.options[that.radio].tid,
                    oid:that.options[that.radio].id,
                    access_token : window.localStorage.getItem('access_token'),
                    content:that.textarea
                })
                .then(res=>{
                    if(res.data.code == 0){
                        that.$dialog.toast({
                            mes: '投票成功',
                            timeout: 1500,
                            icon: 'success'
                        })
                        // window.location.reload()
                    }else{
                        that.$dialog.toast({
                            mes:res.data.message,
                            timeout:1500
                        })
                    }
                })
            },
            ...mapActions([
                'setNavModular'
            ])
        }
    }
</script>
<style scoped>
    .details{
        padding:0 1rem 1rem 1rem;
        min-height:100%;
        background-color:#FFF;
    }
    section{
        font-size:1.8rem;
    }
    section>div{
        margin-bottom:1rem;
    }
    .block{
        height:1rem;
    }
    .center{
        margin-left:30px;
        margin-bottom:1rem;
    }
    /* .center:last-child{
        margin-bottom:5rem;
    } */
    .option{
        color:#999;
    }
    
</style>
<style>
    .el-radio__label{
        font-size:18px !important;
    }
    .el-radio__input.is-checked .el-radio__inner{
        background-color: #F56C6C !important;
        border-color: #F56C6C !important;
    }
    .el-radio__input.is-checked+.el-radio__label{
        color:#F56C6C !important;
    }
    .el-radio__inner{
        width:16px !important;
        height:16px !important;
    }
</style>