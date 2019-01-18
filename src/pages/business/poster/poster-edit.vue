<!-- 海报获客 -->
<template>
  <div id="page" @click="pageClick">
      <div class="view">
          <div class="img-view">
              <span>
                  <img :src="img" alt="" class="bg">
                  <div 
                  @click.stop="draftingFocus=true"
                  @touchstart="tStart($event)"
                  @touchmove="tMove($event)"
                  @touchend="tEnd($event)"
                  :class="draftingFocus?'borderShow':''"
                  :style="{
                    'color': colorList[idata.colorIndex],
                    'font-size': sizeList[idata.sizeIndex]+'px',
                    'font-family': fontList[idata.fontIndex],
                    'font-weight': idata.fontWeight?'bolder':'normal',
                    'text-shadow': idata.shadow?'0px 1px 1px rgba(104,104,104,1)':'',
                    'left':idata.left+'px',
                    'top':idata.top+'px'
                    }"
                    ><p v-for="(item, index) in viewText" :key="index">{{item}}</p></div>
                    <img :src="global.mineDetail.scene_image" class="qrcode" alt="">
              </span>
          </div>
          <div class="control">
              <div class="inp" @click.stop="">
                  <textarea v-model="idata.text" @focus="focus" @blur="blur"></textarea>
                  <button @click.stop="createImg">{{!tabShow?'确定':'完成'}}</button>
              </div>
              <div class="tab-list" v-show="tab==0&&tabShow">
                  <div class="set-color">
                      <div class="l">
                          <span>颜色</span>
                      </div>
                      <div class="r">
                          <span v-for="(item, index) in colorList" :key="index" :class="idata.colorIndex==index?'active':''" @click="changIndex('colorIndex',index)"><i :style="{'background-color':item}"></i></span>
                      </div>
                  </div>
                  <div class="set-size">
                      <div class="l">
                          <span>大小</span>
                      </div>
                      <div class="r">
                          <span v-for="(item, index) in sizeList" :key="index" :class="idata.sizeIndex==index?'active':''" @click="changIndex('sizeIndex',index)">{{item}}</span>
                      </div>
                  </div>
              </div>
              <div class="tab-list"  v-show="tab==1&&tabShow">
                <div class="set-font">
                    <div :class="idata.fontIndex==index?'active':''" v-for="(item, index) in fontList" :key="index" :style="{'font-family':item}"><span @click="changIndex('fontIndex',index)">字体</span></div>
                </div>
                <div class="set-style">
                    <div>
                        <el-switch
                            v-model="idata.fontWeight"
                            inactive-text="粗体">
                        </el-switch>
                    </div>
                    <div>
                        <el-switch
                            v-model="idata.shadow"
                            inactive-text="阴影">
                        </el-switch>
                    </div>
                </div>
              </div>
              <div class="tab-list"  v-show="tab==2&&tabShow">
                  <ul class="ul-list" @click="setText($event)">
                      <li v-for="(item, index) in shortmsg" :key="index">{{ item }}</li>
                  </ul>
              </div>
              <div class="control-tab" v-show="tabShow">
                  <div :class="tab==index?'active':''" v-for="(item, index) in tabArr" :key="index" @click="changeTab(index)"><span>{{item}}</span></div>
              </div>
          </div>
          <canvas id="createImg" style="display:none"></canvas>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        tab:0,
        tabShow:true,
        img:'',
        tabArr:['颜色大小','文字样式','文案短语'],
        value3:true,
        colorList: ['#F2F2F2','#333333','#E75E58','#F5C543','#57BE6A','#4FABF8','#6467E7'],
        sizeList: [18,20,22,24,26,28,30],
        fontList:['微软雅黑','庞门正道标题体','站酷快乐体2016修订版','站酷酷黑'],
        shortmsg:[],
        idata:{
            text:'',
            colorIndex: 0,
            sizeIndex:0,
            fontIndex:0,
            fontWeight:false,
            shadow:false,
            left:0,
            top:0
        },
        draftingFocus:false,
        offsetLeft:0,
        offsetTop:0,
        touchData:{
            x:0,
            y:0,
            moveX:0,
            moveY:0
        },
    };
  },

  components: {},
  
  watch:{
      tab(){
          this.setImgViewHeight()
      },
      "touchData.moveX"(val,oldval){
          let left = this.offsetLeft+(this.touchData.moveX-this.touchData.x);
          let w=$('.img-view span').width()-$('.img-view span div').outerWidth()
          if(left<=0){
              this.idata.left=0
          }else if(left>=w){
              this.idata.left=w
          }else{
              this.idata.left=left
          }
      },
      "touchData.moveY"(val,oldval){
          let top = this.offsetTop+(this.touchData.moveY-this.touchData.y);
          let h=$('.img-view span').height()-$('.img-view span div').outerHeight()
          if(top<=0){
              this.idata.top=0
          }else if(top>=h){
              this.idata.top=h
          }else{
              this.idata.top=top
          }
      }
  },

  computed: {
      viewText(){
          let text=this.idata.text;
            text=text.split('\n'); 
            return text;
      }
  },

  mounted () { 
      this.tab=this.$route.query.tab
      this.img=this.$route.query.img
      this.setImgViewHeight()
      this.getShortmsg()
      if($('img.bg').height()){
          $('.img-view span').width($('img.bg').width());
          $('.img-view span').height($('img.bg').height());
      }else {
          $('img.bg').on('load',()=>{
            $('.img-view span').width($('img.bg').width());
            $('.img-view span').height($('img.bg').height());
        })
      }
   },

  methods: {
      setImgViewHeight(){
          this.$nextTick(()=>{
              $('.img-view').css('height',$(window).height()-$('.control').height())
          })
      },
      getShortmsg(){
          let that=this
          this.request('/wxcompany/source/piclist/api?tag=shortmsg',{
              success(res){
                  that.shortmsg=res.detail
              }
          })
      },
      setText(e){
          if(e.target.nodeName=='LI'){
              this.idata.text=e.target.innerText
          }
      },
      changIndex(obj,index){
          this.idata[obj]=index
      },
      changeTab(index){
          this.tab=index
      },
      tStart(e){
          this.draftingFocus=true
          this.tabShow=true
          this.touchData.x=e.targetTouches[0].pageX
          this.touchData.y=e.targetTouches[0].pageY

          let el=document.querySelector('.img-view span div')
          this.offsetLeft=el.offsetLeft
          this.offsetTop=el.offsetTop
      },
      tMove(e){
          this.touchData.moveX=e.targetTouches[0].pageX
          this.touchData.moveY=e.targetTouches[0].pageY
      },
      tEnd(e){
          this.draftingFocus=false
        //   let el=document.querySelector('.img-view span div')
        //   this.offsetLeft=el.offsetLeft
        //   this.offsetTop=el.offsetTop
      },
      focus(){
          this.tabShow=false
        $('.img-view').addClass('inp-focus')
      },
      blur(){
          $('.img-view').removeClass('inp-focus')
      },
      pageClick(){
        this.draftingFocus=false
        this.tabShow=true
      },
      createImg(){
          if(!this.tabShow){
              this.tabShow=true
              return
          }
          let img=new Image();
          img.setAttribute('crossOrigin','anonymous')
          let canvas=document.querySelector('#createImg');
          let ctx=canvas.getContext('2d');
          img.onload=()=>{
              canvas.width=img.width;
              canvas.height=img.height;
              ctx.clearRect(0, 0, img.width, img.height);
              let M=canvas.width/document.querySelector('.img-view span .bg').width;
              ctx.drawImage(img,0,0,img.width,img.height);

              let qrcode=new Image();
              qrcode.setAttribute('crossOrigin','anonymous')
              qrcode.onload=()=>{
                  let qrcodeEl=document.querySelector('.img-view span .qrcode');
                  let qrcodeW=qrcodeEl.width*M
                  let qrcodeH=qrcodeEl.height*M
                  ctx.drawImage(qrcode, canvas.width-qrcodeW, canvas.height-qrcodeH, qrcodeW, qrcodeH)

                  if(this.idata.shadow){
                    // 设置文字阴影的颜色为黑色，透明度为20%
                    ctx.shadowColor = 'rgba(104,104,104,1)';
                    // 将阴影向右移动15px，向上移动10px
                    ctx.shadowOffsetX = 0*M;
                    ctx.shadowOffsetY = 1*M;
                    // 轻微模糊阴影
                    ctx.shadowBlur = 1*M;
                  }
                  


                  ctx.textAlign='left';
                  ctx.textBaseline='top'
                  ctx.fillStyle= this.colorList[this.idata.colorIndex];
                  let fontSize=this.sizeList[this.idata.sizeIndex]
                  ctx.font="normal "+(this.idata.fontWeight?'bolder ':'normal ')+fontSize*M+"px/"+fontSize*1.6*M+"px "+this.fontList[this.idata.fontIndex]
                  //   "normal bolder 54px/54px 'Microsoft YaHei',Arial";
                //   let text=this.idata.text;
                //   text=text.split('\n');  //textarea中的换行会转义成\n
                //   console.log(text)
                  this.viewText.forEach((item,index) => {
                      ctx.fillText(item,(this.idata.left+20)*M,(this.idata.top+10)*M+(index*fontSize*1.6*M));
                  });
                  
                  this.$store.state.posterImg=canvas.toDataURL("image/png", 1)
                  this.$router.go(-1)
              }
              qrcode.src=this.global.mineDetail.scene_image;
          }
          img.src=this.img
      }
  }
}

