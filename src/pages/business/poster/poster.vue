<!-- 海报获客 -->
<template>
  <div id="page">
      <div class="view">
          <div class="tab-box">
              <ul class="aaaa">
                  <li v-for="(item, index) in categoryList" :key="index" :class="categoryIndex==index?'active':''" @click="changeIndex(index)"><span>{{item}}</span></li>
              </ul>
          </div>
          <div class="content poster-content">
              <div class="clearfix">
                  <template  v-for="(item, index) in detail" >
                    <div class="img-box" :key="index"><span @click="navigator('/poster-menu',item.link_url)"><img :src="item.link_url" alt=""></span></div>
                    <div class="clearfix" v-if="index%3==1" :key="index"></div>
                  </template>
              </div>
              <!-- <Swiper v-if="detail.length > 0" :autoPlay='false'>
                  <Slide v-for="(item, index) in detail" :key="index"><span @click="navigator('/poster-menu',item.link_url)"><img :src="item.link_url" alt=""></span></Slide>
              </Swiper> -->
          </div>
      </div>
  </div>
</template>

<script>
import { Swiper, Slide } from 'vue-swiper-component';
import BScroll from 'better-scroll'
export default {
  data () {
    return {
        categoryList:['早安心语','节日海报','招聘纳新','营销推广','预约海报','正能量'],
        categoryIndex:0,
        detail:[]
    };
  },

  components: {
      Swiper,
      Slide
  },

  computed: {},

  mounted: function () { 
      var that=this
      this.getImg()
    //   $(document).on('touchmove',function(){
    //       return false
    //   })

      this.$nextTick(()=>{
          $('.tab-box ul').width($('.tab-box li').outerWidth()*$('.tab-box li').length)
          var scroll= new BScroll('.tab-box',{
            scrollY: false,
            scrollX: true,
            momentum:false,
            click: true
        })
      })
   },

  methods: {
      navigator(path,imgSrc){
          this.$store.state.posterImg=''
          this.$router.push({path:path,query:{img:imgSrc}})
      },
      changeIndex(index){
          this.categoryIndex=index
          this.getImg()
      },
      getImg(){
          let that=this;
          this.request('/wxcompany/source/piclist/api?tag='+this.categoryIndex,{
              success(res){
                  console.log(res)
                  that.detail=res.detail;
                //    var mySwiper = new Swiper ('.swiper-container', {
                //         loop: true, // 循环模式选项
                //     })        
              }
          })
      }
  }
}

</script>
<style lang='stylus' scoped>
.view
    overflow-y auto
    -webkit-overflow-scrolling touch
* 
    touch-action none
.view * 
    touch-action initial
.tab-box 
    width 100%
    background #fff
    ul
        font-size 0
        white-space nowrap
        overflow hidden
        li 
            font-size 14px
            display inline-block
            padding 0 18px
            line-height 44px
            background #fff
            span 
                display inline-block
                border-bottom 2px solid transparent
            &.active 
                color #398FFF
                span 
                    border-bottom-color #398FFF
.content 
    margin 0 auto
    &>div 
        padding 5px
    .img-box 
        width 33.3333%
        float left
        padding 5px
        img 
            width 100%
</style>
<style lang="stylus">
.view
    overflow-y hidden
    -webkit-overflow-scrolling none
.poster-content 
    text-align center
    img 
        margin 0 auto
    .wh_content 
        padding-bottom 30px
        overflow-y visible
        height 100%
    .wh_indicator 
        bottom 0px
        font-size 0
        color transparent
    .wh_swiper 
        height 100%
    .wh_slide 
        height 100%
        img 
            max-height 100%
            max-width 100%
</style>
