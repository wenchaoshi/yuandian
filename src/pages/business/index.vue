<!-- 商机  页面 -->
<template>
  <div id="page">
    <div class="view">
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
import base from "@/js/base.js"

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
    Lists,
  },

  computed: {},

  mounted: function() {
    let nowView=document.getElementById('scroll-view').getElementsByTagName('div')[0]
    base.intoView(nowView);  //初始化时滚动到nowView元素（底部）
  },

  methods: {}
};


</script>
<style lang='stylus'>
.business {
  display: flex;
  // flex-wrap wrap-reverse
  flex-direction column-reverse
  .business-date {
    width 100%
    margin-top: 15px;
    margin-bottom: 5px;
    text-align: center;

    span {
      display: inline-block;
      padding: 0 10px;
      line-height: 25px;
      border-radius: 2px;
      font-size: 12px;
      color: #fff;
      background: #C1C1C1;
    }
  }

  .business-lists:not(.business-date) {
    position: relative;
    width: 3.55rem;
    margin: 0.05rem auto;
    padding: 0.1rem;
    border-radius: 3px;
    background: #fff;

    &:after {
      content: '';
      display: inline-block;
      width: 6px;
      height: 10px;
      position: absolute;
      right: 10px;
      top: calc(50% - 5px);
      background: url('../../images/Triangle_3.png') 0 / 100% 100%;
    }
  }
}
</style>