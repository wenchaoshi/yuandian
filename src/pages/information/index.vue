<!-- 消息  页面 -->
<template>
  <div id="page" class="information-index">
    <scroll class="view" id="MiniRefresh"
    @pullingUp="pullingUp"
    @pullingDown="pullingDown"
    :isAll="informationLists.length>=count"
    ref="scroll"
    >
      <div class="MiniRefresh-box">
        
        <div class="information">
          <div class="information-view">

            <div v-for='(item,index) in informationLists' :key='index' class="information-list" @click="toDetail(item.customer_id)">
              <span class="information-img"><img :src="item.customer_image" alt=""></span>
              <div class="information-action">
                <!-- <h1>{{ JSON.stringify(item) }}</h1> -->
                  <h2>{{item.customer_name}}</h2>
                  <p>{{item.message_type==2?'[我要咨询产品]':item.content}}</p>
                  <span>{{item.create_time | gmtDate}}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </scroll>
    <tab></tab>
  </div>
</template>

<script>
var that;
export default {
  name:'information',
  data() {
    return {
      informationLists: [
       
      ],
      offset:0,
      count:0
    };
  },

  components: {
    
  },

  computed: {},

  created(){
    that=this;
  },
  mounted: function() {
    that.getList();
    // this.miniRefresh(this);
    //  scroll= new that.BScroll('.view',{
    //     scrollY: true,
    //     click: true,
    //     pullDownRefresh:{
    //       threshold: 50,
    //       stop: 20
    //     },
    //     pullUpLoad:{
    //       threshold: 50
    //     }
    // })
    // // // this.miniRefresh(this);
    // scroll.on('pullingDown',function(){
    //   that.informationLists=[];
    //   that.offset=0;
    //   that.getList(
    //     function(){
    //       scroll.finishPullDown()
    //       that.$nextTick(()=>{
    //         scroll.refresh()
    //       })
          
    //     }
    //   )
    // })

    // scroll.on('pullingUp',function(){
    //   if(that.informationLists.length>=that.count){
    //     scroll.finishPullUp()
    //     return
    //   }
    //   that.offset+=20;
    //   that.getList(()=>{
    //     scroll.finishPullUp()
    //     that.$nextTick(()=>{
    //       scroll.refresh()
    //     })
    //   })
    // })
  },
  watch:{
    $route(){
      this.$refs.scroll.refresh()
    }
  },
  methods: {
    pullingDown(){
      that.informationLists=[];
      that.offset=0;
      that.getList(()=>{
          this.$refs.scroll.finishPullDown()
      })
    },
    pullingUp(){
      if(that.informationLists.length>=that.count){
        this.$refs.scroll.finishPullUp()
        return
      }
      that.offset+=20;
      that.getList(()=>{
        this.$refs.scroll.finishPullUp()
      })
    },
    toDetail(customer_id) {
      //console.log(this.item)
      this.$router.push({ path: "/information-detail" , query:{customer_id:customer_id}});
    },
    getList(successFn){
      that.request('/wxemployee/customer/leave/list?limit=20&offset='+that.offset,{
        type:'get',
        success(res){
          that.count=res.count;
          that.informationLists.push(...res.detail);
          if(successFn) successFn()
        }
      })
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
            },4000)
            
            setTimeout(() => {
              that.informationLists=[];
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
            // 上拉事件
            // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
            // setTimeout(function(){
            //   miniRefresh.endUpLoading(false);
            // },300)

            //minirefresh.resetUpLoading();
            
            if(that.informationLists.length>=that.count){
              miniRefresh.endUpLoading(true);
              $('html').removeClass('scroll')
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
<style lang="stylus" scoped>
#page 
  padding-bottom 50px
.view 
    -webkit-overflow-scrolling none
</style>

<style lang='stylus'>
@import '../../style/mixin.styl'
.information-index .MiniRefresh-box 
  position relative
.information
  background #f1f1f1
  min-height 35px
  .information-view
    background #fff
.information-index .minirefresh-theme-default .minirefresh-upwrap
  display block

.information-list
  position relative
  padding 20px 10px
  overflow hidden
  border-1px(#EEEEEE)
  cursor pointer
  &:after
    top 0
  .information-img
    float left
    width 50px
    height 50px
    img 
      width 100%
      height 100%
  .information-action
    overflow hidden
    padding-left 10px
    color #999
    h2
      font-size 16px
      color #333
      font-weight 400
    p
      margin 8px 0 16px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    span
      font-size 12px
</style>