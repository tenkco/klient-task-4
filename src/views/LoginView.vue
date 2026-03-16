<template>
  <div class="login">
    <h2>Войти в аккаунт</h2>
    <button @click="goBack" class="back-btn">Назад</button>
    <login-form
        @login="login"
        ref="loginForm"
        :errors="errors"
    />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import router from "@/router";
import {API_URL} from "@/consts";

export default {
  name: "LoginView",
  components: {
    LoginForm
  },
  data() {
    return {
      errors: {},
      errorMessage: ''
    }
  },
  methods: {
    async login(params) {
      this.errors = {};
      this.errorMessage = '';

      try {
        const res = await fetch(API_URL + 'login', {
          method: 'POST',
          headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: params.email,
            password: params.password
          })
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.errors) {
            const fieldErrors = {};
            data.errors.forEach(err => {
              if (err.email) fieldErrors.email = err.email[0];
              if (err.password) fieldErrors.password = err.password[0];
            });
            this.errors = fieldErrors;
          } else {
            this.errorMessage = data.message || 'Неверный email или пароль';
          }
          return;
        }

        localStorage.setItem("token", data.data.user_token);
        await router.push('/');
      } catch(err) {
        console.error(err);
        this.errorMessage = 'Ошибка при входе в систему';
      }
    },

    goBack() {
      router.push('/');
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid darkred;
  border-radius: 25px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.back-btn {
  margin-bottom: 20px;
  padding: 5px 15px;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 16px;
}

.error-message {
  color: darkred;
  margin-top: 15px;
  padding: 10px;
  background-color: white;
  border: 1px solid darkred;
  border-radius: 20px;
  text-align: center;
}
</style>