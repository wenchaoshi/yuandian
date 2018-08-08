<!--详情页  -->
<template>
  <div id="page" class="detail">
    <div class="view" id="MiniRefresh">
      <div class="MiniRefresh-box">
        <ul id="scroll-view">

          <li v-for="(item,index) in list" :key='index' :data-id="item.id">
            <div class="detail-date" v-if="item.showTime">
              <span>{{item.create_time | gmtDate}}</span>
            </div>
            <div class="detail-lists" :class="!item.one_man_send?'detail-lists-type1':'detail-lists-type2'">
              <span class="img-box"><img v-if="!item.one_man_send" :src="item.two_image" alt=""><img v-if="item.one_man_send" :src="item.one_image" alt=""></span>
              <p>{{item.content}}</p>
            </div>
          </li>

        </ul>
      </div>
      <div class="message-box">
        <input type="text" placeholder="想跟TA说点什么呢" v-model="content">
        <input type="submit" value="发送" @click="sendInformation">
      </div>
    </div>

  </div>
</template>

<script>
import base from "@/js/base.js";
var that;
export default {
  data() {
    return {
      content:'',
      list: [
        
      ],
      offset:0,//当前请求的第一条数据下标
      count:0,
      intoViewId:0,
      contentover:'释放刷新'
    };
  },

  components: {},

  computed: {},

  created(){
    that=this;
  },

  mounted: function() {
    this.offset=0;
    this.miniRefresh();
    this.getContent();
  },


  methods: {
    sendInformation(){
      this.getData('/wxemployee/talk/send/leave?two_man_id='+this.$route.query.customer_id+'&shop=2013714',{
        type:'post',
        data:{
          content:that.content
        },
        success(res){
          console.log('发送成功');
          that.content='';
          that.list=[];
          that.getContent();
        }
      })
    },
    getContent(successCallback,obj){
      that.getData('/wxemployee/talk/send/leave?two_man_id='+this.$route.query.customer_id+'&shop=2013714&limit=20&offset='+that.offset,{
        success(res){
          if(res.status==0){
            var newList=res.detail;
            that.count=res.count;
            var oldTime=0;
            //处理时间显示问题
            let len=newList.length;
            for(let i=0; i<len; i++){
              newList[i].showTime=false;
              if(i<len-1){
                oldTime=that.moment(newList[i+1].create_time).format('YYYYMMDDHHmm');
              }else{
                oldTime=0;
              }
              
              let thisTime=that.moment(newList[i].create_time).format('YYYYMMDDHHmm');
              newList[i].new_create_time=thisTime;
              if(thisTime-oldTime>5){
                newList[i].showTime=true;
              }
            }

            that.list.push(...newList)
            that.$nextTick(()=>{
              if(obj){
                base.intoView($(obj))
                console.log(obj)
              }else {
                if($('#scroll-view li').length){
                  base.intoView($('#scroll-view li:nth-of-type(1)'))
                }
              }
            })
            if(successCallback)successCallback()
          }
        }
      })
    },

    miniRefresh() {
      //下拉刷新
      var miniRefresh = new MiniRefresh({
        container: "#MiniRefresh",
        down: {
          callback: function() {
            // 下拉事件
            if(that.list.length>=that.count){
              miniRefresh.endDownLoading();
              $('.load').text('已加载全部数据').addClass('active success');
              setTimeout(()=>{
                $('.load').removeClass('active success')
              },500)
              return 
            }
            
            let timer=setTimeout(()=>{
              miniRefresh.endDownLoading();
            },4000)

            that.offset+=20;
            that.getContent(function(){
              miniRefresh.endDownLoading();
              clearTimeout(timer)
            },'#scroll-view li:nth-of-type('+that.list.length+')')
          }
        },
        up: {
          isLock:true,
          contentnomore: "没有更多数据了",
          contentdown:'上啦显示更多',
          contentrefresh:'加载中。。。',
          callback: function() {
            // 上拉事件
            // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
            miniRefresh.endUpLoading();
          }
        }
      });
    }
  }
};
</script>

<style lang='stylus'>
.detail .minirefresh-totop 
  display none !important
#scroll-view
  display flex
  flex-direction column-reverse
  background #f1f1f1
  min-height 35px
ul#scroll-view
  padding-bottom 0
.detail .view
  height 100%
  padding-bottom 60px
  .detail-lists
    padding 8px 10px
    overflow hidden
    span
      display inline-block
      width 40px
      height 40px
      background #000
      img 
       width 100%
       height 100%
    p
      display inline-block
      margin 0 10px
      padding 10px
      line-height 20px
      overflow hidden
      max-width 2.25rem
      word-break break-all
      border-radius 2px
      text-align justify
  .message-box
    position fixed
    left 0
    bottom 0
    z-index 99
    width 100%
    height 60px
    padding 10px
    background #fff
    input
      vertical-align middle
      height 100%
      float left
      border none
      &::-webkit-input-placeholder
        color #999
    input[type=text]
      width 2.8rem
      padding 0 0.1rem
      background #f1f1f1
      margin-right 0.1rem
    input[type=submit]
      width 0.6rem
      float right
      color #fff
      background #25B181
// 时间
.detail-date
  margin-top 15px
  margin-bottom 5px
  text-align center
  span
    display inline-block
    padding 0 10px
    line-height 25px
    border-radius 2px
    font-size 12px
    color #fff
    background #C1C1C1
// 两种消息的不同样式
.detail-lists-type1
  span
    float left
  p
    color #333
    background #fff
.detail-lists-type2
  text-align right
  span
    float right
  p
    color #fff
    background #25B181
    text-align left
</style>