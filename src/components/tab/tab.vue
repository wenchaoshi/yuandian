<!-- 底部tab  页面 -->
<template>
  <div id="tab">
      <router-link to='/business' tag="div" class="tab-items tab-business">
        <div>
          <i class="tab-icon"></i>
          <div>商机</div>
        </div>
      </router-link>
      <router-link to='/information' tag="div" class="tab-items tab-information">
        <div>
          <i class="tab-icon"></i>
          <div>消息</div>
        </div>
      </router-link>
      <router-link to='/customer' tag="div" class="tab-items tab-customer">
        <div>
          <i class="tab-icon"></i>
          <div>客户</div>
        </div>
      </router-link>
      <router-link to='/mine' tag="div" class="tab-items tab-mine">
        <div>
          <i class="tab-icon"></i>
          <div>我的</div>
        </div>
      </router-link>
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

  mounted:function (){},

  methods: {}
}

</script>
<style lang='stylus'>
@import '../../style/mixin.styl'
#tab 
  border-1px(#eee)
  position fixed
  z-index 99
  display flex
  left 0
  bottom 0
  width 100%
  height 50px
  text-align center
  line-height 1.1
  font-size 12px
  color #666
  background #f1f1f1
  &:after 
    top 0
  .tab-items
    flex 1 
    display flex
    align-items center
    cursor pointer
    background #fff
    &>div 
      width 100%
    &.router-link-active 
      color #333333

.tab-items .tab-icon 
  display inline-block
  width 22px
  height 22px
  background url('../../images/icon_business_nor.png') no-repeat 0/100% 100%
.tab-items.tab-information .tab-icon
  background-image  url('../../images/icon_information_nor.png')
.tab-items.tab-customer .tab-icon
  background-image url('../../images/icon_cutomer_nor.png')
.tab-items.tab-mine .tab-icon
  background-image url('../../images/bar_mine_nor.png')

.router-link-active.tab-business .tab-icon 
   background-image  url('../../images/icon_business_sel.png') !important
.router-link-active.tab-information .tab-icon 
   background-image  url('../../images/icon_information_sel.png') !important
.router-link-active.tab-customer .tab-icon 
   background-image  url('../../images/icon_cutomer_sel.png') !important
.router-link-active.tab-mine .tab-icon 
   background-image  url('../../images/bar_mine_sel.png') !important

</style>