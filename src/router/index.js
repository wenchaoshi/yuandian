import Vue from 'vue'
import Router from 'vue-router'
import Business from '@pages/business'
import Information from '@pages/information'
import Customer from '@pages/customer'
import Mine from '@pages/mine'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/', 
    redirect: 'business'
  },{
    path: '/business',
    name: 'business',
    component: Business
  }, {
    path: '/information',
    name: 'information',
    component: Information
  }, {
    path: '/customer',
    name: 'customer',
    component: Customer
  }, {
    path: '/mine',
    name: 'mine',
    component: Mine
  }]
})
