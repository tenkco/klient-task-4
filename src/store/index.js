import { createStore } from 'vuex'
import { API_URL } from '@/consts'

export default createStore({
  state: {
    token: localStorage.getItem('token') || ''
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    CLEAR_TOKEN: (state) => {
      state.token = ''
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        fetch(`${API_URL}login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
              if (data.data?.user_token) {
                const token = data.data.user_token
                commit('SET_TOKEN', token)
                localStorage.setItem('token', token)
                resolve(token)
              } else {
                reject(new Error('Ошибка авторизации'))
              }
            })
            .catch(error => {
              commit('CLEAR_TOKEN')
              localStorage.removeItem('token')
              reject(error)
            })
      })
    },

    LOGOUT: ({ commit }) => {
      commit('CLEAR_TOKEN')
      localStorage.removeItem('token')
    }
  },
  modules: {
  }
})