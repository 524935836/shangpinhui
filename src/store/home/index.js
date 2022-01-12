import { reqCategoryList } from '@/api'

const state = {
  categoryList: []
}
const mutations = {
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  }
}
const actions = {
  async getCategoryList({ commit }) {
    const res = await reqCategoryList()
    if (res.code === 200) {
      commit('GETCATEGORYLIST', res.data)
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
