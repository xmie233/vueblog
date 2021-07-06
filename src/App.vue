<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState}   from 'vuex'

  export default {
    name: 'App',
    mounted(){
      document.addEventListener('visibilitychange',this.changeTitle,false)
    },
    methods:{
      changeTitle(){
        if(document.hidden){
          document.title="去吧，皮卡丘！"
        }else{
          document.title="欢迎回来"
        }
      }
    }
  }
</script>

<style scoped>
  #app {
    min-height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>