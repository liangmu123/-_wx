<!-- 纯文字列表组件 -->
<template>
    <div class="ysp_word">
        <router-link v-if="modular == 0" :to="'/articledetails?id=' + details.id">
            <p>{{details.title}}</p>
            <p>{{details.add_time}}</p>
        </router-link>
        <router-link v-else-if="modular == 1" :to="'/articledetails?modular=1&id=' + details.id">
            <p>{{details.title}}</p>
            <p>{{details.add_time}}</p>
        </router-link>
        <router-link v-else-if="modular == 2" :to="'/articledetails?modular=2&id=' + details.id">
            <p>{{details.title}}</p>
            <p>{{details.add_time}}</p>
        </router-link>
    </div>
</template>
<script>
    export default {
        name:'wordComponent',
        props:{
            details:{
                type:Object
            },
            modular:{
                type:[Number,String],
                default:0
            }
        },
        data(){
            return {
            }
        },
        created(){
        },
    }
</script>
<style scoped>
    .ysp_word{
        padding:1rem 0;
    }
    .ysp_word p:first-child{
        font-size:1.8rem;
        line-height:24px;
        color:#333;
        margin-bottom:1rem;
    }
    .ysp_word p:last-child{
        font-size:1.6rem;
        line-height:1.6rem;
        color:#999999;
    }
</style>