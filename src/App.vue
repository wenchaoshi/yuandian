<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components:{

  },
  created(){
    let that=this;
    (()=>{
      this.getData('/wxemployee/employee/detail?shop=2013714&employee=2005503',{
        success(res){
          that.global.mineDetail=res.detail;
          console.log('获取用户信息成功')
          console.log(that.global.mineDetail)
        },
        error(res){
          console.log('获取用户信息失败')
        }
      })
    })()
  },
  mounted:function(){
    
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
