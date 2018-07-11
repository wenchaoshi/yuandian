<!-- 编辑名片 -->
<template>
  <div id="page">
      <div class="view edit-card">
          <div class="head-portrait">
              <img src="" alt="">
              <span>更换头像</span>
          </div>
          <div class="information-card">
              <h2>张高丽<small class="tel fr">136555555</small></h2>
              <p class="job">美容师</p>
              <p class="site">上海还上海还上海还上海还</p>
          </div>
          <div class="edit-lists">
              <p class="textcenter">详细信息</p>
              <ul>
                  <li>微信号</li>
                  <li>微信号</li>
              </ul>
          </div>

          <div class="save-btn">
              <button>完成</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: function () {  },

  methods: {}
}

</script>
<style lang='stylus'>
.edit-card 
  height calc(100% - 75px)
.head-portrait
  position relative
  height 260px
  background #f00
  span 
    position absolute
    left calc(50% - 50px)
    top calc(50% - 18px)
    display inline-block
    width 100px
    height 36px
    line-height 36px
    border-radius 100px
    text-align center
    color #fff
    background rgba(0,0,0,.7)

.information-card
  position relative 
  z-index 2
  width 315px
  margin 0 auto
  margin-top -40px
  padding 20px
  background #fff
  border-radius 3px
  h2 
    margin-bottom 10px 
    font-size 20px
    font-weight bold
    small 
      font-size 14px
  .site 
    margin 20px 0  
    color #333

.edit-lists
  margin-top 30px
  &>p
    margin-bottom 20px
    text-align center
    font-size 16px
  ul 
    width 3.55rem
    height 120px
    padding 0 20px
    margin 0 auto
    border-radius 2px
    background #fff
    color #999
    li 
      padding 20px 0
      border-bottom 1px solid #eee

.save-btn 
  position fixed
  left 0
  bottom 0
  width 100%
  padding 15px
  background #fff
  button 
    display inline-block
    background #42403E
    border-radius 2px
    width 100%
    height 45px
    color #fff
</style>