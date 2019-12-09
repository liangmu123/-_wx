<template>
    <div class="volunteerTeam navigation_bottom">
        <infinitescroll @loadData="get_list" :page="page" :pagesize="pagesize" :totalpage="totalpage" :list="list">
            <team-list class="team" v-for="(item,index) in list" :key="index" :details="item"></team-list>
        </infinitescroll>
    </div>
</template>
<script>
    import TeamList from '@/components/TeamList'
    import infinitescroll from '@/components/infinitescroll'
    import { mapActions } from 'vuex'
    import {get_team} from '@/api/api'
    export default {
        name:'volunteerTeam',
        data(){
            return {
                page:1,
                pagesize:10,
                totalpage:1,
                list:[],
            }
        },
        created(){
            this.setNavModular({modular:1})
            this.get_team()
        },
        components:{
            TeamList,
            infinitescroll
        },
        methods:{
            get_list(){
                this.page ++
                this.get_team()
            },
            get_team(){
                var that = this
                that.$axios.post(get_team)
                .then(res=>{
                    that.list = [...that.list,...res.data.data.items]
                    that.totalpage = res.data.data.totalpage
                    if(that.list.length == 0){
                        that.setShowModule({isShow:true})
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
    .team{
        background-color:#FFF;
        padding:2rem;
        margin-bottom:1rem;
    }
</style>