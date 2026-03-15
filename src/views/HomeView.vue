<template>
  <div class="home">
    Добро пожаловать на сайт нашего магазина!
    <nav>
      <router-link to="/register">Зарегестрироваться</router-link>
      <router-link to="/login">Войти в аккаунт</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HomeView"
}
</script>

<style scoped>
nav {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>