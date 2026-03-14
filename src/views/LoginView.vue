<template>
  <div>
    <router-link to="/" class="back-btn">← На главную</router-link>
    <login-form @login="handleLogin" />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import { API_URL } from '@/consts'

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  data() {
    return {
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin(userData) {
      try {
        this.errorMessage = ''

        const response = await fetch(`${API_URL}login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error?.message || 'Ошибка авторизации')
        }

        localStorage.setItem('token', data.data.user_token)

        this.$router.push('/catalog')
      } catch (error) {
        this.errorMessage = error.message
      }
    }
  }
}
</script>

<style scoped>
.back-btn {
  display: inline-block;
  margin-bottom: 20px;
  color: darkgreen;
  text-decoration: none;
}


.error-message {
  color: darkred;
  margin-top: 20px;
}
</style>