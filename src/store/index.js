import Vue, {reactive, ref} from 'vue'
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

export const store = reactive({
  token: '',
  setToken(token) {
    if (token) this.token = token
  }
})

const token = ref('')


export const useAccountStore = () => {
  const setToken = (t) => {
    if (t) token.value = t
  }

  return {
    token,
    setToken
  }
}