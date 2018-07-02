import Vue from 'vue'
import Router from 'vue-router'
import Home from '@pages/home/home'
import Message from '@pages/message/message'
import Customer from '@pages/customer/customer'
import Me from '@pages/me/me'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/', 
    redirect: 'home'
  },{
    path: '/home',
    name: 'home',
    component: Home
  }, {
    path: '/message',
    name: 'message',
    component: Message
  }, {
    path: '/customer',
    name: 'customer',
    component: Customer
  }, {
    path: '/me',
    name: 'me',
    component: Me
  }]
})
