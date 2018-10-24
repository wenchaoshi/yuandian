<!-- 我的   页面 -->
<template>
<div id="page">
  <div class="view">
    <div class="mine-card">
      <div class="card-center">
        <span class="img-box fl"><img :src="mineDetail.image_url" alt=""></span>
        <div>
          <h2>{{mineDetail.name}}<small class="fr">{{permission}}</small></h2>
          <p>{{mineDetail.shop_name}}</p>
        </div>
      </div>
      <div class="card-main">
        <div class="edit" @click="navigator('/edit-card')"><span>编辑名片</span></div>
        <div class="share" @click="navigator('/card-box',false,mineDetail)"><span>分享名片</span></div>
      </div>
    </div>

    <div class="employee-manage" v-if="permissionId!=3" @click="navigator(permissionId==5?'/employee-manage':'/employee-all',permissionId)">
      <div><img src="../../images/employee_manage.png" alt=""></div>
      <div>
        <h3>员工管理</h3>
        <p>查看下属员工各项数据</p>
      </div>
    </div>

    <div class="mine-products">
      <ul class="clearfix">
        <li v-for="(item,index) in productList" :key="index" :data-index="index" :data-id='item.id' @click.stop='shade("productEdit",$event)'>
          <div>
            <span class="img-box"><img :src="item.image_url" alt=""><i v-show="!item.shelve"></i><b class="recommend" v-show="item.recommend">推荐</b></span>
            <h3>{{item.title}}</h3>
            <i>主打产品</i>
          </div>
        </li>
      </ul>
    </div>
  </div>


<!-- 分享名片1 -->
  <!-- <div class="mine-shade min-share" :class="share?'active':''" > 
      <div class="shade-content">
          <p>长按保存图片</p>
          <div class="share-box">
            <h2 :style="{padding:style30+'px'}">{{mineDetail.name}}</h2>
            <p>{{mineDetail.shop_name}}</p>
            <div class="img-box" :style="{marginTop:style30+'px'}"><img @click="preViewImg" :src="mineDetail.scene_image" alt=""></div>
            <p><small :style="small">长按识别查看名片</small></p>
          </div>
          <i @click.stop="hideShade" :style="i"></i>
      </div>
  </div> -->


<!-- 上下架弹窗 -->
  <div  @click.stop="hideShade" class="mine-shade product-edit" :class="productEdit?'active':''" > 
      <div class="shade-content">
          <ul>
            <li @click="setShelve">{{nowShelve==true?'下架':'上架'}}</li>
            <li @click="setCommend" v-show="nowShelve">{{recommendtext}}</li>
            <li>取消</li>
          </ul>
      </div>
  </div>




  <tab></tab>
</div>
</template>

<script>
// import getData from '@/js/getData.js'

var that;
export default {
  name:'mine',
  data() {
    return {
      share: false,
      productEdit: false,
      mineDetail: {},
      productList: [],
      nowIndex: 0,
      nowShelve: true,
      nowShelveId: 0,
      nowCommend: true,
      canvas_card:'',
      permissionId:0
    };
  },
  props: [],
  components: {},

  computed: {
    style30() {
      return $(window).height() * (30 / 667);
    },
    small() {
      return {
        margin: $(window).height() * (20 / 667) + "px"
      };
    },
    i() {
      return {
        marginTop: $(window).height() * (47 / 667) + "px"
      };
    },
    recommendtext() {
      if (this.productList.length > 0) {
        if (this.productList[this.nowIndex].recommend) {
          return "取消推荐";
        } else {
          return "推荐";
        }
      } else {
        return "";
      }
    },
    permission(){
      let permissionId=this.permissionId;
      if(this.permissionId==1){
        return '主管';
      }
      else if(this.permissionId==3){
        return '员工';
      }
      else if(this.permissionId==5){
        return '老板';
      }else {
        return ''
      }
    }
  },

  created() {
    that = this;
  },
  mounted: function() {
    this.getUser();
    let that = this;
    //获取员工商品列表
    this.getData(
      "/wxemployee/employee/product/list?shop=2013714&employee=2005503",
      {
        success(res) {
          that.productList = res.detail;
        },
        erro(res) {
          console.log("erro");
        }
      }
    );
    this.share_card_canvas();
  },

  methods: {
    getUser() {
      this.getData(
        "/wxemployee/employee/detail?shop=2013714&employee=2005503",
        {
          async: true,  //同步请求
          success(res) {
            that.base.setCookie("mineDetail", res.detail);
            that.global.mineDetail = res.detail;
            that.mineDetail = that.global.mineDetail;
            console.log("获取用户信息成功");
            console.log(that.global.mineDetail);
          },
          error(res) {
            console.log("获取用户信息失败");
          }
        }
      );
      this.getData('/wxapp/employee/permission?shop=2013714',{
        async: true,  //同步请求
        successtext:'',
        success(res) {
          that.permissionId=res.detail;
        },
        error(res) {

        }
      })
    },
    shade(target, event) {
      this[target] = true;
      if (target == "productEdit") {
        let index = event.currentTarget.dataset.index;
        this.nowIndex = index;
        this.nowShelveId = parseInt(this.productList[index].id);
        let shelve = this.productList[index].shelve || "";
        if (shelve) {
          this.nowShelve = true;
        } else if (shelve == false) {
          this.nowShelve = false;
        }
      }else if(target == "share"){
        //取消之前版本的弹出分享模态框

      }
    },
    hideShade() {
      this.share = false;
      this.productEdit = false;
    },
    navigator(target,permissionId,mineDetail){
      let permission=permissionId||'';
      let detail=mineDetail||'';
      this.$router.push({path:target,query:{'permission':permission,'detail':detail}})
    },
    setShelve() {
      //上下架 接口
      this.getData(
        "/wxemployee/employee/product/operate?shop=2013714&employee=2005503",
        {
          type: "post",
          data: {
            product: that.productList[that.nowIndex].id
          },
          success(res) {
            that.productList[that.nowIndex].shelve = !that.productList[
              that.nowIndex
            ].shelve;
          }
        }
      );
    },
    setCommend() {
      //推荐与取消推荐 接口
      this.getData(
        "/wxemployee/employee/product/recommend/operate?shop=2013714&employee=2005503",
        {
          type: "post",
          data: {
            id: that.productList[that.nowIndex].id
          },
          success(res) {
            that.productList[that.nowIndex].recommend = !that.productList[
              that.nowIndex
            ].recommend;
          }
        }
      );
    }
  }
};
</script>
<style lang='stylus'>
.mine-card
  margin 10px
  background #fff
  .card-center
    padding 20px
    .img-box
      width 50px
      height 50px
      margin-right 10px
      img
        width 100%
        height 100%
    div
      overflow hidden
      line-height 1
      h2
        margin-bottom 15px
        font-size 20px
        small
          font-size 14px
          line-height 1.2
      p
        color #999
  .card-main
    display flex
    width 100%
    line-height 45px
    text-align center
    border-top 1px solid #eee
    div
      flex 1
      width 50%
      span
        vertical-align middle
      &:before
        content ''
        display inline-block
        width 16px
        height 16px
        margin-right 10px
        vertical-align middle
        background url('../../images/icon_card_share.png') 0 / 100% 100%
      &:nth-of-type(1)
        border-right 1px solid #e7e7e7
        &:before
          background url('../../images/icon_card_edit.png') 0 / 100% 100%

