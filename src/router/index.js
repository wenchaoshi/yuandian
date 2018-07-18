import Vue from 'vue'
import Router from 'vue-router'

const Business = res => require(['@pages/business'],res)
const Information = res => require(['@pages/information'],res)
const informationDetail = res => require(['@pages/information/information-detail'],res)
const Customer = res => require(['@pages/customer'],res)
const customerDetail = res => require(['@pages/customer/customer-detail.vue'],res)
const Customerinformation = res => require(['@pages/customer/customer-information.vue'],res)
// const customerTab1 = res => require(['@pages/customer/children/customer-tab1.vue'],res)
// const customerTab2 = res => require(['@pages/customer/children/customer-tab2.vue'],res)
const Mine = res => require(['@pages/mine'],res)
const MineEdit = res => require(['@pages/mine/edit-card'],res)


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
      name: 'information-detail',
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
      // children:[
      //   {
      //     path: 'customer-tab1',
      //     name: 'customerTab1',
      //     component: customerTab1,
      //   },
      //   {
      //     path: 'customer-tab2',
      //     name: 'customerTab2',
      //     component: customerTab2,
      //   },
      //   {
      //     path: '',
      //     redirect: 'customer-tab1',
      //   }
      // ]
    },

    {
      path: '/customer-information',
      name: 'customer-information',
      component: Customerinformation
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/edit-card',
      name: 'mine-edit',
      component: MineEdit
    }
  ]
})
