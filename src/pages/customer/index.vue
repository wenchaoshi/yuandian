<!-- 客户  页面 -->
<template>
  <div id="page">
    <div class="view" id="MiniRefresh">
      <!-- <ul class="follow">
        <li>
          <span class="img-box"><img src="../../images/icon_unfollow.png" alt=""></span>
          <p>未跟进客户（10）</p>
        </li>
        <li>
          <span class="img-box"><img src="../../images/icon_follow.png" alt=""></span>
          <p>已跟进客户（20）</p>
        </li>
      </ul> -->
      <div class="customer MiniRefresh-box">
        <div class="customer-box minirefresh-scroll" id="scroll-view" >
          <!-- <div class="customer-date"><span>2018.12.5</span></div> -->
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
      list:[],
      count:0,
      offset:0
    };
  },

  components: {

  },

  computed: {},

  created(){
    that=this;
    
  },
  mounted: function() {
    this.getList();
    this.miniRefresh()
  },

  methods: {
    toDetail(id,name) {
      this.$router.push({ path: "/customer-detail",query:{customerId:id,name:name}});
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
<style lang='stylus'>
@import '../../style/mixin.styl'
  
ul.follow
  li
    padding 10px
    line-height 50px
    position relative
    border-1px(#f1f1f1)
    overflow hidden
    background #fff
    &:hover
      active()
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
  padding 10px
  overflow hidden
  background #fff
  border-1px(#EEEEEE)
  &:hover
    active()
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