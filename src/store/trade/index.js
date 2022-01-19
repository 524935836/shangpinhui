import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
  address: [],
  orderInfo: {}
}
const mutations = {
  GETADDRESSINFO(state, address) {
    state.address = address
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const actions = {
  // 获取用户地址信息 13700000000 111111
  async getAddressInfo({ commit }) {
    const res = await reqAddressInfo()
    if (res.code === 200) {
      commit('GETADDRESSINFO', res.data)
    }
  },
  // 获取商品清单
  async getOrderInfo({ commit }) {
    const res = await reqOrderInfo()
    if (res.code === 200) {
      commit('GETORDERINFO', res.data)
    }
  }
}
const getters = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
