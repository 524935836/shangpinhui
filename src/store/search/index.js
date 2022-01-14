import { reqSearchInfo } from '@/api'

const state = {
  searchInfo: {}
}
const mutations = {
  GETSEARCHINFO(state, searchInfo) {
    state.searchInfo = searchInfo
  }
}
const actions = {
  // 获取搜索信息
  async getSearchInfo({ commit }, parmas = {}) {
    const res = await reqSearchInfo(parmas)
    if (res.code === 200) {
      commit('GETSEARCHINFO', res.data)
    }
  }
}
const getters = {
  attrsList(state) {
    return state.searchInfo.attrsList || []
  },
  goodsList(state) {
    return state.searchInfo.goodsList || []
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || []
  },
  total(state) {
    return state.searchInfo.total || 0
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
