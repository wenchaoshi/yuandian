<!-- director_employee -->
<template>
  <div id="page">
      <div class="view">
          <div class="director_employee-head">
              <p>“{{idata.detail.director_name}}”主管下的所有员工数据</p>
              <div>
                  <div>
                    <strong>{{idata.detail.total_forward_number}}</strong>
                    <p>总转发数</p>
                  </div>
                  <div>
                    <strong>{{idata.detail.total_talk_number}}</strong>
                    <p>总沟通数</p>
                  </div>
              </div>
          </div>

          <EmployeeSearch />
          <EmployeeLists />
          
      </div>
  </div>
</template>

<script>
import EmployeeLists from "./base/employee-lists"
import EmployeeSearch from "./base/search"
let that;

export default {
  data () {
    return {
      idata:{
        detail:{}
      }
    };
  },

  components: {
    EmployeeLists,
    EmployeeSearch
  },

  computed: {
    // directorEmployeeData(){
    //   return this.$store.state.employeeData;
    // }
  },

  created(){
    that=this;
  },

  mounted: function () { 
    this.$store.commit('searchInit');
    let id=this.$route.query.id;
    this.request('/wxapp/director/saleperson/api'+(id?'?employee_id='+id:''),{
      success(res){
        that.$store.commit('setEmployeeData',res.detail)
        that.$set(that.idata,'detail',res)
      }
    })
  },

  methods: {}
}

</script>
<style lang='stylus' scoped>
.view 
  background #fff
  height 100%
.director_employee-head 
  margin 10px
  padding 15px 10px
  background url('../../images/director-all-bg.png') no-repeat 0 0/100% 100%
  text-align center
  &>p 
    color rgba(255,255,255,.604)
    line-height 17px
  &>div
    display flex
    margin 17px 0 10px
    div 
      flex 1
      strong 
        display inline-block
        line-height 20px
        margin-bottom 7px
        color #fff 
        font-size 20px
      p 
        color rgba(244,244,244,.6032)
        font-size 12px
      &:nth-of-type(1)
        position relative
        &:after
          content ''
          display inline-block
          position absolute
          right -0.5px
          top calc(50% - 16px)
          width 1px
          height 32px
          background rgba(255,255,255,0.2)

</style>