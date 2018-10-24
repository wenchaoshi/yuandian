<!-- employee-manage -->
<template>
  <div id="page">
      <div class="view">
        <div class="employee-name" :style="{'background-image':'url('+idata.detail.employee_image+')'}">
          <h3>“{{idata.detail.employee_name}}”下的客户</h3>
        </div>
         <employee-search :placeHolder="'请输入姓名进行搜索'" :labelStyle="{'background-color':'#fff'}"></employee-search>

         <div class="customer-list">
           <p>所有顾客（{{employeeData.length}}）</p>
           <ul class="search-ul">
             <li v-for="(item , index) in employeeData" :key="index" @click="navigator('/customer-detail',item.id)">
               <span class="img-box"><img :src="item.image" alt=""></span>
               <span class="search-ul-span">
                 <h3 v-html="item.name"></h3>
                 <p>最后活跃时间{{item.last_talktime|gmtDate}}</p>
               </span>
               <span class="fr">
                 <h3>{{item.talk_number}}</h3>
                 <p>沟通次数(总)</p>
               </span>
             </li>

           </ul>
         </div>
      </div>
  </div>
</template>

<script>
import EmployeeSearch from "./base/search"
let that;

export default {
  data () {
    return {
      idata:{
        detail:{},
        employee_id:''
      }
    };
  },

  components: {
    EmployeeSearch
  },

  computed: {
    employeeData(){
      return this.$store.state.employeeData;
    }
  },

  created(){
    that=this;
  },

  mounted: function () { 
    let id=this.$route.query.id;
    this.employee_id=id;
    that.$store.commit('searchInit')
    this.getData('/wxapp/saleperson/customer/api?employee_id='+id,{
      success(res){
        that.$store.commit('setEmployeeData',res.detail)
        that.$set(that.idata,'detail',res)
      }
    })
  },

  methods: {
    navigator(target,customerId){
      this.$router.push({path:target,query:{'employeeId':this.employee_id,'customerId':customerId}})
    }
  }
}

</script>

<style lang="stylus" scoped>
#page 
  background #f1f1f1
.view 
  height 100%

.employee-name 
  height 110px
  line-height 110px
  background no-repeat center center/100% auto 
  text-align center
  h3  
    font-size 16px
    color #fff
.customer-list 
  padding 10px
  background #f1f1f1
  &>p 
    padding 10px 0
    font-weight 600
  li  
    margin-top 10px
    padding 10px
    background #fff
    border-radius 2px
    span 
      display inline-block
      height 43px
      vertical-align middle
      line-height 1.45
      &.fr  
        font-size 18px
        text-align right
      img 
        width 44px
        height auto
        line-height 43px
        margin-right 10px
        display inline-block
        background #000
      h3  
        max-width 1.8rem
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        font-weight 600
        margin-bottom 7px
        line-height 20px
      p 
        color #999
        font-size 12px
</style>
