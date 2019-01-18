<!-- employee-all -->
<template>
  <div id="page">
      <div class="view">
          
            <employee-search></employee-search> 
					 <employee-lists :statistics="true"></employee-lists>

					<!-- <div class="search">
						<label for="search">
								<input type="text" id="search" v-model="searchVal" placeholder="输入手机号/姓名进行搜索">
						</label>
					</div>

					<div class="employee-list">
						<h3>所有员工（20）</h3>
						<ul>
							<li v-for="(data,index) in employeeLists" :key="index">
								<div class="employee-list-left">
										<span class="img-box"><img src="/static/img/employee-manage-menu.af4246c.png" alt=""></span>
										<span>
										<h3 v-html="data.name"></h3>
										<p v-html="data.phone"></p>
										</span>
								</div>
								<div class="employee-list-right">
										<span>
										<h4>{{data.customerAll}}人</h4>
										<p>客户总数</p>
										</span>
										<span>
										<h4>{{data.share}}次</h4>
										<p>转发数/周</p>
										</span>
								</div>
							</li>
						</ul>
				</div> -->

         
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
    };
  },

  components: {
    EmployeeLists,
    EmployeeSearch
  },

  computed: {},

  created(){
    that=this;
    
  },

  mounted: function () { 
    let permissionId=this.$route.query.permission;
    let url='';
    if(permissionId==1){
      //主管身份
      url='/wxapp/director/saleperson/api';
    }else{
      //老板身份
      url='/wxapp/employee/api';
    }
    this.$store.commit('searchInit')
    this.request(url,{
      success(res){
        that.$store.commit('setEmployeeData',res.detail)
      }
    })
  },

  methods: {

	},

	watch:{
		
    
	}
}

</script>
<style lang='stylus' scoped>
.view 
  height 100%
  background #fff


	.search
		margin 10px
		label 
			display block
			height 38px
			padding 5px 40px 5px 10px
			// background #eee url('../../../images/search.png') no-repeat right 10px center / auto 22px
			// border 1px solid #ddd
			// border-radius 1px
			input
				width 100%
				height 100%
				border none
				color #333
				background none

</style>


<style lang='stylus' scoped>
.employee-list 
  padding 15px
  h3 
    font-weight 600
  ul 
    li 
      display flex
      padding 20px 0
      border-bottom 1px solid #F1F1F1
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
          h4 
            font-weight 600
            color #3B85F4
          p 
            font-size 12px
            line-height 17px
            color #999
            
        &.employee-list-right
          span 
            width 50%
            text-align right

</style>