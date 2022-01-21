import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './plugins/element.js'

import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 统一引入api
import * as API from '@/api'
import '@/mock/mockServe.js'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 引入图片
import load from './assets/load.gif'
// 引入表单校验插件
import '@/plugins/validate'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.use(VueLazyload, {
  loading: load
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App)
}).$mount('#app')
