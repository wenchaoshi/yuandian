<!-- 我的   页面 -->
<template>
  <div>
    <div class="itab">
      <div class="nav">
        <span v-for='(item,index) in temlist' :key='index' @click='change(index)' :class="index==tindex?'active':''">{{item}}</span>
      </div>
      <div class="content">
        <keep-alive>  <!-- 缓存 -->
          <component :is="tem"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Tem1 from './tem1'
import Tem2 from './tem2'
import Tem3 from './tem3'
export default {
  data () {
    return {
      temlist:['tem1','tem2','tem3'],
      tindex:0
    };
  },
  props:[],
  components: {
    Tem1,
    Tem2,
    Tem3
  },

  computed: {
    tem(){
      return this.temlist[this.tindex]
    }
  },

  mounted: function(){},

  methods: {
    change(i){
      this.tindex=i
    }
  }
}

</script>
<style lang='stylus'>
.nav 
  display flex
  margin 0 auto 0
  span 
    flex 1
    line-height 1.9
    border 1px solid #ccc
    &:hover 
      background #ccc
input 
  height 34px
  width 75%
</style>