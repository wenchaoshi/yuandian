<!-- 我的   页面 -->
<template>
<div id="page">
  <div class="view">
    <div class="mine-card">
      <div class="card-center">
        <span class="img-box fl"><img src="" alt=""></span>
        <div>
          <h2>张高丽<small class="fr">美容师</small></h2>
          <p>上海市上海市上海市上海市</p>
        </div>
      </div>
      <div class="card-main">
        <div class="edit" @click="navigator"><span>编辑名片</span></div>
        <div class="share" @click.stop='shade("share")'><span>分享名片</span></div>
      </div>
    </div>
    <div class="mine-products">
      <ul class="clearfix">
        <li data-id='1' @click.stop='shade("productEdit",$event)'>
          <div>
            <span class="img-box"><img src="" alt=""><i></i></span>
            <h3>花蕊极致驻颜美肤王牌项目体验套餐</h3>
            <i>主打产品</i>
          </div>
        </li>
       <li data-id='2' @click.stop='shade("productEdit",$event)'>
          <div>
            <span class="img-box"><img src="" alt=""><i></i></span>
            <h3>花蕊极致驻颜美肤王牌项目体验套餐</h3>
            <i>主打产品</i>
          </div>
        </li>
      </ul>
    </div>
  </div>


<!-- 添加标签 -->
  <div class="mine-shade" :class="share?'active':''" > 
      <div class="shade-content">
          <p>长按保存图片</p>
          <div class="share-box">
            <h2>张高丽</h2>
            <p>上海一体丽莎</p>
            <div class="img-box"><img src="#" alt=""></div>
            <p><small>长按识别查看名片</small></p>
          </div>
          <i @click.stop="hideShade"></i>
      </div>
  </div>


  <div class="mine-shade product-edit" :class="productEdit?'active':''" > 
      <div class="shade-content">
          <ul>
            <li>上架</li>
            <li @click.stop="hideShade">取消</li>
          </ul>
      </div>
  </div>




  <tab></tab>
</div>
</template>

<script>
export default {
  data() {
    return {
      share:false,
      productEdit:false
    };
  },
  props: [],
  components: {
    
  },

  computed: {

  },

  mounted: function() {},

  methods: {
    shade(target,event){
      this[target]=true
      if(target=='productEdit'){
        let targetId=event.currentTarget.dataset.id
        alert('产品'+targetId)
      }
    },
    hideShade(){
      this.share=false
      this.productEdit=false
    },
    navigator(){
      this.$router.push({path:'/edit-card'})
    }
  }
};
</script>
<style lang='stylus'>
.mine-card 
  margin 10px
  background #fff
  .card-center
    padding 20px
    .img-box
      width 50px
      height 50px
      margin-right 10px
      background #000
      img 
        width 100%
        height 100%
    div 
      overflow hidden
      line-height 1
      h2
        margin-bottom 15px
        font-size 20px
        small 
          font-size 14px
      p 
        color #999 
  .card-main 
    display flex
    line-height 45px
    text-align center
    border-top 1px solid #eee
    div
      flex 1
      span 
        vertical-align middle
      &:before 
        content ""
        display inline-block
        width 16px 
        height 16px
        margin-right 10px
        vertical-align middle
        background url(../../images/icon_card_share.png) 0/100% 100%
      &:nth-of-type(1) 
        border-right 1px solid #e7e7e7
        &:before
          background url(../../images/icon_card_edit.png) 0/100% 100%

.mine-products 
  background #fff
  ul li 
    float left
    width 50%
    padding 10px
    text-align center
    &:nth-of-type(2n+1)
      padding-right 0
    div
      border 1px solid #eee
      .img-box
        display block
        width 100%
        position relative
        img 
          width 100%
        i 
          position absolute
          width 53px
          height 53px
          left calc(50% - 27px)
          top calc(50% - 27px)
          margin 0
          background-image url(../../images/icon_down.png)
      h3 
        padding 10px
        text-align left
        line-height 18px
      i 
        display inline-block
        margin 5px 0 10px
        padding 1px 3px
        font-size 10px
        background url(../../images/img_product_label.png) 0/100% 100%
        color #fff
        font-style normal


//添加标签
.mine-shade
  position fixed
  left 0
  top 0
  z-index 100
  width 100%
  height 100%
  padding 17.5% 10.7% 7.9%
  color #fff
  background rgba(1,2,13,0.5)
  display none
  .shade-content
    text-align center
    width 100%
    height 100%
    .share-box 
      height 380px
      margin-top 10px
      color #333
      background #ffffff
      h2
        padding 30px 0
        font-size 20px
        font-weight bolder
      div.img-box 
        margin 30px auto 0
        width 188px
        img 
          width 100%
          height 180px  
          max-height 180px
      p 
        color #999
        small 
          display inline-block
          margin 20px 0
          font-size 12px

    i 
      display inline-block
      width 55px
      height 55px
      margin-top 47px
      background url(../../images/btn_delete.png) 0/100% 100%
      

.mine-shade.product-edit  
  padding 0
  .shade-content
    position absolute
    left 0
    bottom 0
    width 100%
    height 110px
    color #333
    background #fff
    li 
      line-height  59px
      border-top 1px solid #eee
      &:nth-last-of-type(1)
        line-height  49px

.mine-shade.active
  display block
.product-edit.active .shade-content
  animation 'toBot' .3s forwards ease-out


@keyframes toBot {
  0% {
    bottom -100%
  }
  100% {
    bottom 0%
  }
}



</style>