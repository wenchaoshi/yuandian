<!--客户资料 -->
<template>
  <div class="view customer-information">
    <div class="customer-information-edit">
        <ul>
          <!-- <li><input type="text" v-model="token"></li> -->
          <li><label for="name"><span>真实姓名</span><input type="text" v-model="customerDetail.customer.name" id="name"></label></li>
          <li><label for="tel"><span>联系方式</span><input type="number" v-model="phone" id="tel"></label></li>
          <li><label for="wx"><span>微信号</span><input type="text" v-model="customerDetail.customer.wx_number" id="wx"></label></li>
          <li><label for="job"><span>从事工作</span><input type="text" v-model="customerDetail.customer.position" id="job"></label></li>
          <li><label for="note"><span>备注</span><input type="text" v-model="customerDetail.customer.remarks" id="note"></label></li>
          <li><label for="submit"><input type="submit" value="编辑" id="submit" @click="submit"></label></li>
        </ul>
    </div>
  </div>
</template>

<script>
var that;
export default {
  data() {
    return {
      customerId:0,
      name:'',
      phone:'',
      customerDetail:{
        customer:{}
      },
      token:''
    };
  },
  components: {},

  computed: {

  },

  created(){
    that=this;
  },

  mounted: function() {
    that.customerId=this.$route.query.customerId;
    that.name=this.$route.query.name;
    this.get_customerDetail()
  },
  watch:{
    phone(newval, oldval){
      let phone=that.phone.replace(/\s+/g,""); 
      if(phone.length>11){
        phone=phone.substr(0,11)
      }
      that.phone=phone;
    }
  },
  methods: {
    get_customerDetail(){
      //获取顾客详情，（预计成交率和实际跟进进度）
      that.getData('/wxemployee/customer/detail?shop=2013714&employee=2005503&customer='+that.customerId,{
        success(res,token){
          console.log(res)
          that.$set(that.customerDetail,'customer',res.detail.customer);
          that.phone=res.detail.customer.phone;
          that.token=token
        },
        error(res){

        }
      })
    },
    submit(){
      let customer=this.customerDetail.customer;
      if(that.phone.length!=11&&that.phone.length>0){
        $('.load').addClass('text').text('手机号码格式不正确！');
        setTimeout(()=>{
          $('.load').removeClass('text')
        },500)
        return 
      }
      that.getData('/wxemployee/customer/detail?shop=2013714&employee=2005503&customer='+this.customerId,{
        type:'POST',
        data:{
          name:customer.name,
          phone:that.phone,
          wx_number:customer.wx_number,
          position:customer.position,
          remarks:customer.remarks
        },
        successtext:'更改信息成功',
        success(){
          that.$router.go(-1)
        }
      })
    }
  }
};
</script>
<style lang='stylus'>
.customer-information.view
  height 100%
  .customer-information-edit
    ul
      margin 10px
      border-radius 2px
      overflow hidden
      li
        padding 0 20px
        background #fff
      li:nth-last-of-type(2) label
        border none
      li:nth-last-of-type(1)
        margin-top 20px
        background #4F4F5C
        label
          padding 12px 20px
          border-bottom none
        input
          display inline-block
          width 100%
          border none
          color #fff
          line-height 20px
      label
        display block
        padding 20px 0
        border-bottom 1px solid #e3e3e3
        &:after 
          content ""
          display block
          height 0
          opacity 0
          clear both
        span 
          display inline-block
          width 5em
          line-height 20px
          float left
          color #999
        input
          display inline-block
          float left
          border none
          width calc(100% - 5em)
          line-height 20px
          background none
</style>