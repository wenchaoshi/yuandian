<!-- 客户详情 -->
<template>
  <div id="page" @click="cancle">
    <div class="view customerDetail" @scroll.passive='onScroll' >
      <div class="customerDetail-scrollView">
          <div class="customerDetail-card">
            <div class="customerDetail-information" @click.stop='navigator("/customer-infomation")'>
              <span class="fl"><img src="" alt=""></span>
              <h2>王梅呀  <small class="fr">客户资料</small></h2>
              <div class="clearfix"></div>
            </div>
            <div class="customerDetail-tag">
              <span v-for='items in 3' :key='items'>购买力强</span>
              <span @click.stop="setClass('addTag')">+ 标签</span>
            </div>
          </div>
          <div class="customerDetail-action">
            <div class="customerDetail-action-list">
              <div>预计成交率</div>
              <div class="customerDetail-action-data"><strong>80%</strong></div>
            </div>
            <div class="customerDetail-action-list" @click.stop="setClass('evolve')">
              <div>实际跟进进度</div>
              <div class="customerDetail-action-data"><strong>—</strong></div>
            </div>
          </div>


          <div class="customerDetail-tab">
            <div :class="onTop?'on-top':''">
              <div class="customerDetail-tab-nav" >
                <router-link to="/customer-detail/customer-tab1" tag="div"><span>互动跟进</span></router-link>
                <router-link to="/customer-detail/customer-tab2" tag="div"><span>客户分析</span></router-link>
              </div>
            </div>
            <div class="customerDetail-tab-view">
              <router-view></router-view>
            </div>
          </div>
      </div>
    </div>
    
    <div class="fixBot">
      <div class="fixBot-list1"><img src="../../images/icon_phone.png" alt="">打电话</div>
      <div class="fixBot-list2"><img src="../../images/icon_chat.png" alt="">发信息</div>
    </div>

<!-- 添加标签 -->
  <div class="shade addtag" :class="addTag?'active':''"> 
      <div class="shade-content" @click.stop="stop">
          <div class="tag-main">
            <p>添加标签</p>
            <ul>
              <li class="active">购买意向强</li>
              <li>购买意向强</li>
              <li>购买意向强</li>
              <li>购买意向强</li>
              <li>购买意向强</li>
            </ul>
          </div>
          <div class="main">
            <div class="cancle" @click='cancle'>取消</div>
            <div class="save">保存</div>
          </div>
      </div>
  </div>

  <div class="shade evolve" :class="evolve?'active':''"> 
      <div class="shade-content" @click.stop="stop">
          <ul class="">
            <li>20%</li>
            <li>40%</li>
            <li>60%</li>
            <li>80%</li>
            <li>成交</li>
            <li>无法签单</li>
            <li @click='cancle'>取消</li>
          </ul>
      </div>
  </div>


<div class="shade follow" > 
      <div class="shade-content" @click.stop="stop">
          <div class="tag-main">
            <p>添加跟进</p>
            <div>
              <textarea name="" id="" placeholder="输入跟进内容"></textarea>
            </div>
          </div>
          <div class="main">
            <div class="cancle" @click='cancle'>取消</div>
            <div class="save">保存</div>
          </div>
      </div>
  </div>



  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      onTop:false,
      offsettop:0,
      addTag:false,
      evolve:false
    };
  },

  components: {
  },

  computed: {},

  mounted: function () {
      let obj=$('.customerDetail-tab');
      this.offsettop=obj.offset().top;
  },

  methods: {
    onScroll(e){
      let that=this;
      let offsettop=that.offsettop
      let scrollTop=e.target.scrollTop;

      if(scrollTop>offsettop){
        that.onTop=true
      }
      else{
        that.onTop=false
      }
     
    },
    navigator(path){
      this.$router.push({path:path})
    },
    setClass(target){
      this[target]=!this[target]
    },
    stop(){

    },
    cancle(){
      this.addTag=false
      this.evolve=false
      if($('.follow').length){$('.follow').removeClass('active')

      }
      
    }
  }
}