.employee-manage 
  display flex
  width 3.55rem
  height .75rem 
  margin 10px auto 
  padding 12px .45rem
  background #fff
  border-radius 4px
  div 
    flex 1
    height 50px
    h3 
      margin: 3px 0 5px;
      color #333
      font-weight 600
    p 
      font-size 12px
      color #999

.mine-products
  background #fff
  ul li
    float left
    width 50%
    padding 10px
    text-align center
    &:nth-of-type(2n+1)
      padding-right 0
    div
      border 1px solid #eee
      .img-box
        display block
        width 100%
        height 100px
        border-bottom 1px solid #f4f4f4
        overflow hidden
        position relative
        img
          width 100%
          height auto !important
          max-height none
        i
          position absolute
          width 53px
          height 53px
          left calc(50% - 27px)
          top calc(50% - 27px)
          margin 0
          background-image url('../../images/icon_down.png')
        b.recommend
          display inline-block
          position absolute
          left 5px
          top 5px
          width 40px
          height 20px
          color #fff
          font-size 12px
          line-height 20px
          text-align center
          background url('http://image.show.xuemei99.com/show_share_card_bg.png') no-repeat 0 / 100% 100%
      h3
        margin 10px
        height 36px
        overflow hidden
        text-align left
        line-height 18px
        word-break break-all
      i
        display inline-block
        margin 5px 0 10px
        padding 1px 3px
        font-size 10px
        background url('../../images/img_product_label.png') 0 / 100% 100%
        color #fff
        font-style normal
// 分享窗口
.mine-shade
  position fixed
  left 0
  top 0
  z-index 100
  width 100%
  height 100%
  padding 0 10.7%
  color #fff
  background rgba(1, 2, 13, 0.5)
  display none
  .shade-content
    align-self center
    text-align center
    width 100%
    &.share-box-canvas img 
      width 100%
      max-height none
    .share-box
      max-height 380px
      margin-top 10px
      color #333
      background #ffffff
      #canvas 
        display none
      h2
        padding 30px 0
        font-size 20px
        font-weight bolder
      div.img-box
        margin 20px auto 0
        width 188px
        a
          display inline
        img
          width auto
          height 180px
          max-height 180px
      p
        color #999
        small
          display inline-block
          margin 20px 0
          font-size 12px
    i
      display inline-block
      width 55px
      height 55px
      margin-top 47px
      background url('../../images/btn_delete.png') 0 / 100% 100%
.mine-shade.product-edit
  padding 0
  .shade-content
    position absolute
    left 0
    bottom 0
    width 100%
    color #333
    background #fff
    li
      line-height 59px
      border-top 1px solid #eee
      &:nth-last-of-type(1)
        line-height 49px
.mine-shade.active
  display flex
.product-edit.active .shade-content
  animation 'toBot' 0.3s forwards ease-out
  -webkit-animation 'toBot' 0.3s forwards ease-out
@keyframes toBot
  0%
    bottom -100%
  100%
    bottom 0%
</style>