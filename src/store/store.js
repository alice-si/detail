import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loggedIn: false,
    loginUserId: '',
    loginUserFullName: ''
  },
  mutations: {
    setLogin (state) {
      state.loggedIn = true
    },
    setLogOut (state) {
      state.loggedIn = false
    }
  }
})