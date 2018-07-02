<!--  -->
<template>
  <div class="home-lists">
      <div>
          <span class="img-box"><img :src="imgSrc" alt="" class="el-icon-info"></span>
          <p>{{text}}</p>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        
    };
  },
  props:['imgSrc','text','text1'],
  components: {},

  computed: {},

  mounted: function () {  },

  methods: {}
}

</script>
<style lang='stylus'>
.home-lists 
  width 80%
  margin 0 auto 10px
  .img-box 
    float left
    width 50px
    height 50px
    // background #000
  p 
    overflow hidden

</style>