<!-- 头部纯文字组件 -->
<template>
    <div class="ysp_headerNavTab">
        <ul
        v-if="navlist && navlist.length > 0"
        :class="{'justify_content':navlist.length <= 3,'flex_start':navlist.length > 3}">
            <li v-for="(item,index) in navlist"
            :key="index"
            :class="{active:active == index}"
            @click="handleClick(index,item)">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props:{
            navlist:{
                type:Array
            },
            active:{
                type:[String,Number]
            }
        },
        name:'headerNavTab',
        data(){
            return {
            }
        },
        created(){
        },
        methods:{
            handleClick(index,item){
                this.$emit('handleClick',index,item)
            }
        },
    }
</script>
<style scoped>
    .ysp_headerNavTab{
        width:100%;
    }
        ul{
            width:100%;
            display:flex;
            overflow-x: auto;
        }
        ul li{
            line-height: 5rem;
            padding:0 1rem;
            font-size:1.8rem;
        }
        ul li.active{
            color:red;
            border-bottom:2px solid red;
        }
        ul.justify_content{
            justify-content: space-between;
            flex:1;
        }
        ul.justify_content li{
            flex:1;
            text-align: center;
        }
        ul.flex_start{
            justify-content: flex-start;
        }
        ul.flex_start li{
            flex-shrink:0;
        }
        ul.flex_start li:not(:first-child){
            margin-left:2rem;
        }
</style>