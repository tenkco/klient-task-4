<template>
  <div class="cart">
    <h2>Cart</h2>
    <router-link to="/catalog">Вернуться</router-link>
    <div class="cards-container">
      <product-item @delete-from-cart="deleteFromCart" v-for="(item, index) in items" :key="index" :product="item" />
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem";
import {API_URL} from "@/consts";
export default {
  name: "CartView",
  components: {
    ProductItem
  },
  data() {
    return {
      items: {}
    }
  },
  mounted() {
    this.getCartItem();
  },
  methods: {
    async getCartItem() {
      try {
        const res = await fetch(API_URL + 'cart', {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(!res.ok) throw 'mistake'
        const { data } = await res.json()
        this.items = data
      } catch(e) {
        console.error(e)
      }
    },
    async deleteFromCart(params) {
      try {
        const res = await fetch(API_URL + `cart/${params.id}`, {
          method: 'DELETE',
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(!res.ok) throw 'mistake'
        this.items = this.items.filter(item => item.id !== params.id)
      } catch(e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>