</script>
<style lang="stylus">
</style>

<style lang='stylus' scoped>
.img-view 
    position absolute
    top 0
    left 0
    width 100%
    margin 0 auto 0
    padding 10px 0
    text-align center
    overflow-y auto
    &.inp-focus
        top auto
        bottom 45px
    span 
        display inline-block
        position relative
        height 100%
    img.bg 
        width auto
        height 100%
    img.qrcode 
        width 60px
        height auto
        position absolute
        right 0
        bottom 0
    div 
        position absolute
        left 0
        top 0
        z-index 10
        text-align initial
        padding 10px 20px
        border 1px dotted transparent
        font-family 'zhankukuaileti'
        max-width 100%
    .borderShow 
        border 1px dotted 
.control
    position absolute
    bottom 0
    left 0
    width 100%
    background #fff
    z-index 99
    .tab-list 
        font-size 12px
    .control-tab 
        display flex
        text-align center
        line-height 40px
        &>div 
            flex 1
            span 
                display inline-block
                padding 2px 5px 0
                border-bottom 2px solid transparent
                font-weight 500
            &.active span 
                border-bottom-color #398FFF
    .inp 
        padding 5px 10px
        textarea 
            width calc(100% - 60px)
            height 34px
            padding 10px 15px 0
            background #EFF2F4
            border-radius 6px
            border none
        button 
            width 50px
            height 30px
            border-radius 6px
            color #fff
            background #398FFF
    .set-font 
        display flex     
        padding 10px 0 10px   
        text-align center
        div 
            flex 1
            span    
                display inline-block
                border-bottom 1px solid transparent
                line-height 1.8
            &.active span
                border-bottom-color #398fff
    .set-style 
        display flex
        padding  20px 30px
        text-align center
        &>div 
            flex 1
        .el-switch__label.is-active 
            color #777777
    .set-color, .set-size 
        display flex
        padding 10px 20px
        .l 
            padding-right 20px
            color #777777
            span    
                display inline-block
                vertical-align middle
        .r 
            flex 1
            display flex
            justify-content space-between
            span 
                display inline-block
                padding 5px
                float left 
                vertical-align middle
                color #777777
                border-radius 6px
    .set-color 
        .r 
            span 
                position relative
                width 24px
                height 24px
                padding 4px
                background #fff
                border-radius 50%
                border 1px solid #EAEAEA
                i 
                    display inline-block
                    width 100%
                    height 100%
                    border-radius 50%
                    background #f00
                &:after 
                    content ""
                    display none
                    position absolute
                    left -2px
                    top -2px
                    width 26px
                    height 26px
                    border-radius 50%
                    border 1px solid #AAAAAA
                &.active:after 
                    display block
                    
    .set-size 
        .r 
            span 
                &.active 
                    background #398FFF
                    color #fff
    .ul-list 
        line-height 44px
        padding 0 15px
        color #777777
        font-size 14px
        border-top 1px solid #E6E6E6
        border-bottom 1px solid #E6E6E6
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        height 178px
        overflow-y auto
            
</style>
<style lang="stylus">
@font-face
    font-family "庞门正道标题体"
    src url('https://style.qnssl.xuemei99.com/pangmenzhengdaobiaotiti.ttf')
@font-face
    font-family "站酷快乐体2016修订版"
    src url('https://style.qnssl.xuemei99.com/zhankukuaileti.ttf')
@font-face
    font-family "站酷酷黑"
    src url('https://style.qnssl.xuemei99.com/zhankukuhei.ttf')
.set-style 
    .el-switch__label.is-active 
        color #777777
</style>
