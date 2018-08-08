import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import '@/style/base.css'
import '@/style/components.styl'
import '@/style/mixin.styl'
import base from '@/js/base.js'
import global from '@/components/global.js'
import moment from 'moment'
import FastClick from 'fastclick'


if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}

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

Vue.prototype.global = global.global;  //全局的公用数据
Vue.prototype.base = base;
Vue.prototype.getData = base.getData; //全局定义的公用方法
Vue.prototype.moment = moment; //全局定义的公用方法

//转换时间的全局过滤器
Vue.filter("gmtDate",function(value,type){
  if (!value) return '';
  type = type || 'YYYY-MM-DD HH:mm';

  let nowDate=Number(moment().format('YYYYMMDD'));
  let valueDate=Number(moment(value).format('YYYYMMDD'));
  if(nowDate>valueDate){
    //不是今天，至少是昨天之前
    //return moment(value).format(type)
  }else if(nowDate==valueDate){
    //是今天
    type='HH:mm'
  }else if(nowDate-valueDate==1){
    //是昨天
    type='昨天 HH:mm'
  }
  return moment(value).format(type)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
  },
  router,
  render: h => h(App),
  created(){
  },
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
