<template>
  <div id="app">
    <div class="container">
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
* 
  margin 0
  padding 0
html,body 
  width 100%
  height 100%
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height 100%
}

.container 
  width 100%
  height calc(100% - 50px)
  background #eee
  

</style>
