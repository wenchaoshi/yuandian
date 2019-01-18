<!--  -->
<template>
  <div class="view" @touchmove="e.preventDefault()">
    <div class="card-box">
        <Swiper v-if="options.length > 0" :autoPlay='false'>
            <Slide>
                <span>
                    <canvas class="canvas00"></canvas>
                    <img :src="card0_img" width="100%" alt="">
                </span>
            </Slide>
            <Slide v-for="(item,index) in options" :key="index">
                <card-all :option="item" :detail="detail" :index="parseInt(index)+1" />
            </Slide>
        </Swiper>

        <div class="botInp">
            <button @click="botInp">分享名片</button>
        </div>
        <div class="shareMessage" v-show="shareMessage">
            <span>请长按名片进行操作！</span>
        </div>
    </div>
  </div>
</template>

<script>
import { Swiper, Slide } from 'vue-swiper-component';
import cardAll from './card-all.vue'
import options from './card-options.js'
let that;

export default {
  data () {
    return {
        options:options,
        card0_img:'',
        detail:{
            image_url:'aaaaaa',
            text:{
                company:'',
                name:'',
                job:'',
                phone:''
            },
            bg:{
                
            },
            wxCode:{
                src:''
            }
        },
        shareMessage:false
    };
  },

  components: {
      cardAll,
      Swiper,
      Slide
  },

  computed: {},

  created(){
      that=this;
  },

  mounted: function () { 
      /* 分享名片这一块。总共有8个，其中option里配置了7个，还有一个是之前的，添加在了开头。所以如果修改option的话，要注意顺序 */
      $('.load').addClass('active').text('正在加载...');
      this.getUser();
  },

  methods: {
      getUser(){
        if(this.global.mineDetail){
            this.detail=this.global.mineDetail;
            this.share_card_canvas();
        }else {
            this.request(
                "/wxemployee/employee/detail",
                {
                async: true,  //同步请求
                success(res) {
                    that.base.setCookie("mineDetail", res.detail);
                    that.global.mineDetail = res.detail;
                    that.detail = that.global.mineDetail;
                    that.share_card_canvas();
                    console.log("获取用户信息成功");
                    console.log(that.global.mineDetail);
                },
                error(res) {
                    console.log("获取用户信息失败");
                }
                }
            )
        }
      },
      botInp(){
        //   this.preViewImg();     //图片预览功能
        //   return;

          this.shareMessage=true;
          setTimeout(()=>{
              this.shareMessage=false;
          },900)
      },
      //预览图片
      preViewImg() {
        var base64=that.$store.state.card.card_imgs['img'+that.$store.state.card.cardIndex];
        base64=base64.substr(parseInt(base64.indexOf(','))+1);
        this.request('https://wx.yun.xuemei99.com/wxcompany/image/base',{
          data:{
            image_base:base64
          },
          type:'post',
          success(res){
            wx.previewImage({
                current: res.detail, // 当前显示图片的http链接
                urls:[res.detail] // 需要预览的图片http链接列表
            });
          },
          error(res){
            alert(a)
          }
        })
      },
      share_card_canvas(){
      //绘制名片
        let w=801,h=954;
        let detail=that.detail;
        let canvas=document.querySelector('.canvas00');
        canvas.width=w;
        canvas.height=h;
        let ctx=canvas.getContext('2d');
        
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle='#999';

        //填入背景图
        let bgImg=new Image();
        bgImg.setAttribute('crossOrigin','anonymous');
        bgImg.onload=function(){
            ctx.drawImage(bgImg, 0, 0, w, h);
            header_image();
        }
        bgImg.src='http://image.show.xuemei99.com/bg_code.png';

        function header_image(){
            //绘制圆形头像
            let img1=new Image();
            img1.setAttribute("crossOrigin",'anonymous');
            img1.width=150;
            img1.height=150;
            img1.onload=()=>{
                let img1_w=img1.width;
                let img1_h=img1.height;
                let x=567+img1_w/2;
                let y=96+img1_h/2;
                ctx.save();
                ctx.beginPath();

                ctx.arc(x,y,img1_w/2,0,2*Math.PI);
                ctx.clip();
                ctx.drawImage(img1,567,96,img1_w,img1_h);
                ctx.restore();
                ctx.save();

                wxCode();
            }
            img1.src=detail.image_url||'aaa';
        }

        function wxCode() { 
            //绘制二维码
            let img2=new Image();
            img2.setAttribute('crossOrigin','anonymous');
            img2.width=166;
            img2.height=161;
            img2.onload=()=>{
                let img2_w=img2.width;
                let img2_h=img2.height;
                let x=565+img2_w/2;
                let y=744+img2_h/2;
                ctx.save();
                ctx.beginPath();

                ctx.arc(x,y,img2_w/2,0,2*Math.PI);
                ctx.clip();
                ctx.drawImage(img2,565,744,img2_w,img2_h);
                ctx.restore();
                ctx.save();

                
                //绘制文字
                text();
                ctx.save();
                let img=canvas.toDataURL("image/jpeg", 1);
                that.card0_img=img;
                $('.load').removeClass('active');

                //存在$store中，用于图片预览
                //that.$store.state.card.card_imgs['img0']=img;
            }
            img2.src=detail.scene_image||'bbb';
        }

        function text() { 
            //绘制文字
            ctx.fillStyle='#fff';
            ctx.font="normal bolder 54px/54px 'Microsoft YaHei',Arial";
            ctx.fillText(detail.name||'张高丽',84,146);
            
            ctx.fillStyle='#C8C8CF';
            ctx.font="normal 100 36px/36px 'Microsoft YaHei',Arial";
            ctx.fillText(detail.position||'销售经理',84,210);

            ctx.fillStyle='rgba(200,200,207,1)';
            ctx.font="normal 100 36px/36px 'Microsoft YaHei',Arial";
            ctx.fillText(detail.shop_name||'上海伊莎美尔美容SPA会所',84,345);

            ctx.fillStyle='#656673';
            ctx.font="normal bolder 54px/54px 'Microsoft YaHei',Arial";
            ctx.fillText('了解一下',258,546);

            ctx.fillStyle='#999';
            ctx.font="normal 100 27px/27px 'Microsoft YaHei',Arial";
            ctx.fillText('长按识别查看名片',258,639);
        }

    }
  }
}

