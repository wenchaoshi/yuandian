<!--客户资料 -->
<template>
  <div class="view customer-information">
    <div class="customer-information-edit">
        <ul>
          <li><label for="name"><input type="text" placeholder="真实姓名" v-model="name" id="name"></label></li>
          <li><label for="tel"><input type="text" placeholder="联系方式" v-model="phone" id="tel"></label></li>
          <li><input type="submit" value="编辑" id="submit" @click="submit"></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:'',
      phone:''
    };
  },
  components: {},

  computed: {},

  mounted: function() {
    console.log(this.$route.params.id)
    console.log(this.$route.params)
  },

  methods: {
    submit(){
      let that=this;
      that.getData('/wxemployee/customer/detail?shop='+this.$router.params.id+'&employee=2005503&customer=2001146',{
        type:'POST',
        data:{
          name:that.name,
          phone:that.phone
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
        padding 12px 20px
        input
          color #fff
      label
        display block
        padding 20px 0
        border-bottom 1px solid #e3e3e3
      input
        border none
        width 100%
        height 100%
        background none
</style>