</script>
<style lang='stylus'>
.view.customerDetail
  background #fff
  overflow auto
.customerDetail-scrollView
  overflow auto
.customerDetail-card 
  width 3.55rem
  height 1.3rem
  margin 0.1rem auto
  background url('../../images/customerDetail-card.png') no-repeat 0/100% 100%
  .customerDetail-information 
    padding .2rem
    color #fff
    *
     cursor pointer
    span 
      width .5rem
      height .5rem
      background  #000
      img 
        width 100%
        height 100%
    h2 
      padding-left .1rem
      line-height .5rem
      font-weight bolder
      font-size .16rem
      overflow hidden
      small 
        color #bbb
        font-weight 100
        font-size .12rem
        &:after
          content ""
          display inline-block
          width .07rem
          height .16rem
          margin-left .06rem
          vertical-align sub
          background url(../../images/Triangle_3.png) 0/100% no-repeat
  .customerDetail-tag
    padding 0 .2rem
    span 
      margin-right .1rem
      padding 4px .07rem
      color #fff
      border 1px solid
      border-radius 2px
      font-size 10px
      cursor pointer


.customerDetail-action 
  display flex
  padding  20px
  text-align center
  font-size 12px
  position relative
  &:after
    display: block
    position: absolute
    left: 50%
    top: calc(50% - 15px)
    width: 0
    height: 30px
    border-left: 1px solid #D8D8D8
    content: ' '

  &>div 
    flex 1
    strong 
      display inline-block
      font-size 20px
      line-height 1.8em
      font-weight 400

.on-top 
  height 0.5rem
  .customerDetail-tab-nav
    position fixed
    top 0
    left 0
    z-index 10
    width 100%

.customerDetail-tab-nav
  display flex
  border 1px solid #eee
  border-left none
  border-right none
  text-align center
  height 0.5rem
  background #fff
  
  &>div
    flex 1
    line-height 48px
    span 
      display inline-block
      position relative
.customerDetail-tab-nav .router-link-active span 
  &:before
    content ""
    display inline-block
    width 70%
    height 2px
    position absolute
    left 15%
    bottom 0
    border-radius 1px
    background #000
  &:after 
    content ""
    display inline-block
    width 0
    height 0
    margin-left 4px
    margin-bottom -3px
    border 6px solid transparent
    border-top-color #333
    vertical-align middle

.fixBot 
  display flex
  position fixed
  bottom 0
  left 0
  z-index 10
  width 100%
  height 50px
  line-height 50px
  text-align center
  color #fff
  &>div
    flex 1
  .fixBot-list1
    background #4F4F5C
  .fixBot-list2
    background #25B181
  img 
    width 26px
    height auto 
    vertical-align middle
    margin-right 10px


//添加标签
.shade
  position fixed
  left 0
  top 0
  z-index 15
  width 100%
  height 100%
  background rgba(1,2,13,0.5)
  display none
  &.active 
    display block
    .shade-content
      animation 'addTag' .6s ease-out forwards

.shade-content 
  position absolute
  left 0
  bottom 0
  width 100%
  height 222px
  padding 20px 20px 0
  background #fff
  .tag-main 
    ul li 
      float left
      margin 10px 10px 0 0
      padding 6px 10px
      background #D8D8D8
      border-radius 1px
      font-size 12px
      &.active 
        color #fff
        background #333
  .main 
    position absolute
    left 0
    bottom 0
    width 100%
    display flex
    line-height 50px
    text-align center
    border-top 1px solid #eee
    div
      flex 1
      &.save 
        background #333
        color #fff


.shade.evolve
  .shade-content
    height 415px
    padding 0
    li 
      text-align center
      line-height 60px
      border-bottom 1px solid #eee
      &:nth-last-of-type(1)
        line-height 50px

.shade.follow 
  textarea 
    width 100%
    height 100px
    border 1px solid #eeeeee
    border-radius 1px
    padding 10px
    margin-top 10px

@keyframes addTag {
  0% {
    bottom -100%
  }
  100% {
    bottom 0%
  }
}
</style>