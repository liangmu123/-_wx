<template>
    <div class="integralDetails">
        <div class="details">
            <p class="fontSize_1_8rem" v-if="details.note">{{details.note}}</p>
            <p class="fontSize_1_8rem" v-else>{{details.event_note}}</p>
            <p class="fontSize_1_4rem">{{details.format_create_at}}</p>
        </div>
        <div class="integral fontSize_1_6rem">
            <span>
                <template v-if="details.scores > 0">
                    +
                </template>
                {{details.scores}} 积分
            </span>
        </div>
    </div>
</template>
<script>
    
    export default {
        name:'integralDetails',
        props:{
            details:{
                type:Object
            }
        },
        data(){
            return {
            }
        },
        created(){
            
        },
        methods:{
            
        }
    }
</script>
<style scoped>
    .integralDetails{
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding:1rem 1rem;
        border-bottom:1px solid #DDD;
    }
    .details{
        width:70%;
    }
    .details>p:first-child{
        margin-bottom:1rem;
    }
    .details>p:last-child{
        color:#bbb;
    }
    .integral{
        color:#3DB423;
        width:20%;
        text-align: right;
    }
</style>