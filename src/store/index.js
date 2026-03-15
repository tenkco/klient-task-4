import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
  }
})

export const store = Vue.observable({
  token: '',
  setToken(token) {
    if (token) this.token = token
  }
})