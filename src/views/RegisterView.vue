<template>
  <div class="register">
    <h2>Register</h2>
    <register-form @register="register" />
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
  methods: {
    async register(params) {
      try {
        const response = await fetch(API_URL + 'signup', {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: params.email,
            fio: params.fio,
            password: params.password
          })
        })
        if (!response.ok) throw "Ты лох неправильная юрл"
        const data = await response.json()
        localStorage.setItem("token", data.data.user_token) || '';
        await router.push('/catalog')
      }catch (e) {
        console.error(e)
      }

    }
  }
}
</script>

<style scoped>

</style>