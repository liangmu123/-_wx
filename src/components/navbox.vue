<!-- 导航盒子 -->
<template>
    <div class="navbox">
        <router-link :to="details.link">
            <span>
                <img :src="details.src" alt="图片">
            </span>
            <span>
                {{details.name}}
            </span>
        </router-link>
    </div>
</template>
<script>
    export default {
        name:'navbox',
        props:['details'],
        data(){
            return {}
        },
        created(){
        },
        methods:{

        }
    }
</script>
<style scoped>
    .navbox a{
        display:flex;
        width:100%;
        justify-content: flex-start;
        align-items: center;
    }
    .navbox span:first-child{
        width:1.8rem;
        margin-right:2rem;
        margin-left:1rem;
    }
    .navbox span:first-child img{
        width:100%;
    }
    .navbox span:last-child{
        line-height:5rem;
        font-size:1.4rem;
        color:#606060;
    }
</style>