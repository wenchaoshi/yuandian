<!-- 添加跟进 -->
<template>
  <div id="page">
      <div class="view">
        <div class="evolve">
            <div>
                <el-select v-model="value1" placeholder="选择跟进方式">
                    <el-option
                    v-for="item in select1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-select v-model="value2" placeholder="跟进阶段">
                    <el-option
                    v-for="item in select2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <p>跟进内容：</p>
                <textarea name="" id="" cols="30" rows="10" v-model="content"></textarea>
            </div>
        </div>
      </div>
      <button @click="add_evolve">发布跟进</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
        select1:[{
            label:'电话跟进',
            value:'1'
        },{
            label:'微信跟进',
            value:'2'
        }],
        select2: [{
          label: '0',
          value: '0'
        },{
          label: '20%',
          value: '1'
        }, {
          label: '40%',
          value: '2'
        }, {
          label: '60%',
          value: '3'
        }, {
          label: '80%',
          value: '4'
        }, {
          label: '成交',
          value: '5'
        }, {
          label: '无法签单',
          value: '6'
        }],
        value1: '',
        value2: '',
        content:''
    };
  },

  components: {},

  computed: {},

  mounted: function () {  },

  methods: {
      add_evolve(){
          let that=this
          this.request('/wxemployee/customer/follow?customerId='+that.$route.query.customer_id,{
              type:'post',
              data:{
                  content: that.content,
                  follow_status: that.value1,
                  customer_status: that.value2
              },
              successtext:'添加成功',
              success(res){
                  
              }
          })
      }
  }
}

</script>
<style lang='stylus' scoped>
#page 
    padding 10px
    background #F1F1F1
    .view .evolve
        height auto
        min-height 530px
        margin-bottom 60px
        padding 20px 15px
        background #fff
        &>div 
            margin-bottom 20px
        p 
            margin-bottom 10px
            color #AAAAAA
        textarea 
            width 100%
            height 320px
            padding 5px
            border 1px solid #25B181
    button 
        position fixed
        left 10px
        bottom 10px
        width calc(100% - 20px)
        height 50px
        border-radius 2px
        background #25B181
        color #fff


</style>
<style lang="stylus">
.el-input__suffix 
    right 0
    width 40px
    background #25B181
.el-select 
    width 100%
.el-select .el-input.is-focus .el-input__inner
    border-color #25B181
</style>
