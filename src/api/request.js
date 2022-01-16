import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const requests = axios.create({
  baseURL: '/api/',
  timeout: 5000
})
requests.interceptors.request.use(function (config) {
  nprogress.start()
  // 判断详情页的仓库中是否有uuidToken
  if (store.state.detail.uuidToken) {
    config.headers.userTempId = store.state.detail.uuidToken
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
requests.interceptors.response.use(function (response) {
  nprogress.done()
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default requests
