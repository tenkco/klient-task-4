<template>
  <div class="register">
    <h2>Register</h2>
    <button @click="goBack" class="back-btn">Назад</button>
    <register-form
        @register="register"
        ref="registerForm"
        :errors="errors"
    />
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";
import router from "@/router";
import {API_URL} from "@/consts";

export default {
  name: "RegisterView",
  components: {
    RegisterForm
  },
  data() {
    return {
      errors: {}
    }
  },
  methods: {
    async register(params) {
      this.errors = {};

      try {
        const response = await fetch(API_URL + 'signup', {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: params.email,
            fio: params.fio,
            password: params.password
          })
        })

        const data = await response.json();

        if (!response.ok) {
          if (data.errors) {
            const fieldErrors = {};
            data.errors.forEach(err => {
              if (err.email) fieldErrors.email = err.email[0];
              if (err.fio) fieldErrors.fio = err.fio[0];
              if (err.password) fieldErrors.password = err.password[0];
            });
            this.errors = fieldErrors;
          } else {
            alert(data.message || 'Ошибка при регистрации');
          }
          return;
        }

        await router.push('/login');
      } catch (e) {
        console.error(e);
        alert('Произошла ошибка при регистрации');
      }
    },

    goBack() {
      router.push('/');
    }
  }
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid darkred;
  border-radius: 20px;
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
  cursor: pointer;
}
</style>