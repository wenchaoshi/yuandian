<!--  -->
<template>
  <span>
      <canvas></canvas>
      <img :src="card_img" alt="">
  </span>
</template>

<script>
let that;
export default {
  data () {
    return {
      card_img:''
    };
  },

  components: {},

  computed: {},

  mounted: function () { 
    that=this;
    let detail={
      text:{
        company:'成都学妹科技有限责任公司',
        name:'张丽丽',
        job:'销售经理',
        phone:'137000000'
      },
      bg:{
        src:'static/images/card1.png'
      },
      wxCode:{
        src:'static/images/wxCode.png'
      },
      phoneIcon:{
        src:'static/images/wxCode.png'
      }
    }
    
    let option={
      text:{
        color:'#fff',
        textAlign:'end',
        company:{
          x:315,
          y:37,
          fontSize:14
        },
        name:{
          x:315,
          y:137,
          fontSize:14
        },
        job:{
          x:315,
          y:153,
          fontSize:10
        },
        phone:{
          x:0,
          y:0,
          fontSize:14
        }
      },
      bg:{
        w:335,
        h:184,
        x:0,
        y:0
      },
      wxCode:{
        w:68,
        h:68,
        x:28,
        y:58
      }
    }

    this.canvas(option,detail);
  },

  methods: {
    canvas(option,detail){
      let n=5;
      let w=option.bg.w*n;
      let h=option.bg.h*n;
      let canvas=document.querySelector('canvas');
      let ctx=canvas.getContext('2d');
      canvas.width=w;
      canvas.height=h;
      ctx.clearRect(0, 0, w, h);
      let bgImg=new Image();
      bgImg.setAttribute('crossOrigin','anonymous');
      bgImg.width=w;
      bgImg.height=h;
      bgImg.onload=function(){
        ctx.drawImage(bgImg,0,0,w,h);
        let wxCode=new Image();
        wxCode.setAttribute('crossOrigin','anonymous');
        wxCode.width=option.wxCode.w*n;
        wxCode.height=option.wxCode.h*n;
        wxCode.onload=function(){
          ctx.drawImage(wxCode,option.wxCode.x*n,option.wxCode.y*n,wxCode.width,wxCode.height);
          text();
        }
        wxCode.src=detail.wxCode.src;

        
      }
      bgImg.src=detail.bg.src;

      function text(){
        ctx.fillStyle=option.text.color;
        ctx.textAlign=option.text.textAlign;
        ctx.font="normal 500 "+14*n+"px 'PingFangSC',Arial";
        ctx.fillText(detail.text.company,option.text.company.x*n,option.text.company.y*n);
        ctx.fillText(detail.text.name,option.text.name.x*n,option.text.name.y*n);
        ctx.fillStyle='#f5f5f5';
        ctx.font="100 "+10*n+"px 'Microsoft YaHei',Arial";
        ctx.fillText(detail.text.job,option.text.job.x*n,option.text.job.y*n);

        //画线
        ctx.beginPath();  //开始一个新路径
        ctx.moveTo(206*n,162*n);  //移到某个坐标，相当于开始路径
        ctx.lineTo(355*n,162*n);  //相当于结束路径
        ctx.strokeStyle='rgba(255,255,255,.4)';
        ctx.stroke();
        that.card_img=canvas.toDataURL();
      }
    }
  }
}

</script>
<style lang='stylus'>
canvas 
  vertical-align middle
  display none
</style>