<!-- employee-manage -->
<template>
  <div id="page">
      <div class="view">
          <ul class="menu">
              <li>
                <div>
                    <span>
                        <p>主管总数</p>
                        <strong>{{detail.detail.total_dict.director_number}}</strong>
                    </span>
                    <span @click="navigator('/director-all',detail.detail.permission)"><i>查看</i></span>
                </div>
              </li>
              <li>
                <div @click="navigator('/employee-all',detail.detail.permission)">
                    <span>
                        <p>员工总数</p>
                        <strong style="color:#3B85F4;">{{detail.detail.total_dict.salepersons}}</strong>
                    </span>
                    <span><i>查看</i></span>
                </div>
              </li>
          </ul>

          <employee-lists :statistics="true"></employee-lists>
      </div>
  </div>
</template>

<script>
import EmployeeLists from "./base/employee-lists";
let that;
export default {
  data () {
    return {
      detail:{
        detail:{
          total_dict:{
            director_number:'',
            salepersons:''
          },
          permission:''
        }
      }
    };
  },

  components: {
    EmployeeLists
  },

  computed: {
    employeeData(){
      return this.$store.state.employeeData
    }
  },

  created(){
    that=this;
  },

  mounted: function () { 
    this.$store.commit('searchInit')
    this.getEmployee()
  },

  methods: {
    navigator(target,permission){
      this.$router.push({path:target,query:{'permission':permission}})
    },
    getEmployee(){
      this.request('/wxapp/employee/api',{
        success(res){
          that.$store.commit('setEmployeeData',res.detail);
          that.$set(that.detail,'detail',res)
        }
      })
    }
  }
}

</script>
<style lang='stylus' scoped>
.view 
  height 100%
  background #fff
.menu 
  overflow hidden
  padding 0 10px
  li 
    margin 10px 0
    width 50%
    height .85rem
    float left
    div 
      display table
      width 100%
      height 100%
      background url(../../images/employee-manage-menu.png) no-repeat 0 0/100% 100%
      span 
        display table-cell
        vertical-align middle
        padding-left .2rem
        p 
          margin-bottom 10px
          font-size 12px
          color rgba(244,244,244,.6)
        strong 
          font-size 20px
          color #C69C59
        &:nth-of-type(2)
          padding-left 0
          text-align center
          width .75rem
          i 
            display inline-block
            width 52px
            background rgba(255,255,255,.8)
            border-radius 10px
            font-style normal
            font-size 10px
            color #4F4F5C
            line-height 24px
            transform scale(.8)
            

</style>