import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import Home from '@/views/Home'
const Home = () => import('@/views/Home')
// import Login from '@/views/Login'
const Login = () => import('@/views/Login')
// import Register from '@/views/Register'
const Register = () => import('@/views/Register')
// import Search from '@/views/Search'
const Search = () => import('@/views/Search')
// import Detail from '@/views/Detail'
const Detail = () => import('@/views/Detail')
// import AddCartSuccess from '@/views/AddCartSuccess'
// import ShopCart from '@/views/ShopCart'
const AddCartSuccess = () => import(/* webpackChunkName: "AddCartSuccess_ShopCart" */ '@/views/AddCartSuccess')
const ShopCart = () => import(/* webpackChunkName: "AddCartSuccess_ShopCart" */ '@/views/ShopCart')
// import Trade from '@/views/Trade'
const Trade = () => import('@/views/Trade')
// import Pay from '@/views/Pay'
// import PaySuccess from '@/views/PaySuccess'
const Pay = () => import(/* webpackChunkName: "Pay_PaySuccess" */ '@/views/Pay')
const PaySuccess = () => import(/* webpackChunkName: "Pay_PaySuccess" */ '@/views/PaySuccess')
// import Center from '@/views/Center'
// import MyOrder from '@/views/Center/MyOrder'
// import GroupOrder from '@/views/Center/GroupOrder'
const Center = () => import(/* webpackChunkName: "Center_MyOrder_GroupOrder" */ '@/views/Center')
const MyOrder = () => import(/* webpackChunkName: "Center_MyOrder_GroupOrder" */ '@/views/Center/MyOrder')
const GroupOrder = () => import(/* webpackChunkName: "Center_MyOrder_GroupOrder" */ '@/views/Center/GroupOrder')

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 二次封装push和replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { name: 'home', path: '/home', component: Home, meta: { show: true } },
  { name: 'search', path: '/search/:keyword?', component: Search, meta: { show: true } },
  { name: 'login', path: '/login', component: Login, meta: { show: false } },
  { name: 'register', path: '/register', component: Register, meta: { show: false } },
  { name: 'detail', path: '/detail/:skuId', component: Detail, meta: { show: true } },
  { name: 'addCartSuccess', path: '/addCartSuccess', component: AddCartSuccess, meta: { show: true } },
  { name: 'shopCart', path: '/shopCart', component: ShopCart, meta: { show: true } },
  {
    name: 'trade',
    path: '/trade',
    component: Trade,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopCart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: 'pay',
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  { name: 'paysuccess', path: '/paysuccess', component: PaySuccess, meta: { show: true } },
  {
    name: 'center',
    path: '/center',
    component: Center,
    meta: { show: true },
    children: [
      { path: '/center', redirect: '/center/myOrder' },
      { name: 'myOrder', path: 'myOrder', component: MyOrder, meta: { show: true } },
      { name: 'groupOrder', path: 'groupOrder', component: GroupOrder, meta: { show: true } }
    ]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const userInfo = store.state.user.userInfo

  // 是否登录
  if (token) {
    // 是否跳转登录组件
    if (to.path === '/login') {
      next('/home')
    } else {
      // 是否获取了用户信息
      if (Object.keys(userInfo).length) {
        next()
      } else {
        const res = await store.dispatch('user/getUserInfo')
        // token是否过期
        if (res.code !== 200) {
          alert(res.message)
          await store.dispatch('user/logoutUser')
          next('/login')
          return
        }
        next()
      }
    }
  } else {
    // 未登录下指定路径跳转至home
    if (to.path.indexOf('trade') !== -1 || to.path.indexOf('pay') !== -1 || to.path.indexOf('center') !== -1) {
      next(`/login?redirect=${from.path}`)
    } else {
      next()
    }
  }
})

export default router
