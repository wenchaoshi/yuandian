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

            <!-- <h3>联系人</h3> -->
            <div class="menu-box">
                <!-- <label>
                    <span class="must">姓名</span>
                    <input type="text" placeholder="请输入客户姓名" required v-model="options.customer_name">
                </label> -->
                <label>
                    <span class="must">手机</span>
                    <input type="number" placeholder="请输入手机号" required v-model="options.customer_wx_phone">
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

                    <div class="province">
                         <select name="" id="province"></select>
                        <select name="" id="city"></select>
                    </div>
                    <!-- <textarea placeholder="" required v-model="options.customer_address"></textarea> -->
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

        <div class="toast" v-show="!isSuccessClose">
            <div class="success" @click="close()">
                <p>创建成功!</p>
                <h3>关闭</h3>
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
        isSuccessClose:true,
        options:{
            customer_name:'',
            customer_trading_state:'0',
            customer_wx_phone:'',
            customer_gender:'0',
            customer_address:'',
            wx_number:'',
            age:'',
            remarks:''
        },
        customer_address_province:'',
        customer_address_city:''
    };
  },

  components: {},

  computed: {},

  mounted: function () { 
      that=this;
      setMap2('北京市','朝阳区');
   },

  watch:{
      'options.customer_wx_phone'(val){
          let phone=val.replace(/\s+/g,""); 
          if(phone.length>11){
            phone=phone.substr(0,11)
          }
          this.options.customer_wx_phone=phone;
      }
  },

  methods: {
      close(){
          this.isClose=true;
          this.isSuccessClose=true;
      },
      addAgent(){
          let options=this.options;
          for(let key in options){
              if(options[key]==''){
                  delete options[key];
              }
          }
          let address='';
          $('.province select').each(function(){
              address+=$(this).find('option:selected').text();
          })
          if(address==''){
              return
          }
          options.customer_address=address;
          
          this.request('/wxapp/customer/entry/api',{
              type:'post',
              data:options,
              successtext:'创建成功',
              success(res){
                  that.isSuccessClose=false;
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


import maplist from '@/js/maplist.js'
function setMap2(province, city) {
    var pc=maplist.pc;
    var pHtmlStr = '';
    for (var name in pc) {
        if (name == province) {
            pHtmlStr = pHtmlStr + '<option selected>' + name + '</option>';
        } else {
            pHtmlStr = pHtmlStr + '<option>' + name + '</option>';
        }

    }
    $("#province").html(pHtmlStr);
    $("#province").change(function () {
        var pname = $("#province option:selected").text();
        var pHtmlStr = '';
        var cityList = pc[pname];
        for (var index in cityList) {
            if (cityList[index] == city) {
            pHtmlStr = pHtmlStr + '<option selected>' + cityList[index] + '</option>';
        } else {
            pHtmlStr = pHtmlStr + '<option>' + cityList[index] + '</option>';
        }
        }
        $("#city").html(pHtmlStr);
    });
    $("#province").change();
}


</script>
<style lang='stylus' scoped>
.view 
    height 100%
    form 
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

.province 
    overflow hidden
    padding 0 0 25px
    select 
        border-bottom 1px solid #ccc
        border-radius 0
        width 45%
        margin 0 2.5%
        float left
        line-height 1.6
        height 32px
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
    .success 
        position relative
        padding 15px 0 45px
        background #fff
        width 11em
        border-radius 5px
        text-align center
        overflow hidden
        h3 
            position absolute
            width 100%
            line-height 30px
            color #fff
            background  #5179ac
            left 0
            bottom 0
            


</style>
