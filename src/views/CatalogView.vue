<template>
  <div class="catalog">
    <div class="header">
      <h2>Каталог товаров</h2>
      <div class="nav-links">
        <router-link to="/cart" class="cart-link">Корзина</router-link>
        <button @click="logout" class="logout-btn">Выйти</button>
      </div>
    </div>

    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="products-grid">
      <product-item
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue'
import { API_URL } from '@/consts'

export default {
  name: 'CatalogView',
  components: {
    ProductItem
  },
  data() {
    return {
      products: [],
      loading: true,
      error: ''
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        this.loading = true
        const response = await fetch(`${API_URL}products`)
        const data = await response.json()
        this.products = data.data || []
      } catch (error) {
        this.error = 'Ошибка загрузки товаров'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async addToCart(product) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}cart/${product.id}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Ошибка добавления в корзину')
        }
      }
    },

    async logout() {
      try {
        const token = localStorage.getItem('token')
        await fetch(`${API_URL}logout`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        localStorage.removeItem('token')
        this.$router.push('/')
      } catch (error) {
        localStorage.removeItem('token')
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.catalog {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.nav-links {
  display: flex;
  gap: 15px;
}

.cart-link {
  background-color: darkgreen;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
}

.cart-link:hover {
  background-color: darkgreen;
}

.logout-btn {
  background-color: darkred;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.loading, .error {
  text-align: center;
  padding: 50px;
  font-size: 18px;
}

.error {
  color: darkred;
}
</style>