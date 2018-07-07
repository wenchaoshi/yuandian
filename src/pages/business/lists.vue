<!--  -->
<template>
  <div class="business-lists" @click="toDetail">
    <span class="img-box el-icon-info"><img :src="imgSrc" alt=""></span>
    <p v-html='text'></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
        
    };
  },
  props:['imgSrc','text'],
  components: {},

  computed: {},

  mounted: function () {  },

  methods: {
    toDetail(){
      //console.log(this.item)
      this.$router.push({path: '/information-detail'})
    }
  }
}

</script>
<style lang='stylus'>
  .business-lists
    overflow hidden 
    .img-box 
      display inline-block
      float left
      width 0.4rem
      height auto
      margin-right 0.1rem
      background #000
    img 
      width 100%
      height auto 
    p 
      overflow hidden
      width 2.26rem
      strong 
        color #3cb98e 
        font-weight normal

</style>