webpackJsonp([3],{WZVN:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={render:function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"information-list",on:{click:t.toDetail}},[n("span",{staticClass:"information-img el-icon-info"},[n("img",{attrs:{src:t.item.imgSrc,alt:""}})]),t._v(" "),n("div",{staticClass:"information-action"},[n("h2",[t._v(t._s(t.item.h2))]),t._v(" "),n("p",[t._v(t._s(t.item.p))]),t._v(" "),n("span",[t._v(t._s(t.item.date))])])])},staticRenderFns:[]};var a={data:function(){return{informationLists:[{imgSrc:"aaa",h2:"张晓丽",p:"文字文字文字文字文字文字文字文字文字文字文字文字",date:"5小时前"},{imgSrc:"aaa",h2:"张",p:"文字文字文字文字文字文字文字文字文字文字文字文字",date:"5小时前"},{imgSrc:"aaa",h2:"张张",p:"文字文字文字文字文字文字文字文字文字文字文字文字",date:"5小时前"},{imgSrc:"aaa",h2:"张晓晓丽",p:"文字文字文字文字文字文字文字文字文字文字文字文字",date:"5小时前"},{imgSrc:"aaa",h2:"张晓丽张晓丽",p:"文字文字文字文字文字文字文字文字文字文字文字文字",date:"5小时前"},{imgSrc:"aaa",h2:"张晓丽",p:"文字文字文字文字文字文字文字文字文字文字文字文字",date:"5小时前"}]}},components:{informationList:n("VU/8")({data:function(){return{}},props:["item"],components:{},computed:{},mounted:function(){},methods:{toDetail:function(){this.$router.push({path:"/information-detail"})}}},e,!1,function(t){n("xgGF")},null,null).exports},computed:{},mounted:function(){this.miniRefresh(this)},methods:{miniRefresh:function(t){var i=new MiniRefresh({container:"#MiniRefresh",down:{isLock:!0,callback:function(){return i.endDownLoading(!0),!1}},up:{contentnomore:"暂无更多数据",loadFull:{isEnable:!0},isAuto:!1,callback:function(){setTimeout(function(){i.endUpLoading(!0),setTimeout(function(){i.resetUpLoading()},5e3)},3e3)}}})}}},s={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"information-index",attrs:{id:"page"}},[i("div",{staticClass:"view",attrs:{id:"MiniRefresh"}},[i("div",{staticClass:"MiniRefresh-box"},[i("div",{staticClass:"information"},[i("div",{staticClass:"information-view"},this._l(this.informationLists,function(t,n){return i("information-list",{key:n,attrs:{item:t}})}))])])]),this._v(" "),i("tab")],1)},staticRenderFns:[]};var o=n("VU/8")(a,s,!1,function(t){n("iE16")},null,null);i.default=o.exports},iE16:function(t,i){},xgGF:function(t,i){}});