import { reqCategoryList, reqBannerList } from '@/api'

const state = {
  categoryList: [],
  bannerList: []
}
const mutations = {
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  }
}
const actions = {
  // 获取三级分类列表
  async getCategoryList({ commit }) {
    const res = await reqCategoryList()
    if (res.code === 200) {
      commit('GETCATEGORYLIST', res.data)
    }
  },
  // 获取轮播图
  async getBannerList({ commit }) {
    const res = await reqBannerList()
    if (res.code === 200) {
      commit('GETBANNERLIST', res.data)
    }
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
