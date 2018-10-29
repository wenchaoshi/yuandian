<!-- 客户  页面 -->
<template>
  <div id="page">
    <div class="view" id="MiniRefresh">
      <ul class="follow">
        <li :class="{'active':head1}">
          <div class="head" @click="setHead(1)">
            <span class="img-box"><img src="../../images/icon_unfollow.png" alt=""></span>
            <p>潜在客户（{{ potential.total_number }}）</p>
          </div>
          <div class="content">
            <div class="customer-list" @click="toDetail(item.id,item.name)" v-for="(item,index) in potential.detail" :key="index">
              <div class="customer-img"><img :src="item.image!=''?item.image:'https://wx.yun.xuemei99.com/static/wxapp/img/default.png'" :alt="item.name"></div>
              <div class="customer-action">
                  <i class="icon-new">新</i>
                  <h2>{{item.name}}</h2>
              </div>
              <div class="customer-status">
                  <p>最后活跃时间{{item.last_time | gmtDate}}</p>
                  <strong :class="item.status?'active':''">已跟进</strong>
                  <strong :class="!item.status?'active':''">未跟进</strong>
              </div>
            </div>
          </div>
          <div class="more" @click="getMore('potential')"><span>{{potentialPage>=potential.page_number?'没有更多了':'+点击加载更多'}}</span></div>
        </li>
        <li :class="{'active':head2}">
          <div class="head" @click="setHead(2)">
            <span class="img-box"><img src="../../images/icon_follow.png" alt=""></span>
            <p>客户（{{ normal.total_number }}）</p>
          </div>
          <div class="content">
            <div class="customer-list" @click="toDetail(item.id,item.name)" v-for="(item,index) in normal.detail" :key="index">
              <div class="customer-img"><img :src="item.image!=''?item.image:'https://wx.yun.xuemei99.com/static/wxapp/img/default.png'" :alt="item.name"></div>
              <div class="customer-action">
                  <i class="icon-new">新</i>
                  <h2>{{item.name}}</h2>
              </div>
              <div class="customer-status">
                  <p>最后活跃时间{{item.last_time | gmtDate}}</p>
                  <strong :class="item.status?'active':''">已跟进</strong>
                  <strong :class="!item.status?'active':''">未跟进</strong>
              </div>
            </div>
          </div>
          <div class="more" @click="getMore('normal')"><span>{{normalPage>=normal.page_number?'没有更多了':'+点击加载更多'}}</span></div>
        </li>
      </ul>

       <!-- <div class="customer-date"><span>2018.12.5</span></div> -->
      <!-- <div class="customer MiniRefresh-box">
        <div class="customer-box minirefresh-scroll" id="scroll-view" >
         
          <div class="customer-list" @click="toDetail(item.id,item.name)" v-for="(item,index) in list" :key="index">
              <span class="customer-img"><img :src="item.image_url" :alt="item.name"></span>
              <span class="customer-status">
                  <strong :class="item.gen_jin_status?'active':''">已跟进</strong>
                  <strong :class="!item.gen_jin_status?'active':''">未跟进</strong>
              </span>
              <div class="customer-action">
                  <h2>{{item.name}}</h2>
                  <p>最后活跃时间{{item.last_active_time | gmtDate}}</p>
              </div>
          </div>
        </div>
      </div> -->

      <div class="add-btn" @click="navigator('/customer-add')">
        <span>新加客户</span>
      </div>
     
    </div>
    <tab></tab>
  </div>
</template>

