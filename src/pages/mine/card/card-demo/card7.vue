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
        src:'static/images/card7.png'
      },
      wxCode:{
        src:'static/images/wxCode.png'
      }
    }
    
    let option={
      text:{
        color:'#fff',
        textAlign:'start',
        company:{
          x:185,
          y:170,
          fontSize:11
        },
        name:{
          x:20,
          y:125,
          fontSize:14
        },
        job:{
          x:20,
          y:145,
          fontSize:11
        },
        phone:{
          x:36,
          y:170,
          fontSize:11
        }
      },
      bg:{
        w:335,
        h:183,
        x:0,
        y:0
      },
      wxCode:{
        w:64,
        h:64,
        x:250,
        y:75
      },
      icon:{
        src:'static/images/card7-icon.png',
        w:12,
        h:12,
        x:20,
        y:160
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
        if(option.text.off){
          that.card_img=canvas.toDataURL();
          return;
        }
        ctx.fillStyle=option.text.color;
        ctx.textAlign=option.text.textAlign;
        ctx.font="normal 500 "+option.text.company.fontSize*n+"px 'PingFangSC',Arial";
        ctx.fillText(detail.text.company,option.text.company.x*n,option.text.company.y*n);
        ctx.font="600 "+option.text.name.fontSize*n+"px 'Microsoft YaHei',Arial";
        ctx.fillText(detail.text.name,option.text.name.x*n,option.text.name.y*n);
        ctx.font="100 "+option.text.job.fontSize*n+"px 'Microsoft YaHei',Arial";
        ctx.fillText(detail.text.job,option.text.job.x*n,option.text.job.y*n);
        ctx.font="100 "+option.text.phone.fontSize*n+"px 'Microsoft YaHei',Arial";
        ctx.fillText(detail.text.phone,option.text.phone.x*n,option.text.phone.y*n);

        //画线
        ctx.beginPath();  //开始一个新路径
        ctx.moveTo(20*n,155*n);  //移到某个坐标，相当于开始路径
        ctx.lineTo(315*n,155*n);  //相当于结束路径
        ctx.strokeStyle='#fff';
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