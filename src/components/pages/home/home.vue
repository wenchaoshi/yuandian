<!-- 商机  页面 -->
<template>
  
  <div class="home">
     
      <template v-for='items in mydata'>
        <lists :imgSrc='items.imgSrc' :text="items.text" :key='items.text'></lists>
      </template>
  </div>
</template>

<script>
import $ from 'jquery/dist/jquery.min.js'
import Lists from '@pages/home/lists'
export default {
  data () {
    return {
      mydata:[
        {imgSrc:'aaaa',text:'数据一'},
        {imgSrc:'aaaa',text:'数据二'},
        {imgSrc:'aaaa',text:'数据三'}
      ]
    };
  },

  components: {
    Lists
  },

  computed: {},

  mounted: function(){
    
  },

  methods: {}
}

</script>
<style lang='stylus'>
  .home
    display flex
    align-items flex-end
    flex-wrap wrap
    flex-direction column-reverse
</style>