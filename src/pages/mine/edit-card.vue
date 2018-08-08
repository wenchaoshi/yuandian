<!-- 编辑名片 -->
<template>
  <div id="page">
      <div class="view edit-card">
          <div class="head-portrait">
              <a :href="mineDetail.image_url" :download="mineDetail.name"><img :src="mineDetail.image_url" alt="" id="img-view"></a>
              <input style="display:none" type="file"  accept="image/*" id="upImg" @change="upImg($event)">
              <label for="upImg"><span>更换头像</span></label>
          </div>
          <div class="information-card">
              <h2>{{mineDetail.name}}<small class="tel fr">{{mineDetail.phone}}</small></h2>
              <p class="job">{{mineDetail.position}}</p>
              <p class="shop-name">{{mineDetail.shop_name}}</p>
          </div>
          <div class="edit-lists">
              <p class="textcenter"><span>详细信息</span></p>
              <ul>
                  <li class="clearfix"><span>微信号</span><input type="text" id="wx_number" v-model="mineDetail.wx_number" placeholder="请输入微信号"></li>
                  <li class="clearfix"><span>个人描述</span><input type="text" id="desc" v-model="mineDetail.desc" placeholder="请输入个人描述"></li>
              </ul>
          </div>

          <div class="save-btn">
              <button @click="submit">完成</button>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      mineDetail:{}
    };
  },

  components: {},

  computed: {},

  mounted: function() {
    
    if(this.global.mineDetail){
      this.mineDetail=this.global.mineDetail;
    }else{
      this.getUser();
    }
  
  },

  methods: {
    getUser(){
      let that=this;
      that.getData('/wxemployee/employee/detail?shop=2013714&employee=2005503',{
        successtext:'加载成功',
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
    },
    submit(){
      let that=this;
      that.getData('/wxemployee/employee/detail?shop=2013714&employee=2005503',{
        type:'POST',
        data:{
          image:that.mineDetail.image_url,
          wx_number:that.mineDetail.wx_number,
          desc:that.mineDetail.desc
        },
        successtext:'更新信息成功',
        success(res){
          // that.getUser();
          that.$router.go(-1)
        },
        error:function(res){

        }
      })
    },

    upImg(e){
      this.base.uploadImg(e,(res)=>{
        console.log(res)
        this.mineDetail.image_url = res.path;
      })
    }
    
  }
};
</script>

<style lang='stylus'>
.view.edit-card
  height calc(100% - 75px)
.head-portrait
  position relative
  width 100%
  max-height 260px
  overflow hidden
  text-align center
  a
    display inline
  img
    max-height 100%
    width 100%
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
  box-shadow 0 0 10px rgba(138, 136, 136, 0.59)
  h2
    margin-bottom 10px
    font-size 20px
    font-weight bold
    small
      font-size 14px
  .shop-name
    margin 20px 0
    color #999
.edit-lists
  margin-top 30px
  &>p
    margin-bottom 20px
    text-align center
    font-size 16px
    font-weight 600
    &:before
      display block
      line-height 1
      position relative
      content "DETAILED"
      font-size 24px
      opacity .1
      letter-spacing 0
      font-weight 400
    span 
      line-height 1
      position relative
      top -16px
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
      span 
        width 5em
        float left
        line-height 20px
      input
        float left
        width calc(100% - 5em)
        border none
        line-height 20px
      
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