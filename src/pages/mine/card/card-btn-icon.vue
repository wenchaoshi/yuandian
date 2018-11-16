<!-- 分享名片悬浮按钮 -->
<template>
  <div class="card-btn-icon" @click="navigator">
      
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

  mounted: function () {  },

  methods: {
    navigator(){
      this.$router.push({path:'/card-box'});
    }
  }
}

</script>
<style lang='stylus' scoped>
  .card-btn-icon 
    position fixed
    z-index 99
    right 20px
    bottom 130px
    width 70px
    height 70px
    background url('../../../images/card-btn-icon.png') no-repeat 0 0/100% 100%
</style>