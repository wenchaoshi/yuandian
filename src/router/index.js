import Vue from 'vue'
import Router from 'vue-router'

// const Business = res => require(['@pages/business'],res)
import Business from '@pages/business'
// const Information = res => require(['@pages/information'],res)
import Information from '@pages/information'
// import informationDetail from '@pages/information/information-detail'
const informationDetail = res => require(['@pages/information/information-detail'],res)
// const Customer = res => require(['@pages/customer'],res)
import Customer from '@pages/customer'
import customerDetail from '@pages/customer/customer-detail.vue'
// import Customerinformation from '@pages/customer/customer-information.vue'
// const customerDetail = res => require(['@pages/customer/customer-detail.vue'],res)
const Customerinformation = res => require(['@pages/customer/customer-information.vue'],res)
const CustomerAdd = res => require(['@pages/customer/customer-add.vue'],res)
// const customerTab1 = res => require(['@pages/customer/children/customer-tab1.vue'],res)
// const customerTab2 = res => require(['@pages/customer/children/customer-tab2.vue'],res)


import Mine from '@pages/mine'
// import MineEdit from '@pages/mine/edit-card'
// import EmployeeManage from '@pages/mine/employee-manage'
// import EmployeeAll from '@pages/mine/employee-all'
// import DirectorAll from '@pages/mine/director-all'
// import director_employee from '@pages/mine/director_employee'
// import EmployeeCustomer from '@pages/mine/employee-customer'




// const Mine = res => require(['@pages/mine'],res)
const MineEdit = res => require(['@pages/mine/edit-card'],res)
const CardBox = res => require(['@pages/mine/card/card-box'],res)
const EmployeeManage = res => require(['@pages/mine/employee-manage'],res)
const EmployeeAll = res => require(['@pages/mine/employee-all'],res)
const DirectorAll = res => require(['@pages/mine/director-all'],res)
const director_employee = res => require(['@pages/mine/director_employee'],res)
const EmployeeCustomer = res => require(['@pages/mine/employee-customer'],res)



Vue.use(Router)


const router=new Router({
  routes: [{
      path: '/',
      redirect: '/business'
    },
    {
      path: '/business',
      name: 'business',
      component: Business,
      meta: {
        title: '商机'
      }
    },
    {
      path: '/information',
      name: 'information',
      component: Information,
      meta: {
        title: '消息'
      }
    },
    {
      path: '/information-detail',
      name: 'information-detail',
      component: informationDetail,
      meta: {
        title: '消息'
      }
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer,
      meta: {
        title: '客户'
      }
    },
    {
      path: '/customer-detail',
      name: 'customerDetail',
      component: customerDetail,
      meta: {
        title: '客户详情'
      }
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
      component: Customerinformation,
      meta: {
        title: '客户资料'
      }
    },
    {
      path:'/customer-add',
      name:'customer-add',
      component:CustomerAdd,
      meta:{
        title:'新增客户'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/edit-card',
      name: 'mine-edit',
      component: MineEdit,
      meta: {
        title: '名片'
      }
    },
    {
      path: '/employee-manage',
      name: 'employee-manage',
      component: EmployeeManage,
      meta: {
        title: '员工管理'
      }
    },
    {
      path: '/employee-all',
      name: 'employee-all',
      component: EmployeeAll,
      meta: {
        title: '所有员工'
      }
    },
    {
      path: '/director-all',
      name: 'director-all',
      component: DirectorAll,
      meta: {
        title: '所有主管'
      }
    },
    {
      path: '/director_employee',
      name: 'director_employee',
      component: director_employee,
      meta: {
        title: '主管下员工'
      }
    },
    {
      path: '/employee-customer',
      name: 'employee-customer',
      component: EmployeeCustomer,
      meta: {
        title: '客户列表'
      }
    },
    {
      path: '/card-box',
      name: 'card-box',
      component: CardBox,
      meta: {
        title: '名片样式'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {//如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next()
})


export default router