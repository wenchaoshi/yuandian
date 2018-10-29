<template>
  <div id="app">
    <!-- keep-alive  缓存组件。需要在单文件组件中定义name -->
    <keep-alive :include="['business','customer','information','mine']">
      <router-view></router-view>
    </keep-alive>
    <div class="load">正在加载...</div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {},
  mounted: function() {
    this.wxConfig();
  },
  methods: {
    wxConfig() {
      var config;
      var url = location.href;
      $.ajax({
        url: "https://wx.yun.xuemei99.com/wxapp/share/config?url=" + url,
        success: function(res) {
          config = res.detail;
          wxfn();
        }
      });
      function wxfn() {
        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: config.appId, // 必填，企业微信的corpID
          timestamp: config.timestamp, // 必填，生成签名的时间戳
          nonceStr: config.nonceStr, // 必填，生成签名的随机串
          signature: config.signature, // 必填，签名，见附录1
          jsApiList: [
            "onMenuShareAppMessage",
            "hideOptionMenu",
            "hideMenuItems",
            "showMenuItems",
            "hideAllNonBaseMenuItem",
            "previewImage",
            "previewFile",
            'invoke',
            'onMenuShareWechat',
            'uploadImage',
            'downloadImage'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function() {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          wx.hideMenuItems({
            menuList: [
              "menuItem:setFont",
              "menuItem:refresh",
              "menuItem:setFont",
              "menuItem:favorite",
              "menuItem:share:email",
              "menuItem:share:appMessage"
            ] // 要隐藏的菜单项，所有menu项见附录3
          });
          wx.hideOptionMenu();
          wx.hideAllNonBaseMenuItem();
          // wx.onMenuShareAppMessage({
          //     title: '', // 分享标题
          //     desc: '', // 分享描述
          //     link: 'www.baidu.com', // 分享链接
          //     imgUrl: 'https://rescdn.qqmail.com/node/wwopen/wwopenmng/style/images/wwopen_apiImages$264704c4.png', // 分享图标
          //     success: function () {
          //         // 用户确认分享后执行的回调函数
          //         window.alert('分享成功')
          //     },
          //     cancel: function () {
          //         // 用户取消分享后执行的回调函数
          //     }
          // });
          
        });
        wx.error(function(res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          $.ajax({
            url: "https://wx.yun.xuemei99.com/wxapp/share/config",
            type: "post",
            data: {
              erro: res,
              config: config
            },
            success: function(res) {
              config = res.detail;
            }
          });
        });
      }
    }
  }
};
</script>

<style lang='stylus'>
.minirefresh-theme-default .minirefresh-upwrap
  line-height 45px
  min-height auto
  padding 0
.minirefresh-theme-default .status-nomore .upwrap-tips
  padding 0
#scroll-view
  position relative
  padding-bottom 30px
.minirefresh-upwrap
  position absolute
  left 0
  bottom 0
  width 100%
  min-height initial !important
  padding 0 !important
  line-height 30px !important
  font-size 12px
  z-index 15
  p
    padding 0 !important
</style>
