<!-- 客户详情 -->
<template>
  <div id="page">
    <div class="view customerDetail">
      <div class="">
          <div class="customerDetail-card">
            <div class="customerDetail-information">
              <span class="fl"><img src="" alt=""></span>
              <h2>王梅呀  <small class="fr">客户资料</small></h2>
              <div class="clearfix"></div>
            </div>
            <div class="customerDetail-tag">
              <span v-for='items in 4' :key='items'>购买力强</span>
            </div>
          </div>
          <div class="customerDetail-action">
            <div class="customerDetail-action-list">
              <div>预计成交率</div>
              <div class="customerDetail-action-data"><strong>80%</strong></div>
            </div>
            <div class="customerDetail-action-list">
              <div>实际跟进进度</div>
              <div class="customerDetail-action-data"><strong>—</strong></div>
            </div>
          </div>


          <div class="customerDetail-tab">
            <div class="customerDetail-tab-nav">
              <router-link to="/customer-detail/customer-tab1" tag="div"><span>互动跟进</span></router-link>
              <router-link to="/customer-detail/customer-tab2" tag="div"><span>客户分析</span></router-link>
            </div>
            <div class="customerDetail-tab-view">
              <router-view></router-view>
            </div>
          </div>
      </div>
    </div>
    <tab></tab>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: function () {  },

  methods: {}
}

</script>
<style lang='stylus'>
.view.customerDetail
  background #fff
.customerDetail-card 
  width 3.55rem
  height 1.3rem
  margin 0.1rem auto
  background url('../../images/customerDetail-card.png') no-repeat 0/100% 100%
  .customerDetail-information 
    padding 20px
    color #fff
    *
     cursor pointer
    span 
      width 50px
      height 50px
      background  #000
      img 
        width 100%
        height 100%
    h2 
      padding-left 10px
      line-height 50px
      font-weight bolder
      font-size 16px
      overflow hidden
      small 
        color #bbb
        font-weight 100
        font-size 12px
        &:after
          content ""
          display inline-block
          width 7px
          height 16px
          margin-left 6px
          vertical-align sub
          background url(../../images/Triangle_3.png) 0/100% no-repeat
  .customerDetail-tag
    padding 0 20px
    span 
      margin-right 10px
      padding 5px 8px
      color #fff
      border 1px solid
      border-radius 2px
      font-size 10px
      cursor pointer


.customerDetail-action 
  display flex
  padding  20px
  text-align center
  font-size 12px
  &>div 
    flex 1
    strong 
      display inline-block
      font-size 20px
      line-height 1.8em
      font-weight 400

.customerDetail-tab-nav
  display flex
  border 1px solid #eee
  border-left none
  border-right none
  text-align center
  height 0.5rem
  &>div
    flex 1
    line-height 48px
    span 
      display inline-block
      position relative
.customerDetail-tab-nav .router-link-active span 
  &:before
    content ""
    display inline-block
    width 70%
    height 2px
    position absolute
    left 15%
    bottom 0
    border-radius 1px
    background #000
  &:after 
    content ""
    display inline-block
    width 0
    height 0
    margin-left 4px
    margin-bottom -3px
    border 6px solid transparent
    border-top-color #333
    vertical-align middle

</style>