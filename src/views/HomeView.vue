<template>
  <div class="home">
    <h1>Добро пожаловать</h1>

    <nav>
      <router-link to="/register" class="btn">Регистрация</router-link>
      <router-link to="/login" class="btn">Вход в систему</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px 20px;
}

nav {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: darkgreen;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

</style>