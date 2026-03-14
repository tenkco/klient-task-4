<template>
  <div class="product-card">
    <h3>{{ product.name }}</h3>
    <p class="description">{{ product.description }}</p>
    <p class="price">{{ product.price }} ₽</p>

    <button
        v-if="$route.path === '/catalog'"
        @click="addToCart"
        class="btn-add"
    >
      Добавить в корзину
    </button>

    <button
        v-if="$route.path === '/cart'"
        @click="deleteFromCart"
        class="btn-delete"
    >
      Удалить из корзины
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product)
    },
    deleteFromCart() {
      this.$emit('delete-from-cart', this.product)
    }
  }
}
</script>

<style scoped>
.product-card {
  border: 1px solid white;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background-color: white;
}

.description {
  color: gray;
  font-size: 14px;
  min-height: 60px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: darkgreen;
}

.btn-add, .btn-delete {
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}

.btn-add {
  background-color: darkgreen;
  color: white;
}

.btn-add:hover {
  background-color: darkgreen;
}

.btn-delete {
  background-color: darkred;
  color: white;
}

</style>