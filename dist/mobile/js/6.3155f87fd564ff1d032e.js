webpackJsonp([6],{MmXq:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("cpdJ"),o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{height:"100%"}},[i("div",{staticClass:"detail",attrs:{id:"page"}},[i("div",{staticClass:"view",attrs:{id:"MiniRefresh"}},[i("div",{staticClass:"MiniRefresh-box",style:t.product.isShow?{"padding-top":"100px"}:""},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.product.isShow,expression:"product.isShow"}],staticClass:"product-fixTop"},[i("span",[i("img",{attrs:{src:"https://show.qnssl.xuemei99.com/"+t.product.detail.product_image,alt:t.product.detail.product_title}})]),t._v(" "),i("div",[i("h3",[t._v(t._s(t.product.detail.product_title))]),t._v(" "),i("p",[i("i",[t._v("热销产品")]),i("strong",[t._v("￥"+t._s(t.product.detail.price_discount))])])])]),t._v(" "),i("ul",{attrs:{id:"scroll-view"}},t._l(t.list,function(e,n){return i("li",{key:n,attrs:{"data-id":e.id}},[e.showTime?i("div",{staticClass:"detail-date"},[i("span",[t._v(t._s(t._f("gmtDate")(e.create_time)))])]):t._e(),t._v(" "),i("div",{staticClass:"detail-lists",class:e.one_man_send?"detail-lists-type2":"detail-lists-type1"},[i("span",{staticClass:"img-box"},[e.one_man_send?t._e():i("img",{attrs:{src:e.two_image,alt:""}}),e.one_man_send?i("img",{attrs:{src:e.one_image,alt:""}}):t._e()]),t._v(" "),2==e.mssage_type&&e.content_arr?i("div",{staticClass:"detail-lists-content"},[i("h3",[t._v("来自："+t._s(e.content_arr[3]))]),t._v(" "),i("div",[i("img",{attrs:{src:e.content_arr[2],alt:e.content_arr[0]}}),t._v(" "),i("div",[i("p",[t._v("产品："+t._s(e.content_arr[0]))]),t._v(" "),i("p",[t._v("价格："+t._s(e.content_arr[1])+"元")])])])]):i("p",{staticClass:"detail-lists-content"},[t._v(t._s(e.content))])])])}))])])]),t._v(" "),i("div",{staticClass:"message-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{type:"text",placeholder:"想跟TA说点什么呢"},domProps:{value:t.content},on:{focus:function(e){t.inputFocus(e)},input:function(e){e.target.composing||(t.content=e.target.value)}}}),t._v(" "),i("input",{attrs:{type:"submit",value:"发送"},on:{click:t.sendInformation}})])])},staticRenderFns:[]};var s=function(t){i("x297")},a=i("VU/8")(n.a,o,!1,s,null,null);e.default=a.exports},cpdJ:function(t,e,i){"use strict";(function(t){var n,o=i("Gu7T"),s=i.n(o),a=i("cF7b");e.a={data:function(){return{content:"",list:[],offset:0,count:0,intoViewId:0,contentover:"释放刷新",MiniRefreshBox:0,scrollView:0,MiniRefresh:0,product:{isShow:!1,detail:{content:"",product_image:"",desc:"",price_discount:"",product_title:""}}}},components:{},computed:{},created:function(){n=this},mounted:function(){this.offset=0,this.miniRefresh(),this.getContent();var t=this.$route.query.product_id;t&&(n.product.isShow=!0,this.getData("/wxemployee/message/product/"+t+"?product_id="+t,{success:function(t){n.$set(n.product,"detail",t.detail)},error:function(t){}}))},updated:function(){this.MiniRefreshBox=t(".MiniRefresh-box").height(),this.scrollView=t("#scroll-view").height()},methods:{sendInformation:function(){""!==n.content&&this.getData("/wxemployee/talk/send/leave?two_man_id="+this.$route.query.customer_id,{type:"post",data:{content:n.content},success:function(t){console.log("发送成功"),n.content="",n.list=[],n.offset=0,n.getContent()}})},getContent:function(e,i){n.getData("/wxemployee/talk/send/leave?two_man_id="+this.$route.query.customer_id+"&limit=20&offset="+n.offset,{success:function(o){if(0==o.status){var c,r=o.detail;n.count=o.count;for(var l=0,d=r.length,u=0;u<d;u++){r[u].showTime=!1,l=u<d-1?n.moment(r[u+1].create_time).format("YYYYMMDDHHmm"):0;var p=n.moment(r[u].create_time).format("YYYYMMDDHHmm");if(r[u].new_create_time=p,p-l>5&&(r[u].showTime=!0),2==r[u].mssage_type){var m=r[u].content.split("&");r[u].content_arr=m}}(c=n.list).push.apply(c,s()(r)),n.$nextTick(function(){i?(a.a.intoView(t(i)),console.log(i)):t("#scroll-view li").length&&a.a.intoView(t("#scroll-view li:nth-of-type(1)"))}),e&&e()}}})},miniRefresh:function(){var e=new MiniRefresh({container:"#MiniRefresh",down:{callback:function(){if(n.list.length>=n.count)return e.endDownLoading(),t(".load").text("已加载全部数据").addClass("active success"),void setTimeout(function(){t(".load").removeClass("active success")},500);var i=setTimeout(function(){e.endDownLoading()},4e3);setTimeout(function(){n.offset+=20,n.getContent(function(){e.endDownLoading(),clearTimeout(i)},"#scroll-view li:nth-of-type("+n.list.length+")")},300)}},up:{isLock:!0,contentnomore:"没有更多数据了",contentdown:"上啦显示更多",contentrefresh:"加载中。。。",callback:function(){e.endUpLoading()}}})},inputFocus:function(e){window.setTimeout(function(){window.scrollTo(0,t("body").height()),t("#scroll-view li").length&&a.a.intoView(t("#scroll-view li:nth-of-type(1)")),a.a.intoView(t(".message-box"))},500)}}}}).call(e,i("7t+N"))},x297:function(t,e){}});