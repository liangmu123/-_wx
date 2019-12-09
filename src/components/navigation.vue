<!-- 底部导航组件 -->
<template>
    <yd-tabbar fixed color="#878787" fontsize="1.5rem" padding="1rem" bgcolor="#fff">
        <yd-tabbar-item
            v-for="(item,index) in navList"
            :key="index"
            :title="item.title"
            :link="item.link"
            :style="modular==index?active:false">
                <img slot="icon" style="height:2rem;" :src="modular==index?item.imgActive[1]:item.imgActive[0]">
                <!-- <yd-badge slot="badge" type="danger" v-if="index == 3">111</yd-badge> -->
        </yd-tabbar-item>
    </yd-tabbar>
</template>
<script>
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    export default {
        name:'navigation',
        data(){
            return {
                // 导航
                navList:[
                    {
                        title:'实践中心',
                        link:'/',
                        imgActive:[require('../assets/navigation/homepage.png'),require('../assets/navigation/homepage01.png')]
                    },
                    {
                        title:'志愿服务',
                        link:'/volunteer',
                        imgActive:[require('../assets/navigation/volunteer.png'),require('../assets/navigation/volunteer01.png')]
                    },
                    // {
                    //     title:'百姓点单',
                    //     link:'/oneClick',
                    //     imgActive:[require('../assets/navigation/interactive.png'),require('../assets/navigation/interactive01.png')]
                    // },
                    // {
                    //     title:'学习强国',
                    //     link:'/informationList2?id=228',
                    //     imgActive:[require('../assets/navigation/interactive.png'),require('../assets/navigation/interactive01.png')]
                    // },
                    {
                        title:'活动直播',
                        link:'/live',
                        imgActive:[require('../assets/navigation/interactive.png'),require('../assets/navigation/interactive01.png')]
                    },
                    {
                        title:'个人中心',
                        link:'/center',
                        imgActive:[require('../assets/navigation/center.png'),require('../assets/navigation/center01.png')]
                    }
                ],
                // 激活色
                active:{
                    color:'red'
                }
            }
        },
        created(){
            //console.log(this.modular,111)
        },
        watch:{
            // 监听路由 合理缓存
            $route(val){
               // console.log(val.name)
                switch(val.name){
                    case 'index': this.setNavModular({modular:0});
                    break;
                    case 'volunteer': this.setNavModular({modular:1});
                    break;
                    case 'informationList2': this.setNavModular({modular:2});
                    break;
                    case 'center': this.setNavModular({modular:3});
                    break;
                }
            },
        },
        computed:{
            ...mapState({
                modular:state => state.nav.modular,
            })
        },
        methods:{
            ...mapActions([
                'setNavModular',
            ]),
        },
    }
</script>
<style scoped>
    
</style>