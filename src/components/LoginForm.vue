<template>
  <form class="login" @submit.prevent="onSubmit">
    <h1>Вход в систему</h1>

    <label for="email">Email</label>
    <input
        type="email"
        id="email"
        v-model="form.email"
        required
        :class="{ error: errors.email }"
    />
    <span v-if="errors.email" class="error-text">{{ errors.email }}</span>

    <label for="password">Пароль</label>
    <input
        type="password"
        id="password"
        v-model="form.password"
        required
        :class="{ error: errors.password }"
    />
    <span v-if="errors.password" class="error-text">{{ errors.password }}</span>

    <hr/>
    <button type="submit">Войти</button>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    onSubmit() {
      this.errors = {}

      if (!this.form.email) {
        this.errors.email = 'Email обязателен'
      }
      if (!this.form.password) {
        this.errors.password = 'Пароль обязателен'
      }

      if (Object.keys(this.errors).length === 0) {
        this.$emit('login', this.form)
      }
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid gray;
  border-radius: 8px;
}

.login input {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
}

.login input.error {
  border-color: darkred;
}

.error-text {
  color: darkred;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
}

.login button {
  background-color: darkgreen;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
}

.login button:hover {
  background-color: darkgreen;
}

hr {
  margin: 15px 0;
  border: 1px solid white;
}

label {
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>