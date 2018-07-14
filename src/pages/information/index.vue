<!-- 消息  页面 -->
<template>
  <div id="page" class="information-index">
    <div class="view" id="MiniRefresh">
      <div class="MiniRefresh-box">
        <div class="information">
          <div class="information-view">
            <information-list v-for='(items,index) in informationLists' :key='index' :item='items'></information-list>
          </div>
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

  mounted: function() {
    this.miniRefresh(this);
  },

  methods: {
    miniRefresh(that) {
      //下拉刷新
      var miniRefresh = new MiniRefresh({
        container: "#MiniRefresh",
        down: {
          isLock: true,
          callback: function() {
            // 下拉事件

            miniRefresh.endDownLoading(true);
            return false;
          }
        },
        up: {
          contentnomore: "暂无更多数据",
          loadFull: {
            isEnable: true
          },
          isAuto: false,
          callback: function() {
            // 上拉事件
            // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
            // setTimeout(function(){
            //   miniRefresh.endUpLoading(false);
            // },300)

            //minirefresh.resetUpLoading();

            setTimeout(() => {
              miniRefresh.endUpLoading(true);
              setTimeout(function() {
                miniRefresh.resetUpLoading();
              }, 5000);
            }, 3000);
          }
        }
      });
    }
  }
};
</script>
<style lang='stylus'>
@import '../../style/mixin.styl'
.information
  background #fff
.information-index .minirefresh-theme-default .minirefresh-upwrap
  display block
</style>