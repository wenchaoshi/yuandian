webpackJsonp([15],{"7+9Y":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=void 0,i={data:function(){return{idata:{detail:{},employee_id:""}}},components:{EmployeeSearch:a("HPHT").a},computed:{employeeData:function(){return this.$store.state.employeeData}},created:function(){s=this},mounted:function(){var e=this.$route.query.id;this.employee_id=e,s.$store.commit("searchInit"),this.request("/wxapp/saleperson/customer/api?employee_id="+e,{success:function(e){s.$store.commit("setEmployeeData",e.detail),s.$set(s.idata,"detail",e)}})},methods:{navigator:function(e,t){this.$router.push({path:e,query:{employeeId:this.employee_id,customerId:t}})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"page"}},[a("div",{staticClass:"view"},[a("div",{staticClass:"employee-name",style:{"background-image":"url("+e.idata.detail.employee_image+")"}},[a("h3",[e._v("“"+e._s(e.idata.detail.employee_name)+"”下的客户")])]),e._v(" "),a("employee-search",{attrs:{placeHolder:"请输入姓名进行搜索",labelStyle:{"background-color":"#fff"}}}),e._v(" "),a("div",{staticClass:"customer-list"},[a("p",[e._v("所有顾客（"+e._s(e.employeeData.length)+"）")]),e._v(" "),a("ul",{staticClass:"search-ul"},e._l(e.employeeData,function(t,s){return a("li",{key:s,on:{click:function(a){e.navigator("/customer-detail",t.id)}}},[a("span",{staticClass:"img-box"},[a("img",{attrs:{src:t.image,alt:""}})]),e._v(" "),a("span",{staticClass:"search-ul-span"},[a("h3",{domProps:{innerHTML:e._s(t.name)}}),e._v(" "),a("p",[e._v("最后活跃时间"+e._s(e._f("gmtDate")(t.last_talktime)))])]),e._v(" "),a("span",{staticClass:"fr"},[a("h3",[e._v(e._s(t.talk_number))]),e._v(" "),a("p",[e._v("沟通次数(总)")])])])}))])],1)])},staticRenderFns:[]};var l=a("VU/8")(i,o,!1,function(e){a("eQUd")},"data-v-0a9dd811",null);t.default=l.exports},eQUd:function(e,t){}});