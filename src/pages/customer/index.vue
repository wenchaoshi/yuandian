<!-- 客户  页面 -->
<template>
  <div id="page">
    <div class="view">
      <ul class="follow">
        <li>
          <span class="img-box"><img src="../../images/icon_unfollow.png" alt=""></span>
          <p>未跟进客户（10）</p>
        </li>
        <li>
          <span class="img-box"><img src="../../images/icon_follow.png" alt=""></span>
          <p>已跟进客户（20）</p>
        </li>
      </ul>
      <div class="customer">
        <customer-list></customer-list>
      </div>
     
    </div>
    <tab></tab>
  </div>
</template>

<script>
import customerList from "@pages/customer/customer-list";
export default {
  data() {
    return {};
  },

  components: {
    customerList
  },

  computed: {},

  mounted: function() {},

  methods: {}
};
</script>
<style lang='stylus'>
@import '../../style/mixin.styl'
ul.follow
  li
    padding 10px
    line-height 50px
    position relative
    border-1px(#f1f1f1)
    overflow hidden
    background #fff
    &:hover
      active()
  .img-box
    float left
    margin-right 10px
    img
      width 50px
      height 50px
  p
    overflow hidden
</style>