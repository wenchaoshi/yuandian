import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import '@/style/base.css'
import '@/style/components.styl'
import '@/style/mixin.styl'
import MiniRefreshTools from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css'

Vue.config.productionTip = false

// 全局组件
import global from './global.vue'
import viewHead from '@components/view-head/index'
Vue.component('view-head', viewHead)
import Tab from "@components/tab/tab"
Vue.component('tab', Tab)

Vue.prototype.global = global;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    bigData: 15113
  },
  router,
  render: h => h(App),
  mounted: function () {
    var w = $(window).width();
    $('html').css('font-size', w / 3.75 + 'px');
    $(window).on('resize', function () {
      w = $(this).width();
      $('html').css('font-size', w / 3.75 + 'px')
    })
  }
})
