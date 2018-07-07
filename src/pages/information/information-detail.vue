<!--详情页  -->
<template>
  <div id="page" class="detail">
    <view-head></view-head>

    <div class="view">
      <div class="">
        <div class="detail-lists" v-for="(item,index) in list" :key='index' :class="item.type==1?'detail-lists-type1':'detail-lists-type2'">
          <span class="img-box"><img :src="item.imgSrc" alt=""></span>
          <p>{{item.p}}</p>
        </div>
        <div class="detail-date">
          <span>4小时前</span>
        </div>
      </div>
      <div class="message-box">
        <input type="text" placeholder="想跟TA说点什么呢">
        <input type="submit" value="发送">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          type:1,
          imgSrc: "aaa",
          h2: "张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          type:2,
          imgSrc: "aaa",
          h2: "张",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          type:2,
          imgSrc: "aaa",
          h2: "张张",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          type:1,
          imgSrc: "aaa",
          h2: "张晓晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          type:1,
          imgSrc: "aaa",
          h2: "张晓丽张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          type:2,
          imgSrc: "aaa",
          h2: "张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          type:1,
          imgSrc: "aaa",
          h2: "张晓丽张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          type:1,
          imgSrc: "aaa",
          h2: "张晓丽张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          type:2,
          imgSrc: "aaa",
          h2: "张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          type:2,
          imgSrc: "aaa",
          h2: "张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
        {
          type:2,
          imgSrc: "aaa",
          h2: "张晓丽",
          p: "文字文字文字文字文字文字文字文字文字文字文字文字",
          date: "5小时前"
        },
      ]
    };
  },

  components: {},

  computed: {},

  mounted: function () { 
    document.getElementsByClassName('view')[0].scrollBy(0,100000);
  },

  methods: {}
}

</script>

<style lang='stylus'>
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
    p 
      display inline-block
      margin 0 10px
      padding 10px
      line-height 20px
      overflow hidden
      max-width 2.23rem
      border-radius 2px
  .message-box 
    position fixed
    left 0
    bottom 0
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
      padding 0 .1rem
      background #f1f1f1
      margin-right .1rem
    input[type=submit]
      width .6rem
      float right
      color #fff
      background #25B181

    

//时间
.detail-date {
  margin-top: 15px;
  margin-bottom: 5px;
  text-align: center;

  span {
    display: inline-block;
    padding: 0 10px;
    line-height: 25px;
    border-radius: 2px;
    font-size: 12px;
    color: #fff;
    background: #C1C1C1;
  }
}

//两种消息的不同样式
.detail-lists-type1 {
  span {
    float left
  }
  p { 
    color #333
    background #fff
  }
}
.detail-lists-type2 {
  text-align right
  span {
    float right
  }
  p { 
    color #fff
    background #25B181
    text-align left
  }
}
  
</style>