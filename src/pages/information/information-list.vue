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
</style>