import { reqCartList, reqDeleteCart, reqCheckCart } from '@/api'

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
  },
  // 删除购物车商品
  deleteCart({ commit }, skuId) {
    return reqDeleteCart(skuId).catch(err => err)
  },
  // 切换商品选中状态
  updateCheckCart({ commit }, { skuId, isChecked }) {
    return reqCheckCart(skuId, isChecked).catch(err => err)
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
