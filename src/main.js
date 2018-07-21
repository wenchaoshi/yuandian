import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import '@/style/base.css'
import '@/style/components.styl'
import '@/style/mixin.styl'
import getData from '@/js/getData.js'
import global from '@/components/global.js'



//MiniRefreshTools下拉刷新组件
import MiniRefreshTools from 'minirefresh'
import 'minirefresh/dist/debug/minirefresh.css'

Vue.config.productionTip = false
Vue.config.devtools = true;


// 全局组件
// import viewHead from '@components/view-head/index'
// Vue.component('view-head', viewHead)
import Tab from "@components/tab/tab"
Vue.component('tab', Tab)

Vue.prototype.global = global.global;
Vue.prototype.getData = getData.getData;

/* eslint-disable no-new */
var Vm=new Vue({
  el: '#app',
  data: {
  },
  router,
  render: h => h(App),
  mounted: function () {
    this.onresize();  //  给html标签加上resize函数， 改变页面大小时改变文字
  },
  methods:{
    onresize(){
      var w = $(window).width();
      $('html').css('font-size', w / 3.75 + 'px');
      $(window).on('resize', function () {
        w = $(this).width();
        $('html').css('font-size', w / 3.75 + 'px')
      })
    }
  }
})
