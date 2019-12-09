<!--图文混编组件 -->
<template>
    <div class="ysp_infoList">
        <articleComponent v-if="details.tpe == 2 || details.tpe == 3" :details="details" :link="link" :modular="modular"></articleComponent>
        <videoComponent v-if="details.tpe == 4" :details="details" :modular="modular"></videoComponent>
        <wordComponent v-if="details.tpe == 1" :details="details" :modular="modular"></wordComponent>
        <ordercontent v-if="details.tpe == 99999" :details="details"></ordercontent>
    </div>
</template>
<script>
    // 组件
    import articleComponent from './article'
    import videoComponent from './video'
    import wordComponent from './word'
    import ordercontent from '@/components/ordercontent'
    
    export default {
        props:{
            details:{
                type:Object,
                default:function(){
                    return {
                        tpe:999
                    }
                }
            },
            modular:{
                type:[Number,String],
                default:0
            }
        },
        name:'infoList',
        data(){
            return {
                link:'/articleDetails',
                type:''
            }
        },
        watch:{
        },
        components:{
            articleComponent,
            videoComponent,
            wordComponent,
            ordercontent
        },
    }
</script>
<style scoped>
    .ysp_infoList>div{
        border-bottom:1px solid #ddd;
    }
</style>