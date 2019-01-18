<!-- 跟进详情 -->
<template>
  <div id="page">
      <ul>
          <li v-for="(item, index) in list" :key="index">
              <div>
                  <!-- 10月18日 19:00 -->
                  <p class="color-aaa"><span>{{item.create_time | setDate('MM月DD日')}}</span></p>
                  <p class="color-25B181"><span>{{item.create_time | setDate('HH:mm')}}</span></p>
              </div>
              <div>
                  <p class="text-right">
                      <span v-if="item.follow_status==1"><img src="../../images/phone-icon.png" alt="">电话跟进</span>
                      <span v-if="item.follow_status==2"><img src="../../images/wx-icon.png" alt="">微信跟进</span>
                  </p>
                  <p>{{item.follow_info}}</p>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
var that;
export default {
  data () {
    return {
        list:[]
    };
  },

  components: {},

  computed: {},

  filters:{
      setDate(val,type){
           return that.moment(val).format(type)
      }
  },

  created(){
      that=this;
  },

  mounted: function () { 
      let that=this;
      this.request('/wxemployee/customer/follow?customerId='+that.$route.query.customer_id,{
          success(res){
              console.log(res)
              that.list=res.results
          }
      })


   },

  methods: {}
}

</script>
<style lang='stylus' scoped>
#page 
    padding 20px 10px
    background #F1F1F1

ul 
    li 
        display flex
        div 
            float left
        div:nth-of-type(1) 
            width 60px
            margin-right 15px
            position relative
            border-right 1px dashed #ccc
            font-size 12px
            &:after,&:before 
                content ""
                display inline-block
                position absolute
                right -6px
                top -6px
                width 12px
                height 12px
                border-radius 50%
                background #25B181
                opacity .5
            &:after 
                width 6px
                height 6px
                right -3px
                top -3px
                opacity 1
            .color-aaa 
                color #aaa
                font-size 12px
                line-height 1.4
            .color-25B181
                color #25B181
                font-weight bold
                font-size 14px
                line-height 1.6
                
        div:nth-of-type(2) 
            width calc(100% - 75px)
            margin-bottom 20px
            padding 15px
            background #fff
            border-radius 2px
            p.text-right 
                text-align right 
                margin-bottom 10px
                color #777777
                font-size 12px
                img 
                    width 16px
                    margin-right 6px
                    vertical-align sub

</style>
