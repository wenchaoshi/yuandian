<!-- 商机  页面 -->
<template>
  <div id="page">
    <div class="view" id="MiniRefresh">
      <div class="business" id="scroll-view">
        <div v-for='(items,index) in list' :key='index' :data-id="items.id">

          <div class="business-date business-lists">
            <span>{{items.create_time | gmtDate}}</span>
          </div>

          <div :data-id='items.id' class="business-lists" @click="toDetail(items.customer_id,$event)">
            <span class="img-box el-icon-info"><img :src="items.image_url" alt=""></span>
            <p v-html='items.show_message'></p>
          </div>

        </div>
        
      </div>
    </div>

    <Card-btn-icon></Card-btn-icon>

    <tab></tab>
  </div>
</template>


<script>
import CardBtnIcon from '@/pages/mine/card/card-btn-icon'
var that;
export default {
  name:'business',
  data() {
    return {
      list:[],
      offset:0,//当前请求的第一条数据下标
      count:0,
      intoViewId:0,
      upOff:true
    };
  },

  components: {
    CardBtnIcon
  },

  computed: {
  },
  

  created(){
    that=this;
  },
  mounted: function() {
    let that=this;
    this.getList()
    this.miniRefresh(this);
  },

  methods: {
    navigator(target){
      this.$router.push({path:target})
    },
    miniRefresh(that) {
      //下拉刷新
      var miniRefresh = new MiniRefresh({
        container: "#MiniRefresh",
        down: {
          callback: function() {
            // 下拉事件
            let timer=setTimeout(()=>{
              miniRefresh.endDownLoading();
            },4000);

            //用定时器延时加载，防止请求接口太快而导致下拉刷新功能的显示问题
            setTimeout(()=>{
              that.list=[];
              that.offset=0;//当前请求的第一条数据下标
              that.getList(()=>{
                miniRefresh.endDownLoading();
                clearTimeout(timer)
              })
            },300)
          }
        },
        up: {
          contentnomore: "没有更多数据了",
          contentdown:'上啦显示更多',
          contentrefresh:'加载中...',
          offset:90,
          loadFull: {
            isEnable: false
          },
          isAuto: false,
          callback: function() {
            // 上拉事件
            // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求

            if(that.upOff){
              if(that.list.length>=that.count){
                miniRefresh.endUpLoading(true);
                return
              }
              that.upOff=false;
              that.offset+=20;
              var top=miniRefresh.getPosition();
              
              that.getList(()=>{
                miniRefresh.scrollTo(top||0, 0);
                that.upOff=true;
                miniRefresh.endUpLoading(false);
              })
            }
          }
        }
      });
    },
    toDetail(customer_id,e) {
      //console.log(this.item)
      let el=e.currentTarget;
      let product_id=$(el).find('b').text()||null;
      this.$router.push({ path: "/information-detail" , query:{customer_id:customer_id,product_id:product_id}});
    },
    getList(successCallback){
      that.getData('/wxemployee/business/list?shop=2013714&employee=2005503&limit=20&offset='+that.offset,{
        success(res){
          //that.$set(that.mydata,'list',res.detail)
          that.count=res.count;
          that.list.push(...res.detail);
          that.$nextTick(()=>{
            if (successCallback) successCallback()
          })
        },
        error(res){
          console.log(res)
        }
      })
    }
  }
};
</script>
<style lang='stylus'>
.business
  display flex
  // flex-wrap wrap-reverse
  flex-direction column !important
  background inherit
  .business-date
    width 100%
    margin-top 20px
    margin-bottom 10px
    text-align center
    span
      display inline-block
      padding 0 10px
      line-height 25px
      border-radius 2px
      font-size 12px
      color #fff
      background #C1C1C1
  .business-lists:not(.business-date)
    position relative
    width 3.55rem
    margin 10px auto
    padding 0.1rem
    border-radius 3px
    background #fff
    &:after
      content ''
      display inline-block
      width 6px
      height 10px
      position absolute
      right 10px
      top calc(50% - 5px)
      background url('../../images/Triangle_3.png') 0 / 100% 100%
    &:hover
      active()


#scroll-view 
  min-height 35px
  background #f1f1f1  


.business-lists
  overflow hidden
  cursor pointer
  .img-box
    display inline-block
    float left
    width 0.4rem
    height auto
    margin-right 0.1rem
    background #000
  img
    width 100%
    height 40px
  p
    overflow hidden
    width 2.26rem
    strong
      color #3cb98e
      font-weight normal
    b 
      display none  //这个b标签是后台用来传递product_id用的




</style>