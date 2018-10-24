<!--  -->
<template>
  <div class="customer-box">
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
</template>

<script>
export default {
  data() {
    return {
      list:[]
    };
  },

  components: {},

  computed: {},

  created(){
    


  },
  mounted: function() {
    this.getList()
  },

  methods: {
    toDetail(id,name) {
      this.$router.push({ path: "/customer-detail",query:{customerId:id,name:name}});
    },
    getList(){
      let that=this;
      that.getData('/web/Zhushoulogin',{
        success(res){
          console.log(res)
          that.list=res.results;
         // that.list=res.detail.list
        },
        error(){

        }
      })
    }
  }
};
</script>
<style lang='stylus'>
@import '../../style/mixin.styl'
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