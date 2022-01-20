import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'

import store from '@/store'

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
  { name: 'trade', path: '/trade', component: Trade, meta: { show: true } },
  { name: 'pay', path: '/pay', component: Pay, meta: { show: true } },
  { name: 'paysuccess', path: '/paysuccess', component: PaySuccess, meta: { show: true } }
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
    next()
  }
})

export default router
