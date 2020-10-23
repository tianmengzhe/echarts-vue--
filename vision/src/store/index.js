import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'chalk' // vintage
  },
  mutations: {
    changeTheme(state, playload){ //切换主题
      state.theme = state.theme === 'chalk' ?  'vintage' : 'chalk'
    }
  },
  actions: {
  },
  modules: {
  }
})
