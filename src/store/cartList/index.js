import { reqCartList } from '@/api'

const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车列表
  async getCartList({ commit }) {
    const res = await reqCartList()
    if (res.code === 200) {
      commit('GETCARTLIST', res.data)
    }
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
  cartInfoList(state, getters) {
    return getters.cartList.cartInfoList || []
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
