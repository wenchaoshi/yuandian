<!--  -->
<template>
  <div>
      <div class="add-follow">
          <button></button>
      </div>
      <div>
          <list :imgSrc='imgSrc' :text='text'></list>
      </div>
  </div>
</template>

<script>
import list from './customer-tab1-list'
export default {
  data () {
    return {
        imgSrc:'http://www.baidu.com/img/bd_logo1.png',
        text:'哒哒哒哒哒对对对'
    };
  },

  components: {
      list
  },

  computed: {
      
  },

  mounted: function () {  },

  methods: {}
}

</script>
<style lang='stylus'>
.add-follow
  margin 20px 0
  text-align center
  button 
    width 2.05rem
    height .5rem
    background url('../../../images/btn_add_infomation.png') no-repeat 0/100%
    border none
    border-radius 2px
</style>