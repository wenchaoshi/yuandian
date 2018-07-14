<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components:{

  }
}
</script>

<style lang='stylus'>

.minirefresh-theme-default .minirefresh-upwrap 
  line-height 45px
  min-height auto 
  padding 0

.minirefresh-theme-default .status-nomore .upwrap-tips 
  padding 0

</style>
