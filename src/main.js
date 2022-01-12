import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import '@/mock/mockServe.js'
// 引入swiper样式
import 'swiper/css/swiper.css'

Vue.component(TypeNav.name, TypeNav)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
