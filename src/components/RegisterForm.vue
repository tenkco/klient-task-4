<template>
  <form @submit.prevent="onSubmit">
    <p>
      <label for="fio">Fio</label>
      <input type="text" id="fio" v-model="registerForm.fio">
    </p>
    <p>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="registerForm.email">
    </p>
    <p>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="registerForm.password">
    </p>
    <input type="submit">
  </form>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      registerForm: {
        fio: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.registerForm)
      this.$emit("register", this.registerForm)
    }
  }
}
</script>

<style scoped>

</style>