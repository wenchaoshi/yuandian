webpackJsonp([11],{"A/BO":function(t,e){},nRTf:function(t,e,s){"use strict";(function(t){e.a={name:"customer",data:function(){return{search:"",detail:{},normal:{detail:[]}}},components:{},computed:{},created:function(){this},mounted:function(){this.Mounted()},watch:{$route:function(){this.Mounted()}},methods:{Mounted:function(){var t=this.$route.query.phone;t&&(this.search=t,this.normal.detail=[],this.submit(t))},submit:function(e){var s=this,a=e||this.search;if(11!=a.length)return t(".load").addClass("active error").text("请输入正确的手机号"),void setTimeout(function(){t(".load").removeClass("active error")},1e3);this.request("/wxapp/customer/search/api?phone="+a,{success:function(t){s.normal.detail=t.detail}})},toDetail:function(t,e){this.$router.push({path:"/customer-detail",query:{customerId:t,name:e}})}}}}).call(e,s("7t+N"))},"oJk+":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("nRTf"),i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"page"}},[s("div",{staticClass:"view"},[s("div",{staticClass:"search"},[s("form",{attrs:{action:""},on:{submit:function(e){e.preventDefault(),t.submit()}}},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.search,expression:"search",modifiers:{trim:!0}}],attrs:{type:"number",placeholder:"输入手机号搜索"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("input",{staticStyle:{display:"none"},attrs:{type:"submit"}})])]),t._v(" "),s("div",{staticClass:"customer-box"},t._l(t.normal.detail,function(e,a){return s("div",{key:a,staticClass:"customer-list",attrs:{"data-index":a},on:{click:function(s){t.toDetail(e.id,e.name)}}},[s("div",{staticClass:"customer-img"},[s("img",{attrs:{src:""!=e.image?e.image:"https://wx.yun.xuemei99.com/static/wxapp/img/default.png",alt:e.name}})]),t._v(" "),s("div",{staticClass:"customer-action"},[s("i",{staticClass:"icon-new",class:1!=e.customer_type?"green":""},[t._v(t._s(1==e.customer_type?"新":"微"))]),t._v(" "),s("h2",[t._v(t._s(e.name))])]),t._v(" "),s("div",{staticClass:"customer-status"},[s("p",[t._v("最后活跃时间"+t._s(t._f("gmtDate")(e.last_time)))]),t._v(" "),s("strong",{class:e.status?"active":""},[t._v("已跟进")]),t._v(" "),s("strong",{class:e.status?"":"active"},[t._v("未跟进")])])])}))])])},staticRenderFns:[]};var n=function(t){s("A/BO")},r=s("VU/8")(a.a,i,!1,n,"data-v-d38af00a",null);e.default=r.exports}});