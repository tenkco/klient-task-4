<template>
  <div class="products">
    <span>
      <h2>Products</h2>
      <router-link to="/cart">Cart</router-link>
      <button @click="logout">Выйти из аккаунта</button>
    </span>
    <div class="products-container">
      <product-item @add-to-cart="addToCart" v-for="product in products" :product="product"></product-item>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { API_URL } from "@/consts";
import router from "@/router";

export default {
  name: "Catalog",
  components: {
    ProductItem
  },
  data() {
    return {
      products: [],
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
        if (!response.ok) throw "Ты лох неправильная юрл"
        const {data} = await response.json()
        this.products = data
      }catch (e) {
        console.error(e)
      }

    },
    async addToCart(product) {
      try {
        const res = await fetch(API_URL +`cart/${product.id}`, {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if(!res.ok) throw 'mistake'

      } catch (err) {
        console.error(err)
      }
    },
    async logout() {
      try {
        const res = await fetch(API_URL + 'logout', {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        })
        if(!res.ok) throw 'mistake'
        await router.push('/')
      } catch(e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.products-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>