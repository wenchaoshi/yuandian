<!-- scroll组件 -->
<template>
  <div class="scroll-wrap" ref="scroll_wrap">
      <slot></slot>
      <div class="loding-top" v-show="lodingTopShow"><i class="el-icon-loading"></i>下拉刷新中</div>
      <div class="loding-bottom" v-show="lodingBottomShow"><i class="el-icon-loading"></i>加载更多</div>
      <div class="all-data" v-show="isAll&&isShow">已加载所有数据</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
let scroll;
let that;
export default {
  data () {
    return {
        lodingTopShow:false,
        lodingBottomShow:false,
        isShow:false
    };
  },
  props:['isAll','options'],

  components: {},

  computed: {
  },

  watch:{
      
  },
  mounted(){ 
    this.initScroll()
  },
  watch:{
      isAll(){
          scroll.refresh()
      },
  },

  methods: {
      initScroll(){
        that=this;
        scroll= new BScroll(this.$refs.scroll_wrap,{
            scrollY: true,
            click: true,
            pullDownRefresh:{
            threshold: 50,
            stop: 30
            },
            pullUpLoad:{
            threshold: 50
            },
            ...that.options
        })
        scroll.on('pullingDown',function(){
        scroll.finishPullDown()
        if('pullDownRefresh' in this.options&&this.options.pullDownRefresh==false){
            return
        }
        that.lodingTopShow=true
        scroll.disable()
        that.$emit('pullingDown',scroll)
        scroll.refresh()
        })

        scroll.on('pullingUp',function(){
        scroll.finishPullUp()
        if('pullUpLoad' in this.options&&this.options.pullUpLoad==false){
            return
        }
        that.lodingBottomShow=true
        scroll.disable()
        that.$emit('pullingUp',scroll)
        scroll.refresh()
        })
        scroll.on('scroll',function(){
            if(scroll.y<scroll.maxScrollY-30){
                that.isShow=true
            }else {
                that.isShow=false
            }
            that.$emit('scroll',scroll)
        })
      },
      destroy(){
          scroll.destroy()
      },
      finishPullUp(){
          scroll.finishPullUp()
          scroll.enable()
          that.$nextTick(()=>{
              scroll.refresh()
              that.lodingBottomShow=false
          })
      },
      finishPullDown(){
          scroll.finishPullDown()
          scroll.enable()
          that.$nextTick(()=>{
              scroll.refresh()
              that.lodingTopShow=false
          })
      },
      refresh(){
          scroll.refresh()
      },
      disable(){
          scroll.disable()
      }
  }
}
/**
 * pullingUp   事件：上拉加载更多
 * finishPullUp()  上拉刷新（数据调用）完成后需要调用
 * 
 * pullingDown   事件：下拉刷新
 * finishPullDown()  下拉刷新（数据调用）完成后需要调用
 * 
 * refresh()    dom渲染完成后需调用
 * 
 *  */ 
</script>
<style lang='stylus' scoped>
.scroll-wrap 
    position relative
    overflow-y hidden
    -webkit-overflow-scrolling none
.all-data
    text-align center
.loding-top, .loding-bottom,.all-data
    position absolute
    top 0
    left 0
    width 100%
    text-align center
    line-height 28px
.loding-bottom,.all-data
    top auto
    bottom 0
</style>