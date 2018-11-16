<!-- 客户详情 -->
<template>
  <div id="page" @click="cancle">
    <div class="view customerDetail" @scroll.passive='onScroll' >
      <div class="customerDetail-scrollView">
          <div class="customerDetail-card">
            <div class="customerDetail-information" @click.stop='navigator("/customer-information")'>
              <span class="fl"><img :src="customerDetail.customer.image_url" alt=""></span>
              <h2>{{customerDetail.customer.name}}  <small class="fr">客户资料</small></h2>
              <div class="clearfix"></div>
            </div>
            <div class="customerDetail-tag">
              <span v-for='(items,index) in nowTag.nowTagList' :key='index'>{{items.name}}</span>
              <span @click.stop="setClass('tag')">+ 标签</span>
            </div>
          </div>
          <div class="customerDetail-action">
            <div class="customerDetail-action-list">
              <div>预计成交率</div>
              <div class="customerDetail-action-data"><strong>{{customerDetail.customer_deal_percent}}%</strong></div>
            </div>
            <div class="customerDetail-action-list" @click="setTalkCountState">
              <div>沟通次数({{talkCount.state?'总':'周'}})</div>
              <div class="customerDetail-action-data"><strong>{{talkCount.state?talkCount.talkCount:talkCount.total_talkcount_week}}</strong></div>
            </div>
            <div class="customerDetail-action-list" @click.stop="setClass('evolve')">
              <div>实际跟进进度</div>
              <div class="customerDetail-action-data"><strong>{{customerDetail.customer.group_type}}</strong></div>
            </div>
          </div>

          <!-- 产品查看次数统计 -->
          <div class="product-cuont">
              <ul :style="{'margin-top':productCuontMargin+'px'}">
                <li v-for="(item , index) in productCount" :key="index"><strong>{{item.customer_name}}</strong>{{item.send_tupe==2?'浏览了':'分享了'}}{{item.employee_name}}的<strong>{{item.product_name}}</strong></li>
              </ul>
          </div>


          <div class="customerDetail-tab">
            <div :class="onTop?'on-top':''">
              <div class="customerDetail-tab-nav" >
                <!-- <router-link to="/customer-detail/customer-tab1" tag="div"><span>互动跟进</span></router-link>
                <router-link to="/customer-detail/customer-tab2" tag="div"><span>客户分析</span></router-link> -->
                <div @click="customerTabBar('customerTab1')" :class="componentId=='customerTab1'?'active':''"><span>互动跟进</span></div>
                <div @click="customerTabBar('customerTab2')" :class="componentId=='customerTab2'?'active':''"><span>客户分析</span></div>
              </div>
            </div>
            <div class="customerDetail-tab-view">
              <!-- <router-view></router-view> -->
              <keep-alive exclude="customer-tab2">
                <component :is="componentId" :customerDetail="customerDetail" :scrollTop="scrollTop" :contentHeight="contentHeight"></component>
              </keep-alive>
            </div>
          </div>
      </div>
    </div>
    
    <div class="fixBot">
      <div class="fixBot-list1"><a :href="telphone" @click="telphonetest"><img src="../../images/icon_phone.png" alt="">打电话</a></div>
      <div class="fixBot-list2" @click="navigator('/information-detail',query)"><img src="../../images/icon_chat.png" alt="">发信息</div>
    </div>

<!-- 添加标签 -->
  <div class="shade tag" :class="tag?'active':''"> 
      <div class="shade-content" @click.stop="stop">
          <div class="tag-main">
            <p>添加标签</p>
            <ul>
              <li @click="active_tag_list" :class="tagList.length?{'active':nowTag.activeTagList[item.id]}:''" v-for="(item,index) in tagList" :key="index" :data-id="item.id">{{item.name}}</li>
            </ul>
          </div>
          <div class="main">
            <div class="cancle" @click.stop='cancle("keep")'>取消</div>
            <div class="save" @click="addTag">保存</div>
          </div>
      </div>
  </div>

