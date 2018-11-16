<!--  -->
<template>
  <div class="statistics-list">
      <h3>
          <i :class="'icon'+titleIcon"></i>
          {{option.title}}
      </h3>
      <ul :class="option.consultation_number?'list':''">
          <li>
              <h2>{{option.forward_number}}次</h2>
              <p>转发次数</p>
          </li>
          <li>
              <h2>{{option.see_number}}次</h2>
              <p>浏览量</p>
          </li>
          <li v-if="option.consultation_number">
              <h2>{{option.consultation_number}}次</h2>
              <p>咨询次数</p>
          </li>
          <li>
              <h2>{{option.visitor_number}}次</h2>
              <p>访客量</p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
        
    };
  },

  props:['option'],

  components: {},

  computed: {
      titleIcon(){
          return this.option.icon||0;
      }
  },

  mounted(){ 
      
   },
    
  methods: {}
}

</script>
<style lang='stylus' scoped>
.statistics-list
    padding 10px 15px
    h3
        padding-left 30px
        line-height 43px
        color RGBA(13, 13, 13, .5)
        background rgba(153,153,153,.2)
        border-radius 8px  8px  0px  0px  
        i
            display inline-block
            width 25px
            height 25px
            margin-right 10px
            vertical-align middle
            background no-repeat 0 0/100% 100%
            &.icon0 
                background-image url('../../../images/statistics-icon0.png')
            &.icon1 
                background-image url('../../../images/statistics-icon1.png')
            &.icon2 
                background-image url('../../../images/statistics-icon2.png')
            &.icon3 
                background-image url('../../../images/statistics-icon3.png')
    ul 
        display flex
        height 110px
        align-items center
        text-align center
        background rgba(255,255,255,1)
        box-shadow 0px 1px 10px 0px rgba(199,199,199,0.25)
        border-radius 10px
        li
            width 33.3333%
            &.list
                width 25%
            h2 
                margin-bottom 15px
                font-size 20px
                color #C69C59
            p 
                font-size 12px
                color #999
</style>