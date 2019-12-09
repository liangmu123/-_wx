<!-- 首页展示 -->
<template>
    <div class="secondsection" v-if="list.length>0">
        <div class="header">
            <h2 style="display:flex;align-items:center;"><span style="width:10px;height:10px;display:block;background-color:red;transform: rotate(45deg);margin-right:10px;margin-left:1rem;"></span>活动招募</h2>
            <span>
                <router-link to="/orderlist?type=volunteeractivity">
                    <i style="font-size:1.6rem;" class="el-icon-arrow-right"></i>
                </router-link>
            </span>
        </div>
        <div class="content">
            <ordercontent @showdialogForm="showdialogForm" class="marginbottom" v-for="(item,index) in list" :key="index" :details="item" :type="type" :tab='0'></ordercontent>
        </div>
        <appointDialog :dialogForm="dialogFormVisible" :id="id" @closedialogForm="closedialogForm"></appointDialog>
    </div>
</template>
<script>
    import ordercontent from '@/components/ordercontent'
    import appointDialog from '@/components/appointDialog'

    import {get_activityList} from '@/api/api'

    export default {
        name:'secondsection',
        data(){
            return {
                list:[],
                type:'volunteeractivity',
                page:1,
                pagesize:3,
                dialogFormVisible:false,
                id:''
            }
        },
        created(){
            this.get_activityList()
        },
        components:{
            ordercontent,
            appointDialog
        },
        methods:{
            // 显示弹框
            showdialogForm(id){
                //console.log(this.dialogFormVisible)
                this.dialogFormVisible = true
                this.id = id
            },
            // 关闭弹窗
            closedialogForm(){
                //console.log(this.dialogFormVisible)
                this.dialogFormVisible = false
            },
            // 获取活动列表
            get_activityList(){
                var that = this
                var params = {}
                if(this.type && this.type == 'volunteeractivity'){
                    params.is_team = 1
                }else{
                    params.is_team = 0
                }
                params.device = "wx"
                params.page = that.page
                params.pagesize = that.pagesize
                params.access_token = window.localStorage.getItem('access_token')
                that.$axios.post(get_activityList,params)
                .then(res=>{
                    that.list = res.data.data.items
                })
            },
        }
    }
</script>
<style scoped>
    .secondsection{
        background-color:#FFF;
        padding:1rem;
    }
    .header{
        display:flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #E5E5E5;
        padding-bottom:0.5rem;
        margin-bottom:1rem;
    }
    .header h2{
        color:#333333;
        font-size:1.8rem;
        font-weight:normal;
    }
    .header span a{
        color:#333333;
        font-size:1.4rem;
    }
    .main .indexarticle,.main .indexvideo,.main .indexactivity{
        border-bottom:1px solid #E5E5E5;
        margin-bottom:1rem;
    }
    .borderbottom{
        border-bottom:1px solid #ddd;
    }
    .marginbottom{
        margin-bottom:1rem;
    }
    .order:first-child{
        margin-top:1rem;
    }
    .main{
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .volunteermargin{
        margin-bottom:2rem;
    }
    .volunteer:first-child,.volunteer:nth-child(2){
        margin-top:1rem;
    }
    /* 志愿者队伍 */
    .team{
        text-align: center;
        line-height:3rem;
        font-size:1.2rem;
        color:#606060;
    }
</style>