<!-- 跟进进度 -->
  <div class="shade evolve" :class="evolve?'active':''"> 
      <div class="shade-content" @click.stop="stop">
          <ul class="" @click="setEvolve">
            <li data-value="20%" data-index='1'>20%</li>
            <li data-value="40%" data-index='2'>40%</li>
            <li data-value="60%" data-index='3'>60%</li>
            <li data-value="80%" data-index='4'>80%</li>
            <li data-value="跟单放弃" data-index='5'>跟单放弃</li>
            <li data-value="跟单成交" data-index='6'>跟单成交</li>
            <li @click.stop='cancle'>取消</li>
          </ul>
      </div>
  </div>





  </div>
</template>

<script>
import customerTab1 from "./children/customer-tab1";
import customerTab2 from "./children/customer-tab2";
var that;
export default {
  data() {
    return {
      componentId: "customerTab1",
      onTop: false,
      offsettop: 0,
      tag: false,
      tagList:[],
      nowTag:{
        nowTagList:[],
        activeTagList:{

        }
      },
      oldList:{},      
      evolve: false,
      customerId:0,
      name:'',
      customerDetail:{
        customer:{
          group_type:'',
          deal_percent:''
        }
      },
      followContent:'',
      scrollTop:0,
      contentHeight:0,
      productCount:[],
      productCuontMargin:0,
      talkCount:{
        state:true,
        talkCount:'',
        total_talkcount_week:''
      }
    };
  },

  components: {
    customerTab1,
    customerTab2
  },

  computed: {
    telphone(){
      if(!this.customerDetail.customer.phone==''){
        return 'tel:'+this.customerDetail.customer.phone
      }else{
        return 'javascript:;'
      }
      
    }
  },
  created(){
    that=this;
    this.customerId=this.$route.query.customerId;
    let employeeId=this.$route.query.employeeId||null;
    this.employeeId=employeeId;
    if(employeeId){
      this.employee_id='&employee_id='+employeeId
    }else{
      this.employee_id=''
    }

    this.name=this.$route.query.name;
    
  },
  mounted: function() {
    this.get_customerDetail();
    this.get_tag_list();
    let obj = $(".customerDetail-tab");
    this.offsettop = obj.offset().top;
    this.product_count();
    this.get_talkcount()
  },
  watch:{
    
  },
  methods: {
    onScroll(e) {
      let offsettop = that.offsettop;
      let scrollTop = e.target.scrollTop;
      let contentHeight=$('.customerDetail-scrollView').height();
      this.contentHeight=contentHeight;
      this.scrollTop=scrollTop;

      if (scrollTop > offsettop) {
        that.onTop = true;
      } else {
        that.onTop = false;
      }
    },
    customerTabBar(target) {
      this.componentId = target;
    },

    // 产品查看次数统计
    productCuontFn(count){
      //count为要循环的数据的length
      let num=0;
      setInterval(()=>{
        num++;
        if(num>=count){
          num=0;
        }
        this.productCuontMargin=-38*num
      },2200)
    },
    product_count(){
      //获取查看商品列表的接口
      that.getData('/wxapp/roll/message?customer_id='+that.customerId+that.employee_id,{
        success(res){
          that.productCount.push(...res.detail);
          that.productCuontFn(res.detail.length);
        }
      })
    },
    navigator(path) {
      if(path=='/customer-information'){
        this.$router.push({ path: path, query:{customerId:this.customerDetail.customer.id,name:this.customerDetail.customer.name,phone:this.customerDetail.customer.phone} });
      }else{
        this.$router.push({ path: path, query:{customer_id:this.customerDetail.customer.id} });
      }
    },
    //设置遮罩的class，切换状态
    setClass(target) {
      this[target] = !this[target];
      if(target=='tag'){
        for(let key in this.nowTag.activeTagList) {
          this.oldList[key]=this.nowTag.activeTagList[key]
        }
      }
    },
    stop() {},
    cancle(keep) {
      this.tag = false;
      this.evolve = false;
      if(keep=='keep'){
        //this.$set(this.nowTag,'activeTagList',this.oldList)
        for(let key in this.oldList) {
          this.nowTag.activeTagList[key]=this.oldList[key]
        }
      }
    },
    telphonetest(){
      if(this.customerDetail.customer.phone==''){
        $('.load').addClass('text').text('顾客暂未设置电话！');
        setTimeout(()=>{
          $('.load').removeClass('text')
        },500)
      }
    },
    get_customerDetail(){
      //获取顾客详情，（预计成交率和实际跟进进度）
      that.getData('/wxemployee/customer/detail?customer='+that.customerId+'&customer_id='+that.customerId+that.employee_id,{
        success(res){
          console.log(res)
          that.customerDetail=res.detail;
        },
        error(res){

        }
      })
    },
    
    get_tag_list(){
      //获取总标签（店铺标签）
      that.getData('/wxemployee/company/tag/list?customer='+this.customerId+'&customer_id='+that.customerId+that.employee_id,{
        success(res){
          that.tagList=res.detail;
          for(var i=0;i<that.tagList.length;i++){
            that.$set(that.nowTag.activeTagList, that.tagList[i].id, false);
          }
          that.get_now_tag_list();
        }
      })
    },
    get_now_tag_list(){
      //获取顾客的标签
      that.getData('/wxemployee/customer/tag/operate?customer='+this.customerId+'&customer_id='+that.customerId+that.employee_id,{
        success(res){
          that.nowTag.nowTagList=res.detail
          for(var i=0;i<res.detail.length;i++){
            that.nowTag.activeTagList[res.detail[i].shop_tag_id]=true
          }
        },
      })
    },
    active_tag_list(e){
      //选中标签
      let id=e.target.dataset.id;
      that.nowTag.activeTagList[id]=!that.nowTag.activeTagList[id]
    },
    addTag(){
      //添加标签
      let arr=[];
      let nowList=that.nowTag.activeTagList;
      for(let id in nowList){
        if(nowList[id]){
          arr.push(id);
        }
      }
      let activeTagList=arr.join('*');
      that.getData('/wxemployee/customer/tag/operate?tag=2006468&customer='+this.customerId+'&customer_id='+that.customerId+that.employee_id,{
        type:'post',
        data:{
          ids:activeTagList
        },
        success(res){
          if(res.status==0) that.get_now_tag_list();
          that.cancle()
        }
      })
    },
    setEvolve(e){
      //修改'跟进'进度
      if (e.target.nodeName.toLowerCase() === 'li') {
        let index = e.target.dataset.index;
        let theVlaue = e.target.dataset.value;
        //可获取事件委托中，响应事件的元素
        
        that.getData('/wxemployee/customer/fact/follow?customer='+that.customerId+'&customer_id='+that.customerId+that.employee_id,{
          type:'post',
          data:{
            group_id:index
          },
          success(res){
            that.customerDetail.customer.group_type=theVlaue;
            that.cancle()
          }
        })
        
      }
    },
    get_talkcount(){
      //获取沟通次数（总和周）
      that.getData('/wxapp/customer/talkcount?customer='+that.customerId+'&customer_id='+that.customerId+that.employee_id,{
        success(res){
          that.talkCount.talkCount=res.detail;
          that.talkCount.total_talkcount_week=res.total_talkcount_week
        }
      })
    },
    setTalkCountState(){
      that.talkCount.state=!that.talkCount.state
    }
  }
};
</script>
<style lang='stylus'>
.view.customerDetail
  background #fff
  overflow auto
