webpackJsonp([2],{X0Im:function(e,t){},f9WD:function(e,t){},vqhB:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("K29g"),a=s("HPHT"),n=void 0,o={data:function(){return{}},components:{EmployeeLists:i.a,EmployeeSearch:a.a},computed:{},created:function(){n=this},mounted:function(){var e="";e=1==this.$route.query.permission?"/wxapp/director/saleperson/api":"/wxapp/employee/api",this.$store.commit("searchInit"),this.getData(e,{success:function(e){n.$store.commit("setEmployeeData",e.detail)}})},methods:{},watch:{}},r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"page"}},[t("div",{staticClass:"view"},[t("employee-search"),this._v(" "),t("employee-lists")],1)])},staticRenderFns:[]};var c=s("VU/8")(o,r,!1,function(e){s("f9WD"),s("X0Im")},"data-v-87328be4",null);t.default=c.exports}});