<script>
var that;
export default {
  name:'customer',
  data() {
    return {
      list:[
        {
          id:'1212212',
          name:'name名字',
          image_url:'https://wx.yun.xuemei99.com/static/wxapp/img/default.png',
          gen_jin_status:true,
          last_active_time:Date.now()
        },
        {
          id:'1212212',
          name:'name名字',
          image_url:'https://wx.yun.xuemei99.com/static/wxapp/img/default.png',
          gen_jin_status:false,
          last_active_time:Date.now()
        },
      ],
      potential:{
        detail:[]
      },
      normal:{
        detail:[]
      },
      potentialPage:1,
      normalPage:1,
      count:0,
      offset:0,
      head1:false,
      head2:false
    };
  },

  components: {

  },

  computed: {},

  created(){
    that=this;
    
  },
  mounted: function() {
    // this.getList();
    // this.miniRefresh()
    this.getPotential()
    this.getNormal()
  },

  methods: {
    setHead(tag){
      if(tag==1){
        this.head1=!this.head1
      }else{
        this.head2=!this.head2
      }
    },
    navigator(target){
      this.$router.push({path:target})
    },
    toDetail(id,name) {
      this.$router.push({ path: "/customer-detail",query:{customerId:id,name:name}});
    },
    getPotential(){
      that.getData('/wxapp/potential/customer/api?page='+that.potentialPage,{
        success(res){
          if(that.potential.detail.length){
            that.potential.detail.push(...res.detail)
            return 
          }
          that.potential=res;
        },
        error(){

        }
      })
    },
    getNormal(){
      that.getData('/wxapp/normal/customer/api?page='+that.normalPage,{
        success(res){
          if(that.normal.detail.length){
            that.normal.detail.push(...res.detail)
            return 
          }
          that.normal=res;
        },
        error(){

        }
      })
    },

    getMore(tag){
      if(tag=='potential'&&that.potentialPage<that.potential.page_number){
        that.potentialPage+=1;
        this.getPotential()
      }else if (tag=='normal'&&that.normalPage<that.normal.page_number){
        that.normalPage+=1;
        this.getNormal()
      }
    },

    getList(successCallback){
      let that=this;
      that.getData('/wxemployee/customer/own/list?shop=2013714&employee=2005503',{
        success(res){
          that.count=res.count
          that.list.push(...res.results);
         // that.list=res.detail.list
         if(successCallback) successCallback()
        },
        error(){

        }
      })
    },
    miniRefresh(){
      return
      var miniRefresh = new MiniRefresh({
        container: "#MiniRefresh",
        down: {
          callback: function() {
            // 下拉事件刷新
            let timer=setTimeout(()=>{
              miniRefresh.endDownLoading();
            },4000)

            setTimeout(() => {
              that.list=[];
              that.offset=0;
              that.getList(
                function(){
                  miniRefresh.endDownLoading(true);
                  clearTimeout(timer)  
                }
              )
            }, 300);
            return false;
          }
        },
        up: {
          contentnomore: "没有更多数据了",
          contentdown:'上啦显示更多',
          contentrefresh:'加载中...',
          loadFull: {
            isEnable: true
          },
          isAuto: false,
          callback: function() {
            // 上拉事件加载更多
            // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
            // setTimeout(function(){
            //   miniRefresh.endUpLoading(false);
            // },300)

            //minirefresh.resetUpLoading();
            
            if(that.list.length>=that.count){
              miniRefresh.endUpLoading(true);
              return
            }
            that.offset+=20;
            that.getList(()=>{
              miniRefresh.endUpLoading(false);
            })
          }
        }
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../style/mixin.styl'

.more 
  line-height 36px
  text-align center
  position relative
  overflow hidden
  span 
    padding 3px 15px
    color #666
    border-radius 3px
.view 
  position relative
ul.follow 
  position absolute
  left 0
  top 0
  width 100%
  height 100%
  -webkit-overflow-scrolling touch
ul.follow>li
  margin-bottom 6px
  height 70px
  overflow hidden
  &.active 
    height auto
  .head
    margin-bottom 2px
    padding 10px
    line-height 50px
    position relative
    overflow hidden
    background #fff
    &:after 
      content ""
      display inline-block
      width 16px
      height 16px
      position absolute
      right 21px
      top calc(50% - 8px)
      border 2px solid #ADADAD
      border-right-color transparent
      border-top-color transparent
      transition .2s
      transform rotate(-135deg)
  &.active .head:after
      transform rotate(-45deg)
    .img-box
      float left
      margin-right 10px
      img
        width 50px
        height 50px
    p
      overflow hidden

//顾客列表的样式
.customer-date
  margin-top 10px
  padding 10px
  color #333
.customer-list
  position relative
  margin 0 2px
  padding 10px 12px 10px 3px
  display flex
  justify-content center
  align-items center
  line-height initial
  overflow hidden
  background #fff
  border-1px(#EEEEEE)
  &:hover
    active()
  &>div 
    flex 1
  .customer-img 
    flex 0 0 44px
    margin-right 10px
  .customer-action 
    i 
      display inline-block
      width 19px
      height 19px
      margin-bottom 5px
      line-height 19px
      background #FA8070
      color #fff
      font-style normal
      text-align center
      font-size 12px
      border-radius 2px
      opacity .8
  .customer-status
    text-align right 
    p
      margin 0 0 8px
      font-size 12px
      color #999
    strong
      display none
      font-weight 100
      color #25B181
      &.active
        display inline
      &:nth-of-type(2)
        color #DA4B5A
  
.aaa
  .customer-img
    float left
    width 45px
    height 45px
    background #000
    img 
      width 100%
      height 100%
  .customer-status
    float right
    line-height 45px
    font-size 14px
    color #DA4B5A
    strong
      display none
      font-weight 100
      &.active
        display inline
    strong:nth-of-type(2)
      color #25B181
  .customer-action
    overflow hidden
    padding-left 10px
    color #999
    h2
      font-size 14px
      color #333
      font-weight 400
    p
      margin 8px 0 0
      font-size 12px
      color #999
</style>


<style lang="stylus" scoped>

  .add-btn 
    position fixed
    right 10px
    bottom 100px
    width 62px
    height 62px
    border-radius 50%
    background #DA4B5A
    line-height 62px
    text-align center
    color #fff
    font-size 14px
    box-shadow 0px 1px 15px 0px rgba(0,0,0,0.25)
    &:hover
      background #dd2c3f
    span  
      display inline-block
      width 2em
      line-height 1
      vertical-align middle
</style>
