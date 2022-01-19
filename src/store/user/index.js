import { reqUserCode, reqRegisterUser, reqLoginUser, reqUserInfo, reqLogout } from '@/api'

const state = {
  recCode: '',
  token: localStorage.getItem('token'),
  userInfo: {}
}
const mutations = {
  GETCODE(state, recCode) {
    state.recCode = recCode
  },
  LOGINUSER(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  LOGOUTUSER(state) {
    state.token = ''
    state.userInfo = {}
    localStorage.removeItem('token')
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
  },
  // 登录用户
  async loginUser({ commit }, data) {
    const res = await reqLoginUser(data).catch(err => err)
    if (res.code === 200) {
      commit('LOGINUSER', res.data.token)
      // 保存到本地
      localStorage.setItem('token', res.data.token)
    }
    return res
  },
  // 获取用户信息(home组件)
  async getUserInfo({ commit }) {
    const res = await reqUserInfo().catch(err => err)
    if (res.code === 200) {
      commit('GETUSERINFO', res.data)
    }
    return res
  },
  // 退出登录
  async logoutUser({ commit }) {
    const res = await reqLogout().catch(err => err)
    if (res.code === 200) {
      commit('LOGOUTUSER')
    }
    return res
  }
}
const getters = {
  name(state) {
    return state.userInfo.name
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
