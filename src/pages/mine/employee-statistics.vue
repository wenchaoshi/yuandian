<!-- 个人统计 -->
<template>
  <div id="page">
      <div class="view">
          <div class="statistics-menu" @click="setMenu($event)">
            <div :class="statistics_menu_index==index?'active':''" v-for='(item, index) in statistics_menu' :key='index' :data-index='index'>{{ item }}</div>
          </div>
          <statistics-list :option='company_option'></statistics-list>
          <statistics-list :option='card_option'></statistics-list>
          <template v-for="(item,index) in detail">
            <statistics-list :option='item' :key="index"></statistics-list>
          </template>
          <template v-for="(value,key,index) in active_info">
            <div :key="'parent'+index">
            <template v-for="(item,index) in value">
              <statistics-list :option='item' :key="index"></statistics-list>
            </template>
            </div>
          </template>
      </div>
  </div>
</template>

<script>
import statisticsList from './base/statistics-list'
let that;
export default {
  data () {
    return {
      statistics_menu:['今天','近7天','近30天'],
      statistics_menu_index:0,
     company_option:{
      //  title:'官网',
      //  icon:0,
      //  see_number:'',  //浏览量
      //  forward_number:'',  //转发次数
      //  visitor_number:'', //访客量
      //  consultation_number:'' //咨询量
     },
     card_option:{
      //  title:'小名片',
      //  icon:1,
      //  card_visitor_number:'',
      //  card_consultation_number:'',
      //  card_see_number:'',
      //  card_forward_number:''
     },
     detail:[],
     active_info:{}
    };
  },

  components: {
    statisticsList
  },

  computed: {

  },

  created(){
    that=this;
  },

  mounted: function () { 
    this.getDetail();
  },

  methods: {
    setMenu(e){
      let i=e.target.dataset.index
      this.statistics_menu_index=i;
      let data={};
      if(i==1){
        data.data='week'
      }else if(i==2){
        data.data='month'
      }
      this.getDetail(data)
    },
    getDetail(data){
      let that=this;
      let company_option={};
      let card_option={};
      let id=that.$route.query.id;
      data=data||{};
      if(id){
        data.employee_id=id;
      }
      this.request('/wxapp/employee/information/statistics/api',{
        data:data,
        success(res){
          company_option.title='官网';
          company_option.icon=0;
          company_option.see_number=res.company_see_number;
          company_option.forward_number=res.company_forward_number;
          company_option.visitor_number=res.company_visitor_number;
          that.company_option=company_option;

          card_option.title='个人名片';
          card_option.icon=1;
          card_option.see_number=res.card_see_number;
          card_option.forward_number=res.card_forward_number;
          card_option.visitor_number=res.card_visitor_number;
          // card_option.visitor_number=res.card_visitor_number;
          // card_option.consultation_number=res.card_consultation_number;
          that.card_option=card_option;

          let detail=res.detail;
          let icon=0;
          detail.map(item=>{
            item.title=item.product_title;
            if(!icon){
              item.icon=2;
              icon=1
            }else{
              item.icon=3;
              icon=0
            }
            item.see_number=item.product_see_number;  //浏览量
            item.forward_number=item.product_forward_number;  //转发次数
            item.visitor_number=item.product_visitor_number; //访客量
            item.consultation_number=item.product_consultation_number  //item.product_consultation_number //咨询量

            return item;
          })
          that.detail=[];
          that.detail.push(...res.detail)

          let active_info=res.active_info
          for(let key in active_info){
            active_info[key].map(item=>{
                if(!icon){
                  item.icon=2;
                  icon=1
                }else{
                  item.icon=3;
                  icon=0
                }
                item.see_number=item.act_fangwen_number;  //浏览量
                item.forward_number=item.act_fenxiang_number;  //转发次数
                item.visitor_number=item.act_fangke_number; //访客量
                item.consultation_number=item.act_zixun_number  //item.product_consultation_number //咨询量
            })
          }

          that.active_info={...active_info}

        }
      })
    }
  }
}

</script>
<style lang='stylus' scoped>
#page 
  padding-bottom 0
  .view 
    height 100%
    background #fff
    overflow-y auto
    .statistics-menu 
      margin 10px 15px
      display flex
      justify-content space-between
      div 
        width 30%
        height 32px
        line-height 32px
        text-align center
        color #979797
        border 1px solid 
        border-radius 17px
        &.active 
          color #3B85F4
</style>