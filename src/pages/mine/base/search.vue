<!-- search -->
<template>
	<div class="search">
	
		<label for="search" :style="labelStyle">
	
	        <input type="text" id="search" v-model="searchVal" :placeholder="placeHolder||'输入手机号/姓名进行搜索'">
	
	    </label>
	
	</div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: ""
    };
  },

  props: ["placeHolder",'labelStyle'],

  components: {},

  computed: {},

  watch: {
    searchVal(newVal, oldVal) {
      newVal = newVal.replace(/\s+/g, "");
      this.searchVal = newVal;

      var active = []; //用来记录当前输入的字符所匹配项的信息（索引、长度）
      if (Number(newVal)) {
        //输入的是number类型
        var obj = "p";
        var target = "phone";
      } else {
        //输入的是string类型
        var obj = "h3";
        var target = "name";
      }

      let searchLi = $(".search-ul>li");
      $(".search-ul-span b").removeClass("active");
      let idata = this.$store.state.searchData.idata;

      if (!idata.length) {
        return;
      }
      if (!idata[0][target]) {
        //列表中如果没有phone这一块数据，那么直接走name区域
        obj = "h3";
        target = "name";
      }
      if (newVal != "") {
        //统计出当前输入的字符所匹配项的信息（索引、长度）
        for (var i = 0; i < idata.length; i++) {
          // let thisIndex=this.idata[i].phone.indexOf(newVal);
          let item = idata[i][target];
          let thisIndex = item.indexOf(newVal);
          if (thisIndex >= 0) {
            // console.log(i+'/**/'+newVal.length)
            active.push({ index: i, indexof: thisIndex, leng: newVal.length });
          }
        }
      } else {
        //清空input的情况下需要显示所有项
        // this.searchData.active = [];
        this.$store.commit("setSearchDataActive", []);
        searchLi.show();
        return;
      }
      this.$store.commit("setSearchDataActive", active);
      //统计完匹配项信息后，对dom进行操作（操作b标签的class）

      searchLi.hide();
      for (let i = 0; i < active.length; i++) {
        searchLi.eq(active[i].index).show();
        let el = searchLi
          .eq(active[i].index)
          .find(".search-ul-span")
          .find(obj)
          .find("b");
        for (
          let j = active[i].indexof;
          j < active[i].indexof + active[i].leng;
          j++
        ) {
          el.eq(j).addClass("active");
        }
      }
    }
  },

  mounted: function() {
    var scrollTop = "";
    var offsetTop = $(".search label").offset().top;
    $('.view').on("scroll", function(){
      scrollTop = $(this).scrollTop();
      if (scrollTop >= offsetTop) {
        $(".search").addClass("active");
      } else {
        $(".search").removeClass("active");
      }
    });
  },

  beforeDestroy(){
    $('.view').off('scroll')
  },

  methods: {
  }
};

</script>
<style lang='stylus' scoped>
.search
  height 58px
  overflow hidden
  label
    display block
    height 38px
    margin 10px
    padding 5px 40px 5px 10px
    background #eee url('../../../images/search.png') no-repeat right 10px center / auto 22px
    border 1px solid #ddd
    border-radius 1px
    transition 0.4s
    input
      width 100%
      height 100%
      border none
      color #333
      background none
.search.active label
  position fixed
  z-index 10
  left 0
  top 0
  width 100%
  height 48px
  margin 0
</style>