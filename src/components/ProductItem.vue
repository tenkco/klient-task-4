<template>
  <div class="product">

    <h2>{{product.name}}</h2>
    <img :src="this.baseUrl + product.image" alt="product">
    <span>{{product.description}}</span>
    <p>{{product.price}}</p>

    <button v-if="$route.path === '/catalog'" @click="addToCart">Добавить в корзину</button>
    <button v-if="$route.path === '/cart'" @click="deleteFromCart">Удалить товар</button>
  </div>
</template>

<script>
import {BASE_URL} from "@/consts";

export default {
  name: "Product",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      baseUrl: BASE_URL,
    }
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.product);
    },
    deleteFromCart() {
      this.$emit("delete-from-cart", this.product);
    }
  }
}
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  padding: 22px;
}

img {
  width: 150px;
  height: 150px;
}
</style>