.customerDetail-scrollView
  overflow auto
.customerDetail-card
  width 3.55rem
  padding-bottom 10px
  margin 0.1rem auto
  background url('../../images/customerDetail-card.png') no-repeat 0 / 100% 100%
  .customerDetail-information
    padding 0.2rem
    color #fff
    *
      cursor pointer
    span
      width 0.5rem
      height 0.5rem
      background #000
      img
        width 100%
        height 100%
    h2
      padding-left: 0.1rem;
      padding-right: 4.5em;
      line-height: 0.5rem;
      font-weight: bolder;
      font-size: 0.16rem;
      overflow: hidden;
      text-overflow: ellipsis; 
      white-space: nowrap; 
      position: relative;
      small
        position absolute
        right 0
        top 0
        color #bbb
        font-weight 100
        font-size 0.12rem
        &:after
          content ''
          display inline-block
          width 0.07rem
          height 0.16rem
          margin-left 0.06rem
          vertical-align sub
          background url('../../images/Triangle_3.png') 0 / 100% no-repeat
  .customerDetail-tag
    padding 0 20px
    span
      display inline-block
      margin-right 0.1rem
      margin-bottom 10px
      padding 0 0.07rem
      line-height 22px
      color #fff
      border 1px solid
      border-radius 2px
      font-size 10px
      cursor pointer

