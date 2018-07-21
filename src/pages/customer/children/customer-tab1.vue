<!--  -->
<template>
  <div>
      <div class="add-follow">
          <button @click.stop="setClass(follow)"></button>
      </div>
      <div>
          <template v-for='(items,index) in lists.results'>
              <list :createTime="items.create_time" :imgSrc='items.image_url' :text='items.show_message' :key='index' :index="index" :controlOff="controlOff" @controlClick="controlOff=index"></list>
          </template>
          
      </div>
  </div>
</template>

<script>
import list from "./customer-tab1-list";
import $ from "jquery";

export default {
  data() {
    return {
      controlOff: -1,
      lists:{results:[]},
      follow: false
    };
  },

  components: {
    list
  },
  props: [],
  computed: {},
  created(){
    let that=this;
    that.getData('/wxemployee/customer/list/follow?shop=2013714&employee=2005503&customer=2001146&limit=15',{
      success(res){
        console.log(res)
        that.lists=res
      }
    })
  },
  mounted: function() {
    let that = this;
    $(window).on("click", function() {
      that.controlOff = -1;
    });
  },

  methods: {
    setClass(target) {
      this[target] = !this[target];
      $(".shade.follow").addClass("active");
    }
  }
};
</script>
<style lang='stylus'>
.add-follow
    margin 20px 0
    text-align center
    button
        width 2.05rem
        max-width 260px
        height 0.5rem
        background url('../../../images/btn_add_information.png') no-repeat 0 / 100%
        border none
        border-radius 2px
</style>