webpackJsonp([6],{"5eIS":function(e,t){},E8O2:function(e,t){},a3Vj:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:function(){return{mineDetail:{}}},components:{},computed:{},watch:{$route:function(){this.$refs.scroll.refresh()}},mounted:function(){this.global.mineDetail?this.mineDetail=this.global.mineDetail:this.getUser()},methods:{getUser:function(){var e=this;e.request("/wxemployee/employee/detail",{successtext:"加载成功",success:function(t){e.global.mineDetail=t.detail,e.mineDetail=e.global.mineDetail,e.$refs.scroll.finishPullDown(),console.log("获取用户信息成功"),console.log(e.global.mineDetail)},erro:function(e){console.log("获取用户信息失败")}})},submit:function(){var e=this;e.request("/wxemployee/employee/detail",{type:"POST",data:{image:e.mineDetail.image_url,wx_number:e.mineDetail.wx_number,desc:e.mineDetail.desc},successtext:"更新信息成功",success:function(t){e.$router.go(-1)},error:function(e){}})},upImg:function(e){var t=this;this.base.uploadImg(e,function(e){console.log(e),t.mineDetail.image_url=e.path})}}},s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"page"}},[i("scroll",{ref:"scroll",staticClass:"view edit-card",attrs:{isAll:!1,options:{pullUpLoad:!1,pullDownRefresh:!1}}},[i("div",[i("div",{staticClass:"head-portrait"},[i("a",{attrs:{href:e.mineDetail.image_url,download:e.mineDetail.name}},[i("img",{attrs:{src:e.mineDetail.image_url,alt:"",id:"img-view"}})]),e._v(" "),i("input",{staticStyle:{display:"none"},attrs:{type:"file",accept:"image/*",id:"upImg"},on:{change:function(t){e.upImg(t)}}}),e._v(" "),i("label",{attrs:{for:"upImg"}},[i("span",[e._v("更换头像")])])]),e._v(" "),i("div",{staticClass:"information-card"},[i("h2",[e._v(e._s(e.mineDetail.name)),i("small",{staticClass:"tel fr"},[e._v(e._s(e.mineDetail.phone))])]),e._v(" "),i("p",{staticClass:"job"},[e._v(e._s(e.mineDetail.position))]),e._v(" "),i("p",{staticClass:"shop-name"},[e._v(e._s(e.mineDetail.shop_name))])]),e._v(" "),i("div",{staticClass:"edit-lists"},[i("p",{staticClass:"textcenter"},[i("span",[e._v("详细信息")])]),e._v(" "),i("ul",[i("li",{staticClass:"clearfix"},[i("span",[e._v("微信号")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.mineDetail.wx_number,expression:"mineDetail.wx_number"}],attrs:{type:"text",id:"wx_number",placeholder:"请输入微信号"},domProps:{value:e.mineDetail.wx_number},on:{input:function(t){t.target.composing||e.$set(e.mineDetail,"wx_number",t.target.value)}}})]),e._v(" "),i("li",{staticClass:"clearfix"},[i("span",[e._v("个人描述")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.mineDetail.desc,expression:"mineDetail.desc"}],attrs:{type:"text",id:"desc",placeholder:"请输入个人描述"},domProps:{value:e.mineDetail.desc},on:{input:function(t){t.target.composing||e.$set(e.mineDetail,"desc",t.target.value)}}})])])])])]),e._v(" "),i("div",{staticClass:"save-btn"},[i("button",{on:{click:e.submit}},[e._v("完成")])])],1)},staticRenderFns:[]};var n=i("VU/8")(a,s,!1,function(e){i("5eIS"),i("E8O2")},"data-v-8d107066",null);t.default=n.exports}});