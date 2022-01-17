import { reqUserCode, reqRegisterUser } from '@/api'

const state = {
  recCode: ''
}
const mutations = {
  GETCODE(state, recCode) {
    state.recCode = recCode
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    const res = await reqUserCode(phone)
    if (res.code === 200) {
      commit('GETCODE', res.data)
    }
  },
  // 注册用户
  registerUser({ commit }, user) {
    return reqRegisterUser(user).catch(err => err)
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
