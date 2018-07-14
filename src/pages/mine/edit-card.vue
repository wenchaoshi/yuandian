<!-- 编辑名片 -->
<template>
  <div id="page">
      <div class="view edit-card">
        <form class="form-edit" enctype="multipart/form-data" role="form" id="form-edit">
          <div class="head-portrait">
              <img :src="imgUrl" alt="" id="img-view">
              <input style="display:none" type="file"  accept="image/*"  id="upImg" @change="upImg">
              <label for="upImg"><span>更换头像</span></label>
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
        </form>
      </div>
  </div>
</template>

<script>
import uploadImg from "@/js/uploadImg.js";
export default {
  data() {
    return {
      imgUrl: ""
    };
  },

  components: {},

  computed: {},

  mounted: function() {},

  methods: {
    upImg() {
      var options = {
        path: "/", // 上传图片时指定的地址路径，类似form变淡的action属性
        onSuccess: function(res) {
          // 上传成功后执行的方法，res是接收的ajax响应内容
          console.log(res);
        },
        onFailure: function(res) {
          // 上传失败后执行的方法，res是接收的ajax响应内容
          console.log(res);
        }
      };
      // 执行生成图片上传插件的方法, 第一个参数是上面提到的准备生成组件的div选择器，第二个参数是设置的组件信息，执行方法后返回一个函数指针，指向执行上传功能的函数，通过把执行上传功能的函数暴露出来，用户就可以自己控制何时上传图片了。
      var upload = uploadImg.tinyImgUpload(this, "upImg", options);
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
    display block
    background #42403E
    border-radius 2px
    width 100%
    height 45px
    color #fff
</style>