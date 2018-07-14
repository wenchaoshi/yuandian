<!-- 商机  页面 -->
<template>
  <div id="page">
    <div class="view" id="MiniRefresh">
      <div class="business" id="scroll-view">
        <template v-for='(items,index) in mydata'>
          <lists :imgSrc='items.imgSrc' :text="items.text" :key='index'></lists>
        </template>
        <div class="business-date business-lists">
          <span>4小时前</span>
        </div>
        
      </div>
    </div>

    <tab></tab>
  </div>
</template>

<script>
import Lists from "@pages/business/lists";
import base from "@/js/base.js";

export default {
  data() {
    return {
      mydata: [
        {
          imgSrc: "aaaa",
          text: `数据一<strong>数据一</strong>数据一数据一数据一数据一数据一数据一数据一数据一`
        },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据二" },
        { imgSrc: "aaaa", text: "数据三" }
      ]
    };
  },

  components: {
    Lists
  },

  computed: {},

  mounted: function() {
    let nowView = document
      .getElementById("scroll-view")
      .getElementsByTagName("div")[0];
    base.intoView(nowView); //初始化时滚动到nowView元素（底部）

    this.miniRefresh(this);
  },

  methods: {
    miniRefresh(that) {
      //下拉刷新
      var miniRefresh = new MiniRefresh({
        container: "#MiniRefresh",
        down: {
          callback: function() {
            // 下拉事件
            miniRefresh.endDownLoading();
          }
        },
        up: {
          isLock: true,
          contentnomore: "",
          callback: function() {
            // 上拉事件
            // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
            miniRefresh.endUpLoading(true);
          }
        }
      });
    }
  }
};
</script>
<style lang='stylus'>
.business
  display flex
  // flex-wrap wrap-reverse
  flex-direction column-reverse
  background inherit
  .business-date
    width 100%
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
      top calc(50% - 5px)
      background url('../../images/Triangle_3.png') 0 / 100% 100%
    &:hover
      active()
.minirefresh-theme-default .minirefresh-upwrap
  display none
</style>