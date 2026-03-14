<template>
  <form class="register" @submit.prevent="onSubmit">
    <h1>Регистрация</h1>

    <label for="fio">ФИО</label>
    <input
        type="text"
        id="fio"
        v-model="form.fio"
        required
        :class="{ error: errors.fio }"
    />
    <span v-if="errors.fio" class="error-text">{{ errors.fio }}</span>

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
    <button type="submit">Зарегистрироваться</button>
  </form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        fio: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    onSubmit() {
      this.errors = {}

      if (!this.form.fio) {
        this.errors.fio = 'ФИО обязательно'
      }
      if (!this.form.email) {
        this.errors.email = 'Email обязателен'
      } else if (!this.form.email.includes('@')) {
        this.errors.email = 'Некорректный email'
      }
      if (!this.form.password) {
        this.errors.password = 'Пароль обязателен'
      } else if (this.form.password.length < 4) {
        this.errors.password = 'Пароль должен быть минимум 4 символа'
      }

      if (Object.keys(this.errors).length === 0) {
        this.$emit('register', this.form)
      }
    }
  }
}
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid white;
  border-radius: 8px;
}

.register input {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
}

.register input.error {
  border-color: darkred;
}

.error-text {
  color: darkred;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
}

.register button {
  background-color: darkgreen;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
}

.register button:hover {
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