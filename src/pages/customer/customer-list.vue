<!--  -->
<template>
  <div class="customer-box">
    <div class="customer-date"><span>2018.12.5</span></div>
    <div class="customer-list" @click="toDetail">
        <span class="customer-img"><img src="" alt=""></span>
        <span class="customer-status">
            <strong class="active">已跟进</strong>
            <strong>未跟进</strong>
        </span>
        <div class="customer-action">
            <h2>黎莉莉</h2>
            <p>最后活跃时间14：00</p>
        </div>
    </div>
    <div class="customer-list" @click="toDetail">
        <span class="customer-img"><img src="" alt=""></span>
        <span class="customer-status">
            <strong class="active">已跟进</strong>
            <strong>未跟进</strong>
        </span>
        <div class="customer-action">
            <h2>黎莉莉</h2>
            <p>最后活跃时间14：00</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted: function() {},

  methods: {
      toDetail(){
        this.$router.push({path:'/customer-detail'})
      }
  }
};
</script>
<style lang='stylus'>
@import '../../style/mixin.styl';
.customer-date 
  margin-top 10px
  padding 10px
  color #333

.customer-list {
  position: relative;
  padding: 10px;
  overflow: hidden;
  background #fff
  border-1px(#EEEEEE);

  .customer-img {
    float: left;
    width: 50px;
    height: 50px;
    background: #000;
  }
  .customer-status {
    float right
    line-height 50px
    font-size 16px
    color #dd5866
    strong {
        display none
        font-weight 100
        &.active {
            display inline    
        }
    }
    strong:nth-of-type(2) {
        color #3eba8f
    }
  }

    

  .customer-action {
    overflow: hidden;
    padding-left: 10px;
    color: #999;

    h2 {
      font-size: 18px;
      color: #333;
      font-weight: 100;
    }

    p {
      margin: 8px 0 0;
      font-size 14px
      color #999
    }
  }
}
</style>