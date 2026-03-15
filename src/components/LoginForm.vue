<template>
  <form @submit.prevent="onSubmit">
    <p>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="login.email">
    </p>
    <p>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="login.password">
    </p>
    <input type="submit">
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit("login", this.login)
    }
  }
}
</script>

<style scoped>

</style>