</script>
<style lang='stylus' scoped>
canvas 
    display none
.view 
    height 100%
    .card-box 
        padding-bottom calc(45px + 0.45rem)
        .card-content 
            margin-top 50px
            box-shadow 0 2px 8px rgba(11, 4, 46, 0.2)
            div 
                margin-bottom 20px

    .botInp 
        position fixed
        left 0
        bottom 0
        width 100%
        padding .15rem .2rem .3rem
        background #f1f1f1
        z-index 10
        button 
            width 100%
            height 45px
            line-height 45px
            font-weight 600
            border-radius 2px
            color #fff
            background #333333

.shareMessage 
    position fixed
    left calc(50% - 6em)
    top 50%
    line-height 1.8
    padding 3px 15px
    z-index 15
    color #fff
    background rgba(0,0,0,.7)
    border-radius 3px
</style>


<style lang="stylus">
.card-box
    .wh_content 
        padding-top 70px
        .wh_swiper
            align-items start
            .wh_slide span 
                display block
                padding 20px
                img 
                    box-shadow 0 2px 8px rgba(11, 4, 46, 0.2)
    .wh_indicator 
        position absolute
        top 30px
        left 20px
        width calc(100% - 40px)
        height 0
        display flex
        flex-direction row
        text-align center
        color #999999
        div.wh_indicator_item 
            flex 1
            width 30px
            height 0
            margin 0
            margin-left 13px
            .linH100 
                background #fff
                border-radius 50%
                max-height 50px
                max-width 50px
            &:nth-of-type(1)
                margin-left 0
                
            &.wh_show_bgcolor .linH100
                color #fff
                background #333
</style>
