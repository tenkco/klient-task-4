<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="fio">ФИО</label>
      <input
          type="text"
          id="fio"
          v-model="registerForm.fio"
          :class="{ 'error-input': errors.fio }"
      >
      <span v-if="errors.fio" class="error-text">{{ errors.fio }}</span>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
          type="email"
          id="email"
          v-model="registerForm.email"
          :class="{ 'error-input': errors.email }"
      >
      <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
    </div>

    <div class="form-group">
      <label for="password">Пароль</label>
      <input
          type="password"
          id="password"
          v-model="registerForm.password"
          :class="{ 'error-input': errors.password }"
      >
      <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
    </div>

    <button type="submit">Зарегистрироваться</button>
  </form>
</template>

<script>
export default {
  name: "RegisterForm",
  props: {
    errors: {
      type: Object,
      default: () => ({})
    }
  },
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
      this.$emit("register", this.registerForm);
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid darkred;
  border-radius: 20px;
  box-sizing: border-box;
}

.error-input {
  border-color: darkred;
  background-color: #fff8f8;
}

.error-text {
  color: darkred;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

button {
  width: 100%;
  padding: 10px;
  background-color: darkred;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
}
</style>