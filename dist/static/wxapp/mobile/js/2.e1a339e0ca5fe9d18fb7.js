webpackJsonp([2],{"0zOa":function(e,t){},"2mOc":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o("mpEA"),r={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"view customer-information"},[o("div",{staticClass:"customer-information-edit"},[o("ul",[o("li",[o("label",{attrs:{for:"name"}},[o("span",[e._v("真实姓名")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.customerDetail.customer.name,expression:"customerDetail.customer.name"}],attrs:{type:"text",id:"name"},domProps:{value:e.customerDetail.customer.name},on:{input:function(t){t.target.composing||e.$set(e.customerDetail.customer,"name",t.target.value)}}})])]),e._v(" "),o("li",[o("label",{attrs:{for:"tel"}},[o("span",[e._v("联系方式")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"number",id:"tel"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})])]),e._v(" "),o("li",[o("label",{attrs:{for:"wx"}},[o("span",[e._v("微信号")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.customerDetail.customer.wx_number,expression:"customerDetail.customer.wx_number"}],attrs:{type:"text",id:"wx"},domProps:{value:e.customerDetail.customer.wx_number},on:{input:function(t){t.target.composing||e.$set(e.customerDetail.customer,"wx_number",t.target.value)}}})])]),e._v(" "),o("li",[o("label",{attrs:{for:"job"}},[o("span",[e._v("从事工作")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.customerDetail.customer.position,expression:"customerDetail.customer.position"}],attrs:{type:"text",id:"job"},domProps:{value:e.customerDetail.customer.position},on:{input:function(t){t.target.composing||e.$set(e.customerDetail.customer,"position",t.target.value)}}})])]),e._v(" "),o("li",[o("label",{attrs:{for:"note"}},[o("span",[e._v("备注")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.customerDetail.customer.remarks,expression:"customerDetail.customer.remarks"}],attrs:{type:"text",id:"note"},domProps:{value:e.customerDetail.customer.remarks},on:{input:function(t){t.target.composing||e.$set(e.customerDetail.customer,"remarks",t.target.value)}}})])]),e._v(" "),o("li",[o("label",{attrs:{for:"submit"}},[o("input",{attrs:{type:"submit",value:"编辑",id:"submit"},on:{click:e.submit}})])])])])])},staticRenderFns:[]};var a=function(e){o("0zOa")},n=o("VU/8")(s.a,r,!1,a,null,null);t.default=n.exports},mpEA:function(e,t,o){"use strict";(function(e){var o;t.a={data:function(){return{customerId:0,name:"",phone:"",customerDetail:{customer:{}}}},components:{},computed:{},created:function(){o=this},mounted:function(){o.customerId=this.$route.query.customerId,o.name=this.$route.query.name,this.get_customerDetail()},watch:{phone:function(e,t){var s=o.phone.replace(/\s+/g,"");s.length>11&&(s=s.substr(0,11)),o.phone=s}},methods:{get_customerDetail:function(){o.getData("/wxemployee/customer/detail?shop=2013714&employee=2005503&customer="+o.customerId,{success:function(e){console.log(e),o.$set(o.customerDetail,"customer",e.detail.customer),o.phone=e.detail.customer.phone},error:function(e){}})},submit:function(){var t=this.customerDetail.customer;if(11!=o.phone.length&&o.phone.length>0)return e(".load").addClass("text").text("手机号码格式不正确！"),void setTimeout(function(){e(".load").removeClass("text")},500);o.getData("/wxemployee/customer/detail?shop=2013714&employee=2005503&customer="+this.customerId,{type:"POST",data:{name:t.name,phone:o.phone,wx_number:t.wx_number,position:t.position,remarks:t.remarks},successtext:"更改信息成功",success:function(){o.$router.go(-1)}})}}}}).call(t,o("7t+N"))}});