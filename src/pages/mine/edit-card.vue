<!-- 编辑名片 -->
<template>
  <div id="page">
      <div class="view edit-card">
          <div class="head-portrait">
              <img :src="mineDetail.image_url" alt="" id="img-view">
              <input style="display:none" type="file"  accept="image/*" id="upImg" @change="upImg">
              <label for="upImg"><span>更换头像</span></label>
          </div>
          <div class="information-card">
              <h2>{{mineDetail.name}}<small class="tel fr">{{mineDetail.phone}}</small></h2>
              <p class="job">{{mineDetail.position}}</p>
              <p class="site">{{mineDetail.address}}</p>
          </div>
          <div class="edit-lists">
              <p class="textcenter">详细信息</p>
              <ul>
                  <li><input type="text" id="wx_number" v-model="mineDetail.wx_number" placeholder="微信号"></li>
                  <li><input type="text" id="desc" v-model="mineDetail.desc" placeholder="个人描述"></li>
              </ul>
          </div>

          <div class="save-btn">
              <button @click="submit">完成</button>
          </div>
      </div>
  </div>
</template>

<script>
import uploadImg from "@/js/uploadImg.js";


export default {
  data() {
    return {
      mineDetail:{}
    };
  },

  components: {},

  computed: {},

  mounted: function() {
    this.mineDetail=this.global.mineDetail;
  },

  methods: {

    upImg(){
      var options={
        path:'https://wx.yun.xuemei99.com/wxemployee/employee/detail?shop=2013714&employee=2005503',
        onSuccess(res){

        },
        onFailure(res){

        }
      }
      var upload = new uploadImg.tinyImgUpload(this, "upImg",options);
      upload.uploadImg()
    },

    submit(){
      let that=this;
      that.getData('/wxemployee/employee/detail?shop=2013714&employee=2005503',{
        type:'POST',
        data:{
          wx_number:that.mineDetail.wx_number,
          desc:that.mineDetail.desc
        },
        success(res){
          (()=>{
            that.getData('/wxemployee/employee/detail?shop=2013714&employee=2005503',{
              success(res){
                that.global.mineDetail=res.detail;  //全局变量
                that.mineDetail=that.global.mineDetail;  //当前页面数据
                console.log('获取用户信息成功')
                console.log(that.global.mineDetail)
              },
              erro(res){
                console.log('获取用户信息失败')
              }
            })
          })()
        },
        error:function(res){

        }
      })
    }
    
  }
};
</script>

<style lang='stylus'>
.edit-card
  height calc(100% - 75px)
.head-portrait
  position relative
  width 100%
  height 260px
  overflow hidden
  background #f00
  text-align center
  img
    max-height 100%
    height 100%
    max-width none
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
    background rgba(0, 0, 0, 0.7)
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
    margin 0 auto 30px
    border-radius 2px
    background #fff
    color #999
    li input
      width 100%
      padding 20px 0
      border none
      border-bottom 1px solid #eee
.save-btn
  position fixed
  left 0
  bottom 0
  width 100%
  padding 15px
  background #fff
  button
    display block
    background #42403E
    border-radius 2px
    width 100%
    height 45px
    color #fff
</style>