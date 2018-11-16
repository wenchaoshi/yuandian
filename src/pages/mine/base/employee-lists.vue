<!-- employee-lists -->
<template>
    <div class="employee-list">
        <h3>所有员工（{{employeeData.length}}）</h3>
        <ul class="search-ul">
          <li v-for="(item,index) in employeeData" :data-id="item.id" @click="navigator('/employee-customer',item.id)" :key="index">
            <div class="employee-list-left">
                <span class="img-box"><img :src="item.image" alt=""></span>
                <span class="search-ul-span">
                  <h3 v-html="item.name"></h3>
                  <p v-html="item.phone"></p>
                </span>
            </div>
            <div class="employee-list-right">
                <span>
                  <h4>{{item.customer_number}}人</h4>
                  <p>客户总数</p>
                </span>
                <span v-if="!statistics">
                  <h4>{{item.forward_number}}次</h4>
                  <p>转发数/周</p>
                </span>
                <span class="statistics" v-else  @click.stop="navigator('/employee-statistics',item.id)">
                  <img src="../../../images/employee_manage-icon.png" width="36px" alt="">
                  <p style="text-align:center;">统计</p>
                </span>
            </div>
          </li>

          <!-- <li>
            <div class="employee-list-left">
                <span class="img-box"><img src="/static/img/employee-manage-menu.af4246c.png" alt=""></span>
                <span>
                <h3>张丽里</h3>
                <p>1354654643</p>
                </span>
            </div>
            <div class="employee-list-right">
                <span>
                  <h4>8人</h4>
                  <p>客户总数</p>
                </span>
                <span class="statistics" @click.stop="navigator('/employee-statistics',item.id)">
                  <img src="../../../images/employee_manage-icon.png" width="36px" alt="">
                  <p style="text-align:center;">统计</p>
                </span>
            </div>
          </li> -->
          
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },

  props:[
    'statistics'
  ],
  components: {},
	filters:{
		
	},
  computed: {
    employeeData(){
      return this.$store.state.employeeData;
    }
  },

  mounted: function() {

  },

  methods: {
    navigator(target,id){
      this.$router.push({path:target,query:{'id':id}})
    },


    // setdata(employeeData){
    //   //另外保存一份原始data，用以索引
    //   //避免出现js引用类型的问题  ****
    //   let idata=$.extend(true,{},employeeData);  //$.extend方法用以新开一个堆区，防止js对象是应用类型的问题
    //   this.$store.commit('setSearchData',{
    //     target:'idata',
    //     data:idata
    //   })
    //   //避免出现js引用类型的问题
    //   //对元数据进行增加b标签操作，用于后面修改class
    //   employeeData.map(item=>{
    //   let name=item.name.split('');
    //   let phone=item.phone.split('');
    //   let newName='';
    //   let newPhone='';
    //   for(let j=0;j<name.length;j++){
    //     newName+='<b>'+name[j]+'</b>';
    //   }
    //   for(let j=0;j<phone.length;j++){
    //     newPhone+='<b>'+phone[j]+'</b>';
    //   }
    //   item.name=newName;
    //   item.phone=newPhone;
    //   })
    //   this.employeeLists=employeeData;
	  // }
  }
};
</script>
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
            height 45px
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
            &.statistics
              img 
                width 36px
                height auto 
                position relative
                top -5px
              p 
                line-height 14px
                text-indent 2em

</style>