<!-- 消息  页面 -->
<template>
  <div id="page">
    <view-head></view-head>

    <div class="view">
      <div class="information">
        <div class="information-view">
          <information-list v-for='(items,index) in informationLists' :key='index' :item='items'></information-list>
        </div>
      </div>
    </div>
    
    <tab></tab>
  </div>
</template>

<script>
import informationList from "./information-list";
export default {
  data() {
    return {
      informationLists: [
        {
          imgSrc: "aaa",
          h2: "张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          imgSrc: "aaa",
          h2: "张",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          imgSrc: "aaa",
          h2: "张张",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          imgSrc: "aaa",
          h2: "张晓晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          imgSrc: "aaa",
          h2: "张晓丽张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          imgSrc: "aaa",
          h2: "张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        }
      ]
    };
  },

  components: {
    informationList
  },

  computed: {},

  mounted: function() {},

  methods: {}
};
</script>
<style lang='stylus'>
@import '../../style/mixin.styl';

.information {
  background: #fff;

  .information-list {
    position: relative;
    padding: 20px 10px;
    overflow: hidden;
    border-1px(#EEEEEE);

    &:after {
      top: 0;
    }

    .information-img {
      float: left;
      width: 50px;
      height: 50px;
      background: #000;
    }

    .information-action {
      overflow: hidden;
      padding-left: 10px;
      color: #999;

      h2 {
        font-size: 16px;
        color: #333;
        font-weight: bold;
      }

      p {
        margin: 8px 0 16px;
      }

      span {
        font-size: 12px;
      }
    }
  }
}
</style>