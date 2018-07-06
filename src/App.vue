<template>
  <div id="app">
    <div class="view">
      <router-view></router-view>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import Tab from './components/tab/tab'
export default {
  name: 'App',
  components:{
    Tab
  }
}
</script>

<style lang='stylus'>
html 
  font-family "pingFangSC-Medium","Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif
#app 
  height 100%

.view 
  width 100%
  height calc(100% - 50px)
  background #f1f1f1
  

</style>
