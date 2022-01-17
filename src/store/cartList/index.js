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
  },
  // 删除所有选中的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    const promiseAll = []
    getters.cartInfoList.forEach(item => {
      if (item.isChecked === 1) {
        const res = dispatch('deleteCart', item.skusId)
        promiseAll.push(res)
      }
    })
    return Promise.all(promiseAll)
  },
  // 改变全部商品的状态
  updateAllCheckedCart({ dispatch, getters }, isChecked) {
    const promiseAll = []
    getters.cartInfoList.forEach(item => {
      const res = dispatch('updateCheckCart', {
        skuId: item.skuId,
        isChecked
      })
      promiseAll.push(res)
    })
    return Promise.all(promiseAll)
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
