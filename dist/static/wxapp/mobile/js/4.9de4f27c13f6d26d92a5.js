webpackJsonp([4],{"J/FB":function(e,t){},a3Vj:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("m/Te"),n={data:function(){return{mineDetail:{}}},components:{},computed:{},mounted:function(){this.mineDetail=this.global.mineDetail},methods:{upImg:function(){new a.a.tinyImgUpload(this,"upImg",{path:"https://wx.yun.xuemei99.com/wxemployee/employee/detail?shop=2013714&employee=2005503",onSuccess:function(e){},onFailure:function(e){}}).uploadImg()},submit:function(){var e=this;e.getData("/wxemployee/employee/detail?shop=2013714&employee=2005503",{type:"POST",data:{wx_number:e.mineDetail.wx_number,desc:e.mineDetail.desc},success:function(t){e.getData("/wxemployee/employee/detail?shop=2013714&employee=2005503",{success:function(t){e.global.mineDetail=t.detail,e.mineDetail=e.global.mineDetail,console.log("获取用户信息成功"),console.log(e.global.mineDetail)},erro:function(e){console.log("获取用户信息失败")}})},error:function(e){}})}}},s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"page"}},[i("div",{staticClass:"view edit-card"},[i("div",{staticClass:"head-portrait"},[i("img",{attrs:{src:e.mineDetail.image_url,alt:"",id:"img-view"}}),e._v(" "),i("input",{staticStyle:{display:"none"},attrs:{type:"file",accept:"image/*",id:"upImg"},on:{change:e.upImg}}),e._v(" "),e._m(0)]),e._v(" "),i("div",{staticClass:"information-card"},[i("h2",[e._v(e._s(e.mineDetail.name)),i("small",{staticClass:"tel fr"},[e._v(e._s(e.mineDetail.phone))])]),e._v(" "),i("p",{staticClass:"job"},[e._v(e._s(e.mineDetail.position))]),e._v(" "),i("p",{staticClass:"site"},[e._v(e._s(e.mineDetail.address))])]),e._v(" "),i("div",{staticClass:"edit-lists"},[i("p",{staticClass:"textcenter"},[e._v("详细信息")]),e._v(" "),i("ul",[i("li",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.mineDetail.wx_number,expression:"mineDetail.wx_number"}],attrs:{type:"text",id:"wx_number",placeholder:"微信号"},domProps:{value:e.mineDetail.wx_number},on:{input:function(t){t.target.composing||e.$set(e.mineDetail,"wx_number",t.target.value)}}})]),e._v(" "),i("li",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.mineDetail.desc,expression:"mineDetail.desc"}],attrs:{type:"text",id:"desc",placeholder:"个人描述"},domProps:{value:e.mineDetail.desc},on:{input:function(t){t.target.composing||e.$set(e.mineDetail,"desc",t.target.value)}}})])])]),e._v(" "),i("div",{staticClass:"save-btn"},[i("button",{on:{click:e.submit}},[e._v("完成")])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"upImg"}},[t("span",[this._v("更换头像")])])}]};var l=i("VU/8")(n,s,!1,function(e){i("J/FB")},null,null);t.default=l.exports},"m/Te":function(e,t,i){"use strict";(function(e){t.a={tinyImgUpload:function(t,i,a){var n=this;(function(e){var i=e.files;n.files=[];for(var a,s=0;a=i[s];s++)if(a.type.match("image.*")){n.files.push(a);var l=new FileReader;l.onload=function(e){t.mineDetail.image_url=e.target.result},l.readAsDataURL(a)}console.log(n.files)})(i=document.getElementById(i)),this.uploadImg=function(){console.log(n.files);for(var t,i=new FormData,s=0;t=n.files[s];s++)i.append("files",t);e.ajax({url:a.path,type:"post",processData:!1,contentType:!1,async:!1,data:i,beforeSend:function(e){e.setRequestHeader("X-CSRFToken","MH1ocoxyws9DSGLwlj2rme3PRlbfc2JtFU8zFvYlxKAeTaHEJ5TXA7QM3nqxVUkZ")},success:function(e){a.onSuccess(e)},error:function(e){a.onFailure(e)}})}}}}).call(t,i("7t+N"))}});