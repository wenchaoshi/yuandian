<!--  -->
<template>
  <div>
      <div class="add-follow">
          <button @click.stop="setClass(follow)"></button>
      </div>
      <div>
          <template v-for='(items,index) in lists'>
              <list :imgSrc='items.imgSrc' :text='items.text' :key='index' :index="index" :controlOff="controlOff" @controlClick="controlOff=index"></list>
          </template>
          
      </div>
  </div>
</template>

<script>
import list from './customer-tab1-list'
import $ from 'jquery'

export default {
  data () {
    return {
        controlOff:-1,
        lists:[
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            },
            {
                imgSrc:'http://www.baidu.com/img/bd_logo1.png',
                text:'哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒哒哒对对对哒哒哒'
            }
        ],
        follow:false
    };
  },

  components: {
      list
  },
  props:[],
  computed: {
  },

  mounted: function () { 
      let that=this
      $(window).on('click',function(){
          that.controlOff=-1
      })
   },

  methods: {
    setClass(target){
      this[target]=!this[target]
      $('.shade.follow').addClass('active')
    }
  }
}

</script>
<style lang='stylus'>
.add-follow
  margin 20px 0
  text-align center
  button 
    width 2.05rem
    max-width 260px
    height .5rem
    background url('../../../images/btn_add_information.png') no-repeat 0/100%
    border none
    border-radius 2px
</style>