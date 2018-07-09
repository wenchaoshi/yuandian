import Vue from 'vue'
import Router from 'vue-router'
import Business from '@pages/business'
import Information from '@pages/information'
import informationDetail from '@pages/information/information-detail'
import Customer from '@pages/customer'
import customerDetail from '@pages/customer/customer-detail.vue'
import customerTab1 from '@pages/customer/children/customer-tab1.vue'
import customerTab2 from '@pages/customer/children/customer-tab2.vue'
import Mine from '@pages/mine'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/', 
    redirect: '/business'
  },
  {
    path: '/business',
    name: 'business',
    component: Business
  }, 
  {
    path: '/information',
    name: 'information',
    component: Information,
  }, 
  {
    path: '/information-detail',
    name:'information-detail',
    component: informationDetail
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer
  },
  {
    path: '/customer-detail',
    name: 'customerDetail',
    component: customerDetail,
    children:[
      {
        path: 'customer-tab1',
        name: 'customerTab1',
        component: customerTab1,
      },
      {
        path: 'customer-tab2',
        name: 'customerTab2',
        component: customerTab2,
      },
      {
        path: '',
        redirect: 'customer-tab1',
      }
    ]
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine
  }]
})
