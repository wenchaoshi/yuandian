<!--  -->
<template>
  <div>
    <div id="canvas-pie" style="width: 95%;height:240px;"></div>

    <div id="canvas-bar" style="width: 95%;height:240px;"></div>
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
    tooltip: {},
    legend: {},
    grid: [
      {
        show: true, //是否显示
        zlevel: 0, //所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
        z: 2, //所属组件的z分层，z值小的图形会被z值大的图形覆盖
        left: "0%", //组件离容器左侧的距离,百分比字符串或整型数字
        top: 40, //组件离容器上侧的距离，百分比字符串或整型数字
        right: "15px", //组件离容器右侧的距离,百分比字符串或整型数字
        bottom: "auto", //组件离容器下侧的距离,百分比字符串或整型数字
        width: "auto", //图例宽度
        height: "auto", //图例高度
        containLabel: true, //grid 区域是否包含坐标轴的刻度标签，
        backgroundColor: "transparent", //标题背景色
        borderColor: "#ccc", //边框颜色
        borderWidth: 0, //边框线宽
        shadowColor: "red", //阴影颜色
        shadowOffsetX: 0, //阴影水平方向上的偏移距离
        shadowOffsetY: 0, //阴影垂直方向上的偏移距离
        shadowBlur: 0, //阴影的模糊大小
        tooltip: {
          //坐标系特定的 tooltip 设定
          show: false, //是否显示提示框组件，包括提示框浮层和 axisPointer
          trigger: "axis", //触发类型 none不触发  'item' 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。  'axis'  坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          position: ["50%", "50%"], //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
          formatter: "{b0}: {c0}<br />{b1}: {c1}", //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
          backgroundColor: "transparent", //标题背景色
          borderColor: "#ccc", //边框颜色
          borderWidth: 0, //边框线宽
          padding: 5 //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
        }
      }
    ],
    xAxis: {
      axisTick: {
        //坐标轴刻度相关设置
        show: false //是否显示坐标轴刻度。
      },
      position: "top",
      axisLine: {
        //坐标 轴线
        show: true, //是否显示坐标轴轴线
        onZero: false, //X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
        lineStyle: {
          color: "#ccc", //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
          shadowColor: "red", //阴影颜色   //设置左侧颜色
          shadowOffsetX: 0, //阴影水平方向上的偏移距离。
          shadowOffsetY: 0, //阴影垂直方向上的偏移距离
          shadowBlur: 0, //图形阴影的模糊大小。
          type: "solid", //坐标轴线线的类型，solid，dashed，dotted
          width: 1, //坐标轴线线宽
          opacity: 1 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
        }
      },
      //dsdsadssssssssssssss
      axisLabel: {
        //坐标轴刻度标签的相关设置
        show: true, //是否显示
        interval: "auto", //坐标轴刻度标签的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推
        inside: false, //刻度标签是否朝内，默认朝外
        rotate: 0, //刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。旋转的角度从 -90 度到 90 度
        margin: 8, //刻度标签与轴线之间的距离
        // formatter: function (value, index) {            //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
        //     return value+"kg";
        // },
        showMinLabel: null, //是否显示最小 tick 的 label。可取值 true, false, null。默认自动判定（即如果标签重叠，不会显示最小 tick 的 label）
        showMaxLabel: null, //是否显示最大 tick 的 label。可取值 true, false, null。默认自动判定（即如果标签重叠，不会显示最大 tick 的 label）
        textStyle: {
          color: "#666", //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
          shadowColor: "red", //阴影颜色   //设置左侧颜色
          shadowOffsetX: 0, //阴影水平方向上的偏移距离。
          shadowOffsetY: 0, //阴影垂直方向上的偏移距离
          shadowBlur: 0, //图形阴影的模糊大小。
          type: "solid", //坐标轴线线的类型，solid，dashed，dotted
          width: 1, //坐标轴线线宽
          opacity: 1
        }
      }
    },
    yAxis: {
      data: ["浏览官网", "浏览产品", "转发", "查看"],
      axisTick: {
        //坐标轴刻度相关设置
        show: false //是否显示坐标轴刻度。
      },

      splitNumber: 5, //坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整
      minInterval: 0,
      splitNumber: 5, //坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整
      minInterval: 0,
      axisLine: {
        //坐标 轴线
        show: false, //是否显示坐标轴轴线
        onZero: true, //X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
        lineStyle: {
          color: "#666", //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
          shadowColor: "red", //阴影颜色   //设置左侧颜色
          shadowOffsetX: 0, //阴影水平方向上的偏移距离。
          shadowOffsetY: 0, //阴影垂直方向上的偏移距离
          shadowBlur: 10, //图形阴影的模糊大小。
          type: "solid", //坐标轴线线的类型，solid，dashed，dotted
          width: 1, //坐标轴线线宽
          opacity: 1 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
        }
      }
    },
    series: [
      {
        name: "",
        type: "bar",
        data: [5, 20, 46, 10],
        label: {
          normal: {
            show: true,
            position: "right"
          }
        },
        itemStyle: {
          //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
          normal: {
            color: "#57BC99", //颜色
            borderColor: "#000", //边框颜色
            borderWidth: 0, //柱条的描边宽度，默认不描边。
            borderType: "solid", //柱条的描边类型，默认为实线，支持 'dashed', 'dotted'。
            barBorderRadius: 0, //柱形边框圆角半径，单位px，支持传入数组分别指定柱形4个圆角半径。
            shadowBlur: 0, //图形阴影的模糊大小。
            shadowColor: "#000", //阴影颜色
            shadowOffsetX: 0, //阴影水平方向上的偏移距离。
            shadowOffsetY: 0, //阴影垂直方向上的偏移距离。
            opacity: 1 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
          }
        },
        barGap: "30%",
        barCategoryGap: "70%" //柱子之间的距离，可用来间接改变柱子的距离
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

function canvasPie() {
  var myChart = echarts.init(document.getElementById("canvas-pie"));

  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // legend: {
    //     orient : 'vertical',
    //     x : 'left',
    //     data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
    // },
    calculable: false,
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: [50, 70],
        // itemStyle: {
        //   color: {
        //     //  (params: Object) => Color
        //     //  传入的是数据项 seriesIndex, dataIndex, data, value 等各个参数。
        //   }
        // },

        // for funnel
        x: "60%",
        width: "35%",
        funnelAlign: "left",
        max: 100,

        data: [
          { value: 20, name: "直达" },
          { value: 30, name: "邮件营销" },
          { value: 50, name: "联盟广告" }
        ]
      }
    ]
  };
  myChart.setOption(option);
}

</script>
<style lang='stylus'>
#canvas-pie {
  margin: 20px auto;
}
</style>