.product-cuont 
  width 90%
  height 38px
  margin 0 auto 10px
  padding 0 20px
  line-height 38px
  border-radius 19px
  background #F1F1F1
  overflow hidden
  ul 
    transition .6s
    margin-top 0
    li 
      height 38px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      strong
        vertical-align middle
        color #3cb98e
        font-weight normal

.customerDetail-action
  display flex
  padding 20px
  text-align center
  font-size 12px
  position relative
  &>div
    flex 1
    position relative
    &:after
      display block
      position absolute
      right -0.5px 
      top calc(50% - 15px)
      width 0
      height 30px
      border-left 1px solid #D8D8D8
      content ' '
    &:nth-last-of-type(1):after 
      display none
    strong
      display inline-block
      font-size 20px
      line-height 1.8em
      font-weight 400
.on-top
  height 0.5rem
  .customerDetail-tab-nav
    position fixed
    top 0
    left 0
    z-index 10
    width 100%
.customerDetail-tab-nav
  display flex
  border 1px solid #eee
  border-left none
  border-right none
  text-align center
  height 50px
  background #fff
  &>div
    flex 1
    line-height 48px
    span
      display inline-block
      position relative
.customerDetail-tab-nav .active span
  &:before
    content ''
    display inline-block
    width 70%
    height 2px
    position absolute
    left 15%
    bottom 0
    border-radius 1px
    background #000
  &:after
    content ''
    display inline-block
    width 0
    height 0
    margin-left 4px
    margin-bottom -3px
    border 6px solid transparent
    border-top-color #333
    vertical-align middle
.fixBot
  display flex
  position fixed
  bottom 0
  left 0
  z-index 10
  width 100%
  height 50px
  line-height 50px
  text-align center
  color #fff
  &>div
    flex 1
  .fixBot-list1
    background #4F4F5C
  .fixBot-list2
    background #25B181
  a 
    color inherit
  img
    width 26px
    height auto
    vertical-align middle
    margin-right 10px
// 阴影遮罩
// 添加标签
.shade
  position fixed
  left 0
  top 0
  z-index 15
  width 100%
  height 100%
  background rgba(1, 2, 13, 0.5)
  display none
  &.active
    display block
    .shade-content
      animation 'tag' 0.6s ease-out forwards
      -webkit-animation 'tag' 0.6s ease-out forwards
  .shade-content
    position absolute
    left 0
    bottom 0
    z-index 99
    width 100%
    padding 20px 20px 70px
    background #fff
    .tag-main
      ul li
        float left
        margin 10px 10px 0 0
        padding 0 10px
        line-height 30px
        background #D8D8D8
        border-radius 1px
        font-size 12px
        &.active
          color #fff
          background #333
    .main
      position absolute
      left 0
      bottom 0
      width 100%
      display flex
      line-height 50px
      text-align center
      border-top 1px solid #eee
      div
        flex 1
        &.save
          background #333
          color #fff
// 跟进进度
.shade.evolve
  .shade-content
    padding 0
    li
      text-align center
      line-height 60px
      border-bottom 1px solid #eee
      &:nth-last-of-type(1)
        line-height 50px
// 添加跟进
.shade.follow
  textarea
    width 100%
    height 100px
    border 1px solid #eeeeee
    border-radius 1px
    padding 10px
    margin-top 10px
@keyframes tag
  0%
    bottom -100%
  100%
    bottom 0%
</style>