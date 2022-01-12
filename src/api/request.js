import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})
requests.interceptors.request.use(function (config) {
  nprogress.start()
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
