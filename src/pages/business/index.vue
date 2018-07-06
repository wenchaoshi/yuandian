<!-- 商机  页面 -->
<template>
  <div class="business">
      
      <template v-for='items in mydata'>
        <lists :imgSrc='items.imgSrc' :text="items.text" :key='items.text'></lists>
      </template>
      <div class="business-date business-lists">
        <span>4小时前</span>
      </div>
  </div>
</template>

<script>
import $ from 'jquery/dist/jquery.min.js'
import Lists from '@pages/business/lists'
export default {
  data () {
    return {
      mydata:[
        {imgSrc:'aaaa',text:`数据一<strong>数据一</strong>数据一数据一数据一数据一数据一数据一数据一数据一`},
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
  .business
    display flex
    height 100%
    flex-wrap wrap
    flex-direction column-reverse
    justify-content flex-end
    .business-date 
      margin-top 15px
      margin-bottom 5px
      text-align center
      span 
        display inline-block
        padding 0 10px
        line-height 25px
        border-radius 2px
        font-size 12px
        color #fff
        background #C1C1C1
    .business-lists:not(.business-date) 
      position relative
      width 3.55rem
      margin 0.05rem auto
      padding 0.1rem
      border-radius 3px
      background #fff
      &:after 
        content ''
        display inline-block
        width 6px
        height 10px
        position absolute
        right 10px
        top calc(50% - 8px)
        background  url('../../images/Triangle_3.png') 0/100% 100%
</style>