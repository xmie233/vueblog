<template>
  <div id="wrapper">
      <my-header></my-header>
      <!-- include里面是组件的name属性 -->
      <keep-alive include="articles">
        <router-view></router-view>
      </keep-alive>
      <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader         from './component/MyHeader'
import MyFooter         from './component/MyFooter'

export default {
    components:{
        MyHeader,
        MyFooter,
    },
}
</script>

<style scoped>
    #wrapper{
        margin: 0 auto;
    }
</style>