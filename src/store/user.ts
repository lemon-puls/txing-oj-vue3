// getters
import { StoreOptions } from "vuex";

const getters = {};

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      role: "notLogin",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      // TODO 改成远程登录
      commit("updateUser", { userName: "lemon" });
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
