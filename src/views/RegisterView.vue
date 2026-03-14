<template>
  <div>
    <router-link to="/" class="back-btn">← На главную</router-link>
    <register-form @register="handleRegister" />
    <p v-if="message" :class="messageType">{{ message }}</p>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'
import { API_URL } from '@/consts'

export default {
  name: 'RegisterView',
  components: {
    RegisterForm
  },
  data() {
    return {
      message: '',
      messageType: 'success-message'
    }
  },
  methods: {
    async handleRegister(userData) {
      try {
        this.message = ''

        const response = await fetch(`${API_URL}signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            fio: userData.fio,
            email: userData.email,
            password: userData.password
          })
        })

        const data = await response.json()

        if (!response.ok) {
          if (response.status === 422 && data.error?.errors) {
            const errors = data.error.errors
            let errorMessage = 'Ошибки валидации:\n'
            for (const key in errors) {
              errorMessage += `${key}: ${errors[key].join(', ')}\n`
            }
            throw new Error(errorMessage)
          }
          throw new Error(data.error?.message || 'Ошибка регистрации')
        }

        this.message = 'Регистрация успешна! Перенаправление на страницу входа...'
        this.messageType = 'success-message'

        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)

      } catch (error) {
        this.message = error.message
        this.messageType = 'error-message'
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

.success-message {
  color: darkgreen;
  margin-top: 20px;
  white-space: pre-line;
}

.error-message {
  color: darkred;
  margin-top: 20px;
  white-space: pre-line;
}
</style>