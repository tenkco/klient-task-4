<template>
  <div class="home">
    <h1>Добро пожаловать на сайт нашего магазина</h1>

    <nav>
      <router-link to="/register" v-if="!isAuthenticated" class="nav-link">Зарегистрироваться</router-link>
      <router-link to="/login" v-if="!isAuthenticated" class="nav-link">Войти в аккаунт</router-link>
      <button @click="logout" v-if="isAuthenticated" class="nav-button">Выйти из аккаунта</button>
      <router-link to="/cart" v-if="isAuthenticated" class="nav-link">Корзина</router-link>
    </nav>

    <div class="catalog">
      <h2>Каталог товаров</h2>
      <div class="products-container">
        <product-item
            v-for="product in products"
            :key="product.id"
            :product="product"
            :show-add-button="isAuthenticated"
            @add-to-cart="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { API_URL } from "@/consts";
import router from "@/router";

export default {
  name: "HomeView",
  components: {
    ProductItem
  },
  data() {
    return {
      products: []
    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const response = await fetch(API_URL + 'products', {
          method: 'GET',
          headers: {
            "Accept": 'application/json',
          }
        })
        if (!response.ok) return;
        const {data} = await response.json()
        this.products = data
      } catch (e) {
      }
    },

    async addToCart(product) {
      if (!this.isAuthenticated) {
        return;
      }

      try {
        const res = await fetch(API_URL + `cart/${product.id}`, {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if(!res.ok) return;
      } catch (err) {
      }
    },

    logout() {
      localStorage.removeItem('token');
      router.push('/');
      window.location.href = '/';
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home {
  text-align: center;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

h1 {
  margin: 0 0 30px 0;
  color: darkred;
  font-size: 2.5rem;
}

.catalog {
  margin: 40px 0;
}

h2 {
  margin-bottom: 30px;
  color: darkred;
  font-size: 2rem;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

nav {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 0 auto 40px;
  max-width: 1200px;
  border: 1px solid darkred;
  background: white;
  border-radius: 50px;
}

.nav-link, .nav-button {
  font-weight: 600;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 16px;
  min-width: 160px;
  border: none;
}

.nav-link {
  color: black;
  background-color: transparent;
  border: 1px solid black;
}

.nav-button {
  color: white;
  background-color: darkred;
  border: 1px solid darkred;
}
</style>