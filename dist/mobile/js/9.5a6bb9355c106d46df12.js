webpackJsonp([9],{"87G/":function(t,n){},Chf5:function(t,n){},R8W7:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=i("Dd8w"),o=i.n(e),r=i("Gu7T"),s=i.n(r),a={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"statistics-list"},[i("h3",[i("i",{class:"icon"+t.titleIcon}),t._v("\n        "+t._s(t.option.title)+"\n    ")]),t._v(" "),i("ul",{class:t.option.consultation_number?"list":""},[i("li",[i("h2",[t._v(t._s(t.option.forward_number)+"次")]),t._v(" "),i("p",[t._v("转发次数")])]),t._v(" "),i("li",[i("h2",[t._v(t._s(t.option.see_number)+"次")]),t._v(" "),i("p",[t._v("浏览量")])]),t._v(" "),void 0!==t.option.consultation_number?i("li",[i("h2",[t._v(t._s(t.option.consultation_number)+"次")]),t._v(" "),i("p",[t._v("咨询次数")])]):t._e(),t._v(" "),i("li",[i("h2",[t._v(t._s(t.option.visitor_number)+"次")]),t._v(" "),i("p",[t._v("访客量")])])])])},staticRenderFns:[]};var _={data:function(){return{statistics_menu:["今天","近7天","近30天"],statistics_menu_index:0,company_option:{},card_option:{},detail:[],active_info:{}}},components:{statisticsList:i("VU/8")({data:function(){return{}},props:["option"],components:{},computed:{titleIcon:function(){return this.option.icon||0}},mounted:function(){},methods:{}},a,!1,function(t){i("Chf5")},"data-v-18a9e5e2",null).exports},computed:{},created:function(){this},mounted:function(){this.getDetail()},methods:{setMenu:function(t){var n=t.target.dataset.index;this.statistics_menu_index=n;var i={};1==n?i.data="week":2==n&&(i.data="month"),this.getDetail(i)},getDetail:function(t){var n=this,i={},e={},r=n.$route.query.id;t=t||{},r&&(t.employee_id=r),this.request("/wxapp/employee/information/statistics/api",{data:t,success:function(t){var r;i.title="官网",i.icon=0,i.see_number=t.company_see_number,i.forward_number=t.company_forward_number,i.visitor_number=t.company_visitor_number,n.company_option=i,e.title="个人名片",e.icon=1,e.see_number=t.card_see_number,e.forward_number=t.card_forward_number,e.visitor_number=t.card_visitor_number,n.card_option=e;var a=0;t.detail.map(function(t){return t.title=t.product_title,a?(t.icon=3,a=0):(t.icon=2,a=1),t.see_number=t.product_see_number,t.forward_number=t.product_forward_number,t.visitor_number=t.product_visitor_number,t.consultation_number=t.product_consultation_number,t}),n.detail=[],(r=n.detail).push.apply(r,s()(t.detail));var _=t.active_info;for(var u in _)_[u].map(function(t){a?(t.icon=3,a=0):(t.icon=2,a=1),t.see_number=t.act_fangwen_number,t.forward_number=t.act_fenxiang_number,t.visitor_number=t.act_fangke_number,t.consultation_number=t.act_zixun_number});n.active_info=o()({},_)}})}}},u={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{attrs:{id:"page"}},[i("div",{staticClass:"view"},[i("div",{staticClass:"statistics-menu",on:{click:function(n){t.setMenu(n)}}},t._l(t.statistics_menu,function(n,e){return i("div",{key:e,class:t.statistics_menu_index==e?"active":"",attrs:{"data-index":e}},[t._v(t._s(n))])})),t._v(" "),i("statistics-list",{attrs:{option:t.company_option}}),t._v(" "),i("statistics-list",{attrs:{option:t.card_option}}),t._v(" "),t._l(t.detail,function(t,n){return[i("statistics-list",{key:n,attrs:{option:t}})]}),t._v(" "),t._l(t.active_info,function(n,e,o){return[i("div",{key:"parent"+o},[t._l(n,function(t,n){return[i("statistics-list",{key:n,attrs:{option:t}})]})],2)]})],2)])},staticRenderFns:[]};var c=i("VU/8")(_,u,!1,function(t){i("87G/")},"data-v-4307bdb5",null);n.default=c.exports}});