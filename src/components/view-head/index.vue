<!-- head -->
<template>
  <div id="head">
      <i class="goback" @click='goback'></i>
      <span>商机</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props:['tab'],
  components: {},

  computed: {},

  mounted: function () {  },

  methods: {
    goback(){
      this.$router.go(-1)
      //console.log(this.$router);
    }
  }
}

</script>
<style lang='stylus'>
@import '../../style/mixin.styl'
  #head
    position fixed
    z-index 99
    background #fff
    top 0
    left 0
    width 100%
    height 43px
    line-height 43px
    text-align center
    font-size 16px
    border-1px(#f1f1f1)
    .goback 
      position absolute
      left 0
      top 0
      width 43px
      height 43px
      background url('../../images/Triangle_3.png') no-repeat center/10px auto
      transform rotate(180deg)
      &:active 
        background-color #f1f1f1
</style>