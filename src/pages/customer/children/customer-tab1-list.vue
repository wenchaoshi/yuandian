<!--  -->
<template>
  <div class="customer-tab1-list">
    <span class="customer-tab1-list-date">
        23/6月17:00
    </span>
    <span class="img-box">
        <img :src="imgSrc" alt="">
    </span>
    <p v-html='text'></p>
    <div class="customer-controls" :class="off?'active':''">
        <i @click.stop='change'></i>
        <span>
            <a href="">编辑</a>
            <a href="">删除</a>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        off:false
    };
  },
  props:['imgSrc','text'],
  components: {},

  computed: {},

  mounted: function () { 
      let that=this;
      window.onclick=function(){
          if(that.off){
            that.off=false
          }
      }
   },

  methods: {
    toDetail(){
      //console.log(this.item)
    },
    change(){
        this.off=true
    }
  }
}

</script>
<style lang='stylus'>
  .customer-tab1-list
    position relative
    overflow hidden 
    padding  15px .1rem
    font-size 0
    span 
      display inline-block
      font-size 14px
      vertical-align middle
    .customer-tab1-list-date 
      width .65rem
      max-width 65px
      line-height 20px
    .img-box 
      width 40px
      background #000
    img 
      width 100%
      height 40px
    p 
      display inline-block
      vertical-align top
      overflow hidden
      width 2.23rem
      margin 0 .1rem
      padding-right 15px
      font-size 14px
      line-height 20px
      strong 
        color #3cb98e 
        font-weight normal

    .customer-controls
      position absolute
      right 0.1rem
      top calc(50% - 12.5px)
      display inline-block
      width 30px
      height 25px
      line-height 25px
      i 
        position relative
        z-index 2
        display inline-block
        width 30px
        height 15px
        float right
        margin-top 5px
        background url(../../../images/icon_edit_follow.png) 0/100%
        transition .2s
      span 
        width 0
        height 25px
        position absolute
        right 0
        top 0
        background url(../../../images/btn_edit_delete.png) no-repeat 0 0/80px 25px
        opacity 0
        transition .5s
         
        a 
          display inline-block
          float left
          width 50%
          text-align center
          color #fff
          font-size 12px
      &.active 
        i 
          width 0
        span 
          width 80px
          opacity 1


@media screen and (max-width:369px)  {
  .customer-tab1-list p {
    width 2rem
  }
}


</style>