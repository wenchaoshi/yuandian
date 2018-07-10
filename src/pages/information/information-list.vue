<!-- information-list -->
<template>
 <div class="information-list" @click="toDetail">
    <span class="information-img el-icon-info"><img :src="item.imgSrc" alt=""></span>
    <div class="information-action">
        <h2>{{item.h2}}</h2>
        <p>{{item.p}}</p>
        <span>{{item.date}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:['item'],
  components: {},

  computed: {},

  mounted: function() {},

  methods: {
    toDetail(){
      //console.log(this.item)
      this.$router.push({path: '/information-detail'})
    }
  }
};
</script>
<style lang='stylus'>
@import '../../style/mixin.styl';
.information-list {
  position: relative;
  padding: 20px 10px;
  overflow: hidden;
  border-1px(#EEEEEE);
  cursor pointer
  &:after {
    top: 0;
  }

  .information-img {
    float: left;
    width: 50px;
    height: 50px;
    background: #000;
  }

  .information-action {
    overflow: hidden;
    padding-left: 10px;
    color: #999;

    h2 {
      font-size: 16px;
      color: #333;
      font-weight: 400;
    }

    p {
      margin: 8px 0 16px;
    }

    span {
      font-size: 12px;
    }
  }
}
</style>