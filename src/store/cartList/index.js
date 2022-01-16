import { reqCartList } from '@/api'

const state = {

}
const mutations = {
}
const actions = {
  // 获取购物车列表
  async getCartList({ commit }) {
    const res = await reqCartList()
    console.log(res)
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
