<!--  -->
<template>
  <div class="customer-tab1-list">
    <span class="customer-tab1-list-date">
        {{createTime | gmtDate('DD/MM月 HH:mm')}}
    </span>
    <span class="img-box">
        <img :src="imgSrc" alt="">
    </span>
    <p v-html='text'></p>
    <div class="customer-controls" v-if="canEdit" :class="controlOff==index?'active':''">
        <i @click.stop='$emit("controlClick",index)'></i>
        <span>
            <a href="javascript:;" @click.stop='$emit("edit")'>编辑</a>
            <a href="javascript:;" @click='$emit("delete",index)'>删除</a>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      off: false
    };
  },
  props: ["createTime","imgSrc", "text", "index", "controlOff","canEdit"],
  components: {},

  computed: {},

  mounted: function() {
    // let that=this;
    // $('#page').on('click',function(){
    //   if(that.off){
    //     that.off=false
    //   }
    // })
  },

  methods: {}
};
</script>
<style lang='stylus'>
.customer-tab1-list
  position relative
  overflow hidden
  padding 15px 0.1rem
  height 70px
  font-size 0
  &>*
    height 100%
    overflow hidden
  span 
    display inline-block
    font-size 14px
    vertical-align middle
    word-break break-all
  .customer-tab1-list-date
    width 0.65rem
    max-width 65px
    padding-right 10px
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
    margin 0 0.1rem
    padding-right 15px
    font-size 14px
    line-height 20px
    strong
      color #3cb98e
      font-weight normal
    b 
      display none
  .customer-controls
    position absolute
    right .1rem
    top calc(50% - 12.5px)
    display inline-block
    width 30px
    height 25px
    line-height 25px
    overflow visible
    i
      position relative
      z-index 2
      display inline-block
      width 30px
      height 15px
      float right
      margin-top 5px
      background url('../../../images/icon_edit_follow.png') 0 / 100%
      transition 0.2s
    span
      width 0
      height 25px
      position absolute
      right 0
      top 0
      background url('../../../images/btn_edit_delete.png') no-repeat 0 0 / 80px 25px
      opacity 0
      transition 0.5s
      overflow hidden
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
@media screen and (max-width: 369px)
  .customer-tab1-list p
    width 2rem
</style>