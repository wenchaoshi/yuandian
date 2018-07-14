<!--  -->
<template>
  <div>
    <div class="canvas-pie-box">
        <div id="canvas-pie" class="canvas" style="width: 95%;height:240px;"></div>
        <p><span>对我感兴趣</span><span>对产品感兴趣</span><span>对公司感兴趣</span></p>
    </div>
    <div id="canvas-bar" class="canvas" style="width: 95%;height:270px;"></div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name:'customer-tab2',
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted: function() {
    canvasBar();
    canvasPie();
  },

  methods: {}
};



//圆形统计图
function canvasPie() {
  var myChart = echarts.init(document.getElementById("canvas-pie"));

  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    //图例 旁边显示出来的对应小类目
    // legend: {
    //     orient : 'horizontal',
    //     x : 'center',
    //     y:'bottom',
    //     itemGap:80,
    //     itemWidth:100,
    //     selectedMode:true,
    //     data:['20%','30%','50%']
    // },
    calculable: false,
    series: [
      {
        name: "占比",
        type: "pie",
        radius: [50, 70],
        itemStyle:{
          color:function(params){
            //console.log(params);
            //  (params: Object) => Color
            //  传入的是数据项 seriesIndex, dataIndex, data, value 等各个参数。
            if(params.dataIndex==0){
              return '#6594DA'
            }else if(params.dataIndex==1){
              return '#C0D2DD'
            }else if(params.dataIndex==2){
              return '#57BC99'
            }

          },
        },
        markLine:{
          show:true,
          itemStyle:{
            color:'#000'
          }
        },

        // for funnel
        // x: "60%",
        // width: "35%",
        // funnelAlign: "left",
        // max: 100,

        data: [
          { value: 20, name: "20%" },
          { value: 30, name: "30%" },
          { value: 50, name: "50%" }
        ]
      }
    ]
  };
  myChart.setOption(option);
}




//柱状统计图
function canvasBar() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("canvas-bar"));
  // 指定图表的配置项和数据
var option = {
    title: {
      text: "客户与我的互动",
      left: "center",
      textStyle: {
        color: "#333",
        fontSize: "14"
      }
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        
    },
    calculable : true,
    grid:{
      //绘制图形在canvas容器中的选项
      left:"60px",
      right:'40px',
      top:'60px',
      bottom:'0'
    },
    xAxis : [
        {
            type : 'value',
            //boundaryGap : [0, 0.01],
            position:'top',
            axisTick: {
              //坐标轴刻度相关设置
              show: false 
            },
            axisLine:{
              //x、y轴边框线
              show:false,
              lineStyle:{
                color:'#666'
              }
            },
            splitLine:{
              //x、y轴分隔线
              lineStyle:{
                color:'#ccc'
              }
            }

        }
    ],
    yAxis : [
        {
            type : 'category',
            data: ["浏览官网", "浏览产品", "转发", "查看"],
            axisTick: {
              //坐标轴刻度相关设置
              show: false 
            },
            axisLine:{
              //x、y轴边框线
              lineStyle:{
                color:'#ccc'
              }
            },
            axisLabel:{
              //坐标轴文字的各选项
              textStyle:{
                color:'#666'
              }
            },
            boundaryGap:true
        }
    ],
    series : [
        {
            name:'次数',
            type:'bar',
            itemStyle : {
              //柱子样式
              normal: {
                label : {show: true, position: 'right'},  //柱子旁边的数字标签
                color:'#57BC99'
              },
              
            },
            data: [5,25, 46, 10],
            barCategoryGap:"60%",  //柱间距离
        },
       
    ]
};
                    

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}



</script>
<style lang='stylus'>
.canvas-pie-box 
  overflow hidden
  padding-bottom 20px
  border-bottom 1px solid #eee
  #canvas-pie 
    margin 0 auto
  p span 
    display inline-block
    float left
    width 33.333%
    text-align center
    font-size 12px
    color #666
    &:before 
      content ""
      display inline-block
      margin-right 5px
      border 5px solid #57BC99
      border-radius 50%
    &:nth-of-type(2):before
      border-color #6594DA
    &:nth-of-type(3):before
      border-color #C0D2DD

  

//柱状图
#canvas-bar 
  margin 20px auto 30px
  &:after
    content ""
    display block
    position absolute
    right 20px
    bottom 0
    width calc(100% - 80px)
    height 1px
    background #ccc
</style>