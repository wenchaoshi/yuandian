<!-- 海报获客 -->
<template>
  <div id="page">
      <div class="view">
          <div class="img-view">
              <div class="img-box"><img :src="viewImg" alt=""></div>
              <div class="menu">
                  <div @click="$router.go(-1)">
                      <img src="@/images/poster-icon1.png" alt="">
                      <p>更换海报</p>
                  </div>
                  <div @click="$router.push({path:'/poster-edit',query:{img:img,tab:0}})">
                      <img src="@/images/poster-icon2.png" alt="">
                      <p>编辑文字</p>
                  </div>
                  <div @click="$router.push({path:'/poster-edit',query:{img:img,tab:2}})">
                      <img src="@/images/poster-icon3.png" alt="">
                      <p>选择文案</p>
                  </div>
              </div>
          </div>
          <div class="button"><button @click.stop="posterImg">分享名片</button></div>
          <!-- <div class="poster-img-view" v-show="posterImgView"><div><img :src="$store.state.posterImg" alt=""></div></div> -->
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        img:''
    };
  },

  components: {},

  computed: {
      viewImg(){
          if(this.$store.state.posterImg!=''){
              return this.$store.state.posterImg
          }else {
              return this.img
          }
      }
  },

  mounted(){ 
      this.img=this.$route.query.img
      this.$nextTick(()=>{
          $('.img-box').height($(window).height()-($('.menu').outerHeight(true)+54+20))
      })
   },

  methods: {
      posterImg(){
          let posterImg=this.$store.state.posterImg;
          if(this.$store.state.posterImg==''){
              this.$message('请先编辑海报');
          }
          else {
              this.request('/wxcompany/image/base',{
                  type:'post',
                  data:{
                      image_base: posterImg
                  },
                  success(res){
                      console.log(res)
                      wx.previewImage({
                            current: res.detail, // 当前显示图片的http链接
                            urls: [res.detail] // 需要预览的图片http链接列表
                        });
                  }
              })
            //   this.posterImgView=true
          }
      }
  }
}

</script>
<style lang='stylus' scoped>
.poster-img-view 
    width 100%
    height 100%
    position fixed
    left 0
    top 0
    z-index 99
    display flex
    justify-content center
    align-items center
    background #000
    img 
        width 100%
        min-height none
.img-view 
    margin 10px auto
    text-align center
    img 
        max-width 100%
        max-height 100%
    .menu 
        margin 15px 30px
        display flex    
        div 
            flex 1
            text-align center
            color #777777
            img 
                width 56px
.button 
    text-align center
    button 
        width 335px
        height 44px
        background #398FFF
        color #fff
        border-radius 6px
        font-size 16px
        a 
            color inherit !important
</style>