<!-- 商机  页面 -->
<template>
  <div class="home">
      商机
      <lists :imgSrc='imgSrc' :text="text"></lists>
  </div>
</template>

<script>
import $ from 'jquery/dist/jquery.min.js'
import Lists from '@pages/home/lists'
export default {
  data () {
    return {
      imgSrc:'aaaa',
      text:'数据数据数据数据数据数据'
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
<style >

</style>