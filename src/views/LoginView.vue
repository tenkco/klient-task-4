<template>
  <div class="login">
    <h2>Войти в аккаунт</h2>
    <login-form @login="login"/>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import router from "@/router";
import { store } from '@/store'
import {API_URL} from "@/consts";

export default {
  name: "LoginView",
  components: {
    LoginForm
  },
  methods: {
    async login(params) {
      try{
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
        })
        if(!res.ok) throw "Ошибка"
        const data = await res.json()
        localStorage.setItem("token", data.data.user_token) || '';
        await router.push('/catalog')
      } catch(err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>

</style>