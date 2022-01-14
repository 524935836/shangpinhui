import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'

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
  { name: 'detail', path: '/detail/:skuId ', component: Detail, meta: { show: true } }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

export default router
