import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/base.css'
import '@/style/components.styl'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 全局组件
import viewHead from '@components/view-head/index'
Vue.component('view-head', viewHead)
import Tab from "@components/tab/tab"
Vue.component('tab', Tab)


import $ from 'jquery/dist/jquery.min.js'



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  mounted:function () {
    var w=$(window).width();
    $('html').css('font-size',w/3.75+'px');
    $(window).on('resize',function () { 
      w=$(this).width();
      $('html').css('font-size',w/3.75+'px')
     })
  }
})
