webpackJsonp([14],{"2ydt":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("K29g"),s=a("HPHT"),o=void 0,r={data:function(){return{idata:{detail:{}}}},components:{EmployeeLists:i.a,EmployeeSearch:s.a},computed:{},created:function(){o=this},mounted:function(){this.$store.commit("searchInit");var t=this.$route.query.id;this.request("/wxapp/director/saleperson/api"+(t?"?employee_id="+t:""),{success:function(t){o.$store.commit("setEmployeeData",t.detail),o.$set(o.idata,"detail",t)}})},methods:{}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"page"}},[a("div",{staticClass:"view"},[a("div",{staticClass:"director_employee-head"},[a("p",[t._v("“"+t._s(t.idata.detail.director_name)+"”主管下的所有员工数据")]),t._v(" "),a("div",[a("div",[a("strong",[t._v(t._s(t.idata.detail.total_forward_number))]),t._v(" "),a("p",[t._v("总转发数")])]),t._v(" "),a("div",[a("strong",[t._v(t._s(t.idata.detail.total_talk_number))]),t._v(" "),a("p",[t._v("总沟通数")])])])]),t._v(" "),a("EmployeeSearch"),t._v(" "),a("EmployeeLists")],1)])},staticRenderFns:[]};var n=a("VU/8")(r,d,!1,function(t){a("tsIW")},"data-v-3ba68700",null);e.default=n.exports},tsIW:function(t,e){}});