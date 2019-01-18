<!--  -->
<template>
  <div>
      <div class="add-follow">
          <button @click.stop="setClass('follow','add')"></button>
      </div>
      <div>
        <div>
          <template v-for='(items,index) in lists.results'>
              <list :createTime="items.create_time" :imgSrc='items.image_url' :text='items.show_message' :key='index' :index="index" :controlOff="controlOff" :canEdit='items.can_edit' 
              @controlClick="controlOff=index" @edit="setClass('follow','edit')" @delete="doDelete"></list>
          </template>
          <div class="readAll">没有更多数据了</div>
        </div>
      </div>

    <!-- 添加跟进， （留言）-->
    <div class="shade follow" :class="shadeFollow?'active':''" @click="cancle"> 
        <div class="shade-content" @click.stop="stop">
            <div class="tag-main">
              <p>{{main=='add'?'添加跟进':'编辑跟进'}}</p>
              <div>
                <textarea name="" id="" v-model="followContent" placeholder="输入跟进内容"></textarea>
              </div>
            </div>
            <div class="main">
              <div class="cancle" @click='cancle'>取消</div>
              <div class="save" @click="clickSave">保存</div>
            </div>
        </div>
    </div>
    <!-- <div class="ceshi">内容高：{{contentHeight}}<br>滚动高：{{scrollTop}}  windows高：{{winH}}</div> -->
  </div>
</template>

<script>
import list from "./customer-tab1-list";
var that;

export default {
  data() {
    return {
      main:'add',
      controlOff: -1,
      shadeFollow:false,
      lists:{results:[]},
      follow: false,
      customerId:0,
      followContent:'',
      count:0,
      offset:0,
      winH:0,
      isGetList:false
    };
  },

  components: {
    list
  },
  props: ["contentHeight","scrollTop"],
  computed: {},
  created(){
    that=this;
    that.customerId=that.$route.query.customerId;
    let employeeId=this.$route.query.employeeId||null;
    this.employeeId=employeeId;
    if(employeeId){
      this.employee_id='&employee_id='+employeeId
    }else{
      this.employee_id=''
    }

    
  },
  mounted: function() {
    that.count=0;
    that.offset=0;
    that.getList();
    
    that.winH=$(window).height()
    $(window).on("click", function() {
      that.controlOff = -1;
    });
  },
  watch:{
    scrollTop(newScrollTop){
      if(that.lists.results.length<that.count){
        if(newScrollTop+that.winH>that.contentHeight-15&&!that.isGetList){
          that.isGetList=true;
          that.offset+=20;
          that.getList(()=>{
            that.isGetList=false
          })
        }
      }
    }
  },
  methods: {
    getList(successcallback){
      //获取跟进列表
      that.request('/wxemployee/customer/list/follow?customer='+that.customerId+'&customer_id='+that.customerId+that.employee_id+'&limit=20&offset='+that.offset,{
        success(res){
          that.count=res.count;
          that.lists.results.push(...res.results);
          that.$nextTick(()=>{
            that.winH=$(window).height()
            if(successcallback) successcallback()
          })
        }
      })
    },
    setClass(target,main) {
      this.shadeFollow =true;
      this.main=main;
      if(main=='edit'){
        this.followContent=this.lists.results[this.controlOff].show_message;
      }else{
        this.followContent=''
      }
    },
    stop() {},
    cancle() {
      this.shadeFollow = false;
    },
    clickSave(){
      //添加跟进
      if(this.main=='add'){
        this.doAdd()
      }else if(this.main=='edit'){
        this.doEdit()
      }
      this.controlOff=-1;
      this.followContent='';
      this.shadeFollow = false;
    },
    doAdd(){
      that.request('/wxemployee/customer/follow?customer='+that.customerId+'&customer_id='+that.customerId+that.employee_id,{
        type:'POST',
        data:{
          content:that.followContent
        },
        success(res){
          that.offset=0;
          that.lists.results=[];
          that.getList();
        },
        error(res){

        }
      })
    },
    doEdit(){
      let index=this.controlOff;
      let follow_id=that.lists.results[index].follow_id;
      that.request('/wxemployee/customer/follow?customer='+that.customerId+'&customer_id='+that.customerId+that.employee_id,{
        type:'POST',
        data:{
          follow_id:follow_id,
          content:that.followContent
        },
        success(){
          that.lists.results[index].show_message=that.followContent;
        }
      })
    },
    doDelete(index){
      let follow_id=that.lists.results[index].follow_id;
      that.request('/wxemployee/customer/follow?customer='+that.customerId+'&follow_id='+follow_id+'&customer_id='+that.customerId+that.employee_id,{
        type:'delete',
        successtext:'删除成功',
        success(){
          that.lists.results.splice(index,1);
        },
      })
    },
    miniRefresh(that) {
      //下拉刷新
      var miniRefresh = new MiniRefresh({
        container: "#MiniRefresh",
        down: {
          isLock:true,
          callback: function() {
            // 下拉事件
            let timer=setTimeout(()=>{
              miniRefresh.endDownLoading();
            },4000)
            that.informationLists=[];
            that.offset=0;
            that.getList(
              function(){
                miniRefresh.endDownLoading(true);
                clearTimeout(timer)
              }
            )
            return false;
          }
        },
        up: {
          contentnomore: "没有更多数据了",
          contentdown:'上啦显示更多',
          contentrefresh:'加载中...',
          loadFull: {
            isEnable: true
          },
          isAuto: false,
          callback: function() {
            // 上拉事件
            // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
            // setTimeout(function(){
            //   miniRefresh.endUpLoading(false);
            // },300)

            //minirefresh.resetUpLoading();
            alert('lalla')
            
            if(that.lists.results.length>=that.count){
              miniRefresh.endUpLoading(true);
              return
            }
            that.offset+=20;
            that.getList(()=>{
              miniRefresh.endUpLoading(false);
            })
            
          }
        }
      });
    }
  }
};
</script>
<style lang='stylus'>
.add-follow
    margin 20px 0
    text-align center
    button
      width 2.05rem
      max-width 260px
      height 0.5rem
      background url('../../../images/btn_add_information.png') no-repeat 0 / 100%
      border none
      border-radius 2px


.readAll 
  text-align center
  color #999
  font-size 12px
  padding 6px

// .ceshi 
//   background #000
//   color #fff
//   position fixed
//   top 0
//   left 0
//   width 100%
//   z-index 99999

// #MiniRefresh 
//   height 1000px
//   overflow-y scroll
</style>