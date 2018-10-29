<!--  -->
<template>
  <div id="page">
      <div class="view">
            <!-- <h3>基本信息</h3>
            <div class="menu-box">
                <div>
                    <span>获得时间</span>
                    <input type="text" placeholder="2018-10-12">
                </div>
                <div>
                    <span>所有者</span>
                    <input type="text" placeholder="某某">
                </div>
            </div> -->
        <form @submit.prevent="addAgent()">

            <h3>客户信息</h3>
            <div class="menu-box">
                <label>
                    <span class="must">客户名称</span>
                    <input type="text" placeholder="请输入名称" required v-model="options.customer_name">
                </label>
                <label class="select">
                    <span class="must">客户状态</span>
                    <!-- <input type="text" placeholder="" required v-model="options.customer_trading_state"> -->
                    <select name="" id="" required v-model="options.customer_trading_state">
                        <option value="0" selected>有效客户</option>
                        <!-- <option value="1">无效客户</option> -->
                        <option value="2">已成交客户</option>
                    </select>
                </label>
                <label>
                    <span>客户介绍</span>
                    <textarea placeholder="请输入客户介绍" v-model="options.remarks">

                    </textarea>
                </label>
            </div>

            <h3>联系人</h3>
            <div class="menu-box">
                <label>
                    <span class="must">姓名</span>
                    <input type="text" placeholder="请输入客户姓名" required v-model="options.customer_name">
                </label>
                <label>
                    <span class="must">手机</span>
                    <input type="text" placeholder="请输入手机号" required v-model="options.customer_wx_phone">
                </label>
                <label class="select">
                    <span class="must">性别</span>
                     <select name="" id="" required v-model="options.customer_gender">
                        <option value="0" selected>男</option>
                        <option value="1">女</option>
                    </select>
                </label>
                <label>
                    <span>年龄</span>
                    <input type="text" placeholder="" v-model="options.age">
                </label>
                <label>
                    <span>微信号</span>
                    <input type="text" placeholder="" v-model="options.wx_number">
                </label>
                <label>
                    <span class="must">地址</span>
                    <textarea placeholder="" required v-model="options.customer_address"></textarea>
                </label>
            </div>

            <div class="submit">
                <button type="submit">保存</button>
            </div>
        </form>

        <div class="toast" v-show="!isClose">
            <div class="content submit">
                <p>该客户创建失败已在其他人名下</p>
                <button @click="close()">确定</button>
                <i class="close" @click="close()">X</i>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
let that;
export default {
  data () {
    return {
        isClose:true,
        options:{
            customer_name:'',
            customer_trading_state:'0',
            customer_wx_phone:'',
            customer_gender:'0',
            customer_address:'',
            wx_number:'',
            age:'',
            remarks:''
        }
    };
  },

  components: {},

  computed: {},

  mounted: function () { 
      that=this;
   },

  watch:{
  },

  methods: {
      close(){
          this.isClose=true;
      },
      addAgent(){
          let options=this.options;
          for(let key in options){
              if(options[key]==''){
                  delete options[key];
              }
          }
          this.getData('/wxapp/customer/entry/api',{
              type:'post',
              data:options,
              successtext:'创建成功',
              success(res){
                  console.log(res)
              },
              other(res){
                  if(res.status==2){
                      that.isClose=false;
                  }
              },
              error(res){
                  console.log(res)
              }
          })
          return false;
      }
  }
}

</script>
<style lang='stylus' scoped>
.view 
    height 100%
    form 
        position absolute
        left 0
        top 0
        width 100%
h3 
    padding 0 20px
    line-height 34px
    font-size 12px
    color rgba(51,51,51,.6)
.menu-box 
    padding 0 20px
    background #fff
    font-size 12px
    label
        display block 
        border-bottom 1px solid rgba(151,151,151,.2)
        line-height 60px
        &:nth-last-of-type(1) 
            border-color transparent
        span
            display inline-block
            width 5em
            vertical-align middle
            &:before 
                content "*"
                font-size 20px
                color transparent
                margin-left -10px
                margin-right 2px
                vertical-align middle
                vertical-align -webkit-baseline-middle
            &.must:before 
                color #f00
        input 
            width calc(100% - 6em)
            height 34px
            border none
        textarea 
            display block
            border none
            width 100%
            height 90px
            padding-left 10px
            margin-bottom 15px
            line-height 18px
select 
    -webkit-appearance: none;
    border: 0;
    outline: 0;
    background-color: transparent;
    font-size: inherit;
    width: calc(100% - 6em);
    height: 45px;
    line-height: 45px;
    position: relative;
    z-index: 1;
    padding-left: 5px;
.select:after 
    content ""
    display inline-block
    width 8px 
    height 8px
    border 1px solid #333
    border-top-color transparent 
    border-right-color transparent 
    transform rotate(-135deg)
.submit
    padding 20px 0
    text-align center
    button
        width 203px
        height 46px
        line-height 46px
        font-size 20px
        color #fff
        background rgba(218,75,90,1)
        border-radius 4px
        &:hover 
            background #d30d22

.toast 
    position fixed
    left 0
    top 0
    z-index 99
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
    background RGBA(10, 10, 10, .4)
    .content 
        position relative
        display flex
        flex-direction column
        justify-content center
        align-items center
        width 3.27rem
        height 250px
        padding 0 10px
        background #fff
        p   
            color #3E3C3C
            font-size 20px
            margin-bottom 35px
        .close 
            display inline-block
            position absolute
            right 5px
            top -62px
            width 37px
            height 37px
            line-height: 37px;
            border 1px solid #fff
            border-radius 50%
            background RGBA(92, 92, 92, .44)
            color #fff
            font-style normal
            font-size 20px
</style>
