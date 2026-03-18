<template>
  <div class="product">
    <h2 class="product-title">{{ product.name }}</h2>
    <img :src="baseUrl + product.image" :alt="product.name" class="product-image">
    <p class="product-description">{{ product.description }}</p>
    <p class="product-price">{{ product.price }} ₽</p>

    <button
        v-if="showAddButton"
        @click="addToCart"
        class="add-btn"
    >
      Добавить в корзину
    </button>
    <button
        v-if="$route.path === '/cart'"
        @click="deleteFromCart"
        class="delete-btn"
    >
      Удалить товар
    </button>
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
    },
    showAddButton: {
      type: Boolean,
      default: true
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
  border: 1px solid darkred;
  border-radius: 12px;
  padding: 20px;
  height: 100%;
  min-height: 400px;
  background-color: white;
  margin: 0;
  width: 100%;
}

.product-title {
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  color: darkred;
  text-align: center;
  width: 100%;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 15px;
  border-radius: 8px;
  flex-shrink: 0;
}

.product-description {
  margin: 0 0 15px 0;
  font-size: 0.95rem;
  color: gray;
  text-align: center;
  flex: 1;
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 4.2rem;
}

.product-price {
  margin: 0 0 15px 0;
  font-size: 1.4rem;
  color: black;
  flex-shrink: 0;
}

.add-btn {
  margin-top: 5px;
  padding: 10px 24px;
  background-color: darkgreen;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  width: 100%;
  max-width: 200px;
  flex-shrink: 0;
}

.add-btn:hover{
  color: darkgreen;
  background: white;
  border: 1px solid darkgreen;
}

.delete-btn {
  margin-top: 5px;
  padding: 10px 24px;
  background-color: darkred;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  width: 100%;
  max-width: 200px;
  flex-shrink: 0;
}
</style>