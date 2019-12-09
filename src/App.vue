<template>
      <div id="app" :class="{bg:isShow}">
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive">
              </router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive">
          </router-view>
          <navigation></navigation>
          <div v-show="loading" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:9999;" v-loading="loading" element-loading-background="rgb(255,255,255)"></div>
          <div v-show="loading2" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:9999;" v-loading="loading2" element-loading-background="rgb(255,255,255)"></div>
      </div>
</template>

<script>
    import navigation from '@/components/navigation.vue'
    export default {
      name: 'App',
      components:{
        navigation
      },
      computed:{
        isShow(){
          return this.$store.state.none.isShow
        },
        loading(){
          return this.$store.state.load.loading
        },
        loading2(){
          return this.$store.state.load.loading2
        },
      },
    }
</script>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      height:100%;
    }
    .bg{
      background-image:url(./assets/nomore.png);
      background-repeat: no-repeat;
      background-position: center center;
      background-size:200px;
    }
</style>
