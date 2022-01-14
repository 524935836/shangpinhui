import { reqGoodsInfo } from '@/api'

const state = {
  goodsInfo: {}
}
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
const actions = {
  // 获取详情信息
  async getGoodsInfo({ commit }, parmas) {
    const res = await reqGoodsInfo(parmas)
    if (res.code === 200) {
      commit('GETGOODSINFO', res.data)
    }
  }
}
const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
