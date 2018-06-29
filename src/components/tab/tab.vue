<!-- 底部tab  页面 -->
<template>
  <div id="tab">
      <router-link to='/home' tag="a"><span>商机</span></router-link>
      <router-link to='/message' tag="a"><span>消息</span></router-link>
      <router-link to='/customer' tag="a"><span>客户</span></router-link>
      <router-link to='/me' tag="a"><span>我的</span></router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted:function (){},

  methods: {}
}

</script>
<style lang='stylus'>
#tab 
  position fixed
  display flex
  left 0
  bottom 0
  width 100%
  height 50px
  text-align center
  line-height 50px
  a 
    flex 1
    border-right 1px solid #ccc
    &:nth-of-type(4) 
      border none
</style>