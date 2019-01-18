<!-- 客户  页面 -->
<template>
  <div id="page">
    <div class="view">
      <div class="search">
        <form action="" @submit.prevent="submit()">
          <input type="number" placeholder="输入手机号搜索" v-model.trim="search" />
          <input type="submit" style="display:none">
        </form>
      </div>

      <div class="customer-box">
        <div class="customer-list" @click="toDetail(item.id,item.name)" v-for="(item,index) in normal.detail" :key="index" :data-index="index">
          <div class="customer-img"><img :src="item.image!=''?item.image:'https://wx.yun.xuemei99.com/static/wxapp/img/default.png'" :alt="item.name"></div>
          <div class="customer-action">
              <i class="icon-new" :class="item.customer_type!=1?'green':''">{{item.customer_type==1?'新':'微'}}</i>
              <h2>{{item.name}}</h2>
          </div>
          <div class="customer-status">
              <p>最后活跃时间{{ item.last_time | gmtDate }}</p>
              <strong :class="item.status?'active':''">已跟进</strong>
              <strong :class="!item.status?'active':''">未跟进</strong>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
var that;
export default {
  name:'customer',
  data() {
    return {
      search:'',
      detail:{},
      normal:{
        detail:[]
      }
    };
  },

  components: {

  },

  computed: {
  },

  created(){
    that=this;
  },
  mounted: function() {
    this.Mounted()
  },
  watch:{
    '$route'(){
      this.Mounted()
    }
  },
  methods: {
    Mounted(){
      let phone=this.$route.query.phone;
      if(!phone) return;
      this.search=phone;
      this.normal.detail=[];
      this.submit(phone)
    },
    submit(queryPhone){
      let that=this;
      let phone=queryPhone||this.search;
      if(phone.length!=11){
        $('.load').addClass('active error').text('请输入正确的手机号');
        setTimeout(()=>{
          $('.load').removeClass('active error');
        },1000)
        return
      }
      this.request('/wxapp/customer/search/api?phone='+phone,{
        success(res){
          that.normal.detail=res.detail
        }
      })
    },
    toDetail(id,name) {
      this.$router.push({ path: "/customer-detail",query:{customerId:id,name:name}});
    }
  }
};
</script>
<style lang='stylus' scoped>
.view 
  height 100%
.search 
  position relative
  z-index 10
  padding 10px
  background #F1F1F1
  transform translateZ(10px)
  input 
    width 100%
    height 44px
    padding-left 55px
    border none
    border-radius 8px
    background #fff url('../../images/search.png') no-repeat 18px center/16px auto
.shade 
  position fixed
  left 0
  top 64px
  width 100%
  height calc(100% - 64px)
  background rgba(0,0,0,.3)
  z-index 1


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
  width 100%
  line-height initial
  // overflow hidden
  background #fff
  transition .4s
  border-1px(#EEEEEE)
  &:hover
    active()
  &>div 
    flex 1
  .del 
    flex none
    position absolute
    right -90px
    top 0
    width 90px
    height 100%
    color #fff
    background #f00
    line-height 64px
    text-align center
    font-size 18px

  .customer-img 
    flex 0 0 44px
    margin-right 10px
  .customer-action 
    flex none
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
      &.green
        background #25B181
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
.customer-box 
  padding 10px
</style>