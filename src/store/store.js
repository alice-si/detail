import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loggedIn: false,
    loginUserId: '',
    loginUserFullName: '',
    objectives: ['']
  },
  mutations: {
    setLogOut (state) {
      state.loggedIn = false
      state.loginUserId = ''
      state.loginUserFullName = ''
    },
    setLogin (state, payload) {
      state.loggedIn = payload.loggedIn
      state.loginUserId = payload.loginUserId
      state.loginUserFullName = payload.loginUserFullName
    },
    setObjectives (state, payload) {
      console.log(payload)
      state.objectives[state.objectives.length - 1] = payload.addedObj;
      state.objectives.push('')
    }
  }
})