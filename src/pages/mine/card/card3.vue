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
        phone:'13567837261'
      },
      bg:{
        src:'static/images/card3.png'
      },
      wxCode:{
        src:'static/images/wxCode.png'
      }
    }
    
    let option={
      text:{
        color:'#08544F',
        textAlign:'end',
        company:{
          x:167,
          y:169,
          fontSize:10
        },
        name:{
          x:315,
          y:92,
          fontSize:16
        },
        job:{
          x:315,
          y:113,
          fontSize:10
        },
        phone:{
          x:315,
          y:132,
          fontSize:10
        }
      },
      bg:{
        w:335,
        h:184,
        x:0,
        y:0
      },
      wxCode:{
        w:69,
        h:69,
        x:20,
        y:66
      },
      icon:{
        src:'static/images/card3-icon.png',
        w:14,
        h:14,
        x:230,
        y:121
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
          (function(){
            let icon= new Image();
            icon.setAttribute('crossOrigin','anonymous');
            icon.width=option.icon.w*n;
            icon.height=option.icon.h*n;
            icon.onload=function(){
              ctx.drawImage(icon,option.icon.x*n,option.icon.y*n,icon.width,icon.height);
              text();
            }
            icon.src=option.icon.src;
          })()
        }
        wxCode.src=detail.wxCode.src;

        
      }
      bgImg.src=detail.bg.src;

      function text(){
        ctx.fillStyle=option.text.color;
        ctx.textAlign='center';
        ctx.font="normal 500 "+option.text.company.fontSize*n+"px 'PingFangSC',Arial";
        ctx.fillText(detail.text.company,option.text.company.x*n,option.text.company.y*n);
        ctx.textAlign=option.text.textAlign;
        ctx.font="500 "+option.text.name.fontSize*n+"px 'Microsoft YaHei',Arial";
        ctx.fillText(detail.text.name,option.text.name.x*n,option.text.name.y*n);
        ctx.font="100 "+option.text.job.fontSize*n+"px 'Microsoft YaHei',Arial";
        ctx.fillText(detail.text.job,option.text.job.x*n,option.text.job.y*n);
        ctx.font="100 "+option.text.phone.fontSize*n+"px 'Microsoft YaHei',Arial";
        ctx.fillText(detail.text.phone,option.text.phone.x*n,option.text.phone.y*n);

        //画线
        ctx.beginPath();  //开始一个新路径
        ctx.moveTo(20*n,145*n);  //移到某个坐标，相当于开始路径
        ctx.lineTo(315*n,145*n);  //相当于结束路径
        ctx.strokeStyle='#08544F';
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