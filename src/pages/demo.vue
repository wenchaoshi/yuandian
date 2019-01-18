<!--  -->
<template>
  <div class="aaa">
      <div class="demo" v-for="item in 50" :key="item">{{ item+'sdasjdsaad'}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: function () {  },

  methods: {}
}

</script>
<style lang='stylus'>
#app
    overflow-y auto
    -webkit-overflow-scrolling touch
.demo 
    padding 20px 
    border 1px solid #ccc

</style>