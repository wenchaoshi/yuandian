<!-- director-all -->
<template>
  <div id="page">
      <div class="view">
          <search></search>
          <div class="director-list">
            <p>所有主管（4）</p>
            <ul class="search-ul">
              <li v-for="(item,index) in directorData" :data-id="item.id" :key="index">
                <div class="director-list-content" @click="navigator('/employee-customer',item.id)">
                  <div class="director-list-left">
                      <span class="img-box"><img :src="item.image" alt=""></span>
                      <span class="search-ul-span">
                        <h3 v-html="index==0&&item.forward_number?item.name+'<i></i>':item.name"></h3>
                        <p v-html="item.phone"></p>
                      </span>
                  </div>
                  <div class="director-list-right">
                      <span>
                        <h4>{{item.director_customer_number}}人</h4>
                        <p>客户总数</p>
                      </span>
                      <span>
                        <h4>{{item.forward_number}}次</h4>
                        <p>转发数/周</p>
                      </span>
                  </div>
                </div>
                <div class="director-list-count" @click="navigator('/director_employee',item.id)">
                  <span>主管下员工<strong>{{item.director_saleperson_number}}人</strong></span>
                  <span>主管员工下客户<strong>{{item.total_customer_count}}人</strong></span>
                </div>
              </li>
            </ul>
          </div>
      </div>
  </div>
</template>

<script>
import Search from "./base/search"
let that=this;
export default {
  data () {
    return {
    };
  },

  components: {
    Search
  },

  computed: {
    directorData(){
      return this.$store.state.employeeData;
    }
  },

  created(){
    that=this;

  },

  mounted: function () { 
    that.$store.commit('setEmployeeData',[])
    this.getData('/wxapp/director/api?shop=2013714',{
      success(res){
        console.log(res)
        that.$store.commit('setEmployeeData',res.detail)
      }
    })
  },

  methods: {
    navigator(target,id){
      this.$router.push({path:target,query:{'id':id}})
    }
  }
}

</script>
<style lang='stylus' scoped>
.view 
  height 100%
  background #fff
.director-list 
  padding  10px
  &>p 
    margin 10px 0
    font-weight 600
  ul 
    li 
      padding 20px 0
      border-bottom 1px solid #F1F1F1
      &>div.director-list-content 
        display flex
        flex-direction row
        div 
          flex 1
          span 
            display inline-block
            vertical-align middle
            height 45px
            float left
            img 
              width 45px  
              height auto
              line-height 45px
              margin-right 12px
            h3,h4  
              margin-bottom 8px
              line-height 20px
              font-weight 600
            h4 
              font-weight 600
              color #C69C59
            p 
              font-size 12px
              line-height 17px
              color #999
          &.director-list-right
            span 
              width 50%
              text-align right
      .director-list-count
        margin-top 10px
        height 33px
        padding-left 35px
        line-height 33px
        border-radius 2px
        background no-repeat 10px 7px/16px auto,  no-repeat right 10px center/12px auto
        background-color #C69C59
        background-image url('../../images/icon-man.png'), url('../../images/icon-arrow.png')
        font-size 12px
        span 
          display inline-block
          margin-right 30px
          vertical-align middle
          color #fff
          strong 
            font-weight normal
            margin-left 10px


</style>

<style lang='stylus'>
.search-ul-span i 
  display inline-block
  margin-left 10px
  width 50px
  height 18px
  vertical-align middle
  background url('../../images/hot.png') no-repeat 0 0/100% 100%
</style>
