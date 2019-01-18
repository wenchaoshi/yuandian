<!--详情页  -->
<template>
<div style="height:100%;">
  <div id="page" class="detail">
    <div class="view" id="MiniRefresh">
      <div class="MiniRefresh-box" :style="product.isShow?{'padding-top': '100px'}:''">
        <div class="product-fixTop" v-show="product.isShow">
          <span><img :src="'https://show.qnssl.xuemei99.com/'+product.detail.product_image" :alt="product.detail.product_title"></span>
          <div>
            <h3>{{product.detail.product_title}}</h3>
            <p><i>热销产品</i><strong>￥{{product.detail.price_discount}}</strong></p>
          </div>
        </div>
        <ul id="scroll-view">

          <li v-for="(item,index) in list" :key='index' :data-id="item.id">
            <div class="detail-date" v-if="item.showTime">
              <span>{{item.create_time | gmtDate}}</span>
            </div>
            <div class="detail-lists" :class="!item.one_man_send?'detail-lists-type1':'detail-lists-type2'">
              <span class="img-box"><img v-if=  "!item.one_man_send" :src="item.two_image" alt=""><img v-if="item.one_man_send" :src="item.one_image" alt=""></span>
              <div class="detail-lists-content" v-if="item.mssage_type==2&&item.content_arr">
                <h3>来自：{{ item.content_arr[3] }}</h3>
                <div>
                  <img :src="item.content_arr[2]" :alt="item.content_arr[0]">
                  <div>
                    <p>产品：{{ item.content_arr[0] }}</p>
                    <p>价格：{{ item.content_arr[1] /100 }}元</p>
                  </div>
                </div>
              </div>
              <div class="detail-lists-content" v-if="item.mssage_type==3&&item.content_arr">
                <h3>来自：{{ item.content_arr[3] }}</h3>
                <div>
                  <img :src="item.content_arr[2]" :alt="item.content_arr[0]">
                  <div>
                    <p>团购：{{ item.content_arr[0] }}</p>
                    <p>价格：{{ item.content_arr[1] /100 }}元</p>
                  </div>
                </div>
              </div>



              <div class="detail-lists-content" v-if="item.mssage_type==4&&item.content_arr">
                <h3>来自：{{ item.content_arr[3] }}</h3>
                <div>
                  <img :src="item.content_arr[2]" :alt="item.content_arr[0]">
                  <div>
                    <p>秒杀：{{ item.content_arr[0] }}</p>
                    <p>价格：{{ item.content_arr[1] /100 }}元</p>
                  </div>
                </div>
              </div>
              <div class="detail-lists-content" v-if="item.mssage_type==5&&item.content_arr">
                <h3>来自：{{ item.content_arr[3] }}</h3>
                <div>
                  <img :src="item.content_arr[2]" :alt="item.content_arr[0]">
                  <div>
                    <p>砍价{{ item.content_arr[0] }}</p>
                    <p>价格：{{ item.content_arr[1]/100 }}元</p>
                  </div>
                </div>
              </div>
              <p class="detail-lists-content"  v-if="item.mssage_type==0||item.mssage_type==1">{{item.content}}</p>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
  <div class="message-box">
    <input type="text" placeholder="想跟TA说点什么呢"  @focus="inputFocus($event)" v-model="content">
    <input type="submit" value="发送" @click="sendInformation">
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
      list: [],
      offset:0,//当前请求的第一条数据下标
      count:0,
      intoViewId:0,
      contentover:'释放刷新',
      MiniRefreshBox:0,
      scrollView:0,
      MiniRefresh:0,
      product:{
        isShow:false,
        detail:{
          content:'',
          product_image:'',
          desc:'',
          price_discount:'',
          product_title:''
        }
      },
    };
  },

  components: {},

  computed: {
  },

  created(){
    that=this;
  },

  mounted: function() {
    this.offset=0;
    this.miniRefresh();
    this.getContent();
    let product_id=this.$route.query.product_id;
    if(product_id){
      that.product.isShow=true;
      this.request('/wxemployee/message/product/'+product_id+'?product_id='+product_id,{
        success(res){
          that.$set(that.product,'detail',res.detail)
        },
        error(res){
        }
      })
    }
  },
  updated(){
    this.MiniRefreshBox=$('.MiniRefresh-box').height();
    this.scrollView=$('#scroll-view').height();
  },

  methods: {
    sendInformation(){
      if(that.content===''){
        return
      }
      this.request('/wxemployee/talk/send/leave?two_man_id='+this.$route.query.customer_id,{
        type:'post',
        data:{
          content:that.content
        },
        success(res){
          console.log('发送成功');
          that.content='';
          that.list=[];
          that.offset=0;
          that.getContent();
        }
      })
    },
    getContent(successCallback,obj){
      that.request('/wxemployee/talk/send/leave?two_man_id='+this.$route.query.customer_id+'&limit=20&offset='+that.offset,{
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
              //如果两条消息之间的时间间隔在5分钟以内，那么不显示时间
              if(thisTime-oldTime>5){
                newList[i].showTime=true;
              }

              if(newList[i].mssage_type!=1&&newList[i].mssage_type!=1){
                let content_arr=newList[i].content.split('&');
                newList[i].content_arr=content_arr;
              }
            }

            that.list.push(...newList)
            that.$nextTick(()=>{
              if(obj){
                //不是第一次加载的情况下会有obj参数，obj即为当前需要滚动到的元素
                base.intoView($(obj))
                console.log(obj)
              }else {
                if($('#scroll-view li').length){
                  //如果第一次进来，那么就滚动到第一个元素（元素个数不为0的情况下）
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

            setTimeout(() => {
              that.offset+=20;
              that.getContent(function(){
                miniRefresh.endDownLoading();
                clearTimeout(timer)
              },'#scroll-view li:nth-of-type('+that.list.length+')')
            }, 300);
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
    },
    inputFocus(e){

      // var u = navigator.userAgent, app = navigator.appVersion;
      // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      window.setTimeout(()=>{
        window.scrollTo(0, $('body').height());
        if($('#scroll-view li').length){
          base.intoView($('#scroll-view li:nth-of-type(1)'));
        }
        base.intoView($('.message-box'));
      }, 500);
    }
  }
};
</script>

<style lang='stylus'>
.detail .minirefresh-totop 
  display none !important
  
.MiniRefresh-box 
  min-height 100%

.product-fixTop 
  position fixed
  top 10px
  left 10px
  width calc(100% - 20px)
  height 84px
  padding 10px 15px
  background #fff
  border-radius 2px
  z-index 9999
  span 
    float left 
    width 64px
    height 64px
    img 
      width 100%
      height 100%
  div 
    margin-left 79px
    overflow hidden
    position relative
    height 100%
    h3 
      font-size 16px
      font-weight 900
      line-height 18px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    p
      position absolute
      width 100%
      bottom 0
      left 0
      i 
        display inline-block
        padding 1px 3px
        font-size 10px
        line-height 18px
        background url('../../images/img_product_label.png') no-repeat 0 center/ 100% 16px
        color #fff
        font-style normal
        float left

      strong 
        color #F24C5E
        font-weight bold
        font-size 18px
        line-height 18px
        float right 

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
    .detail-lists-content
      display inline-block
      margin 0 10px
      padding 10px
      line-height 20px
      overflow hidden
      max-width 2.25rem
      word-break break-all
      border-radius 2px
      text-align justify
    div.detail-lists-content
      background #fff
      h3  
        margin-bottom 10px
        padding-bottom 5px
        font-size 16px
        border-bottom 1px solid #eee
      &>div 
        display flex
        align-items center
        img 
          width 60px
        div 
          flex 1
          padding-left 10px
          p 
            line-height 1.4
            &:nth-of-type(1) 
              margin-bottom 5px

.message-box
  position absolute
  left 0
  bottom 0
  z-index 9999
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
  margin-bottom 5px
  margin-top 15px
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