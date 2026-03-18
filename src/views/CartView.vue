<template>
  <div class="cart">
    <h2>Корзина</h2>
    <router-link class="router-link" to="/">Вернуться в каталог</router-link>

    <div v-if="items.length === 0" class="empty-cart">
      Корзина пуста
    </div>

    <div v-else>
      <div class="cards-container">
        <div v-for="(item, index) in groupedItems" :key="index" class="cart-item">
          <img :src="baseUrl + item.product.image" :alt="item.product.name">
          <div class="item-details">
            <h3>{{ item.product.name }}</h3>
            <p class="price-per-item">{{ item.product.price }} ₽/шт</p>
            <p class="total-price">Сумма: {{ item.product.price * item.quantity }} ₽</p>
          </div>
          <div class="item-actions">
            <button @click="decreaseQuantity(item.product, item.cartItemIds)" class="quantity-btn">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.product)" class="quantity-btn">+</button>
            <button @click="deleteFromCart(item.product, item.cartItemIds)" class="delete-btn">Удалить</button>
          </div>
        </div>
      </div>

      <div class="cart-footer">
        <div class="total-order">Итого: {{ totalOrderSum }} ₽</div>
        <button class="checkout-btn">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script>
import {API_URL, BASE_URL} from "@/consts";
import router from "@/router";

export default {
  name: "CartView",
  data() {
    return {
      items: [],
      baseUrl: BASE_URL
    }
  },
  computed: {
    groupedItems() {
      const grouped = {};
      this.items.forEach(item => {
        const key = item.product_id;
        if (!grouped[key]) {
          grouped[key] = {
            product: {
              id: item.product_id,
              name: item.name,
              description: item.description,
              price: item.price,
              image: item.image
            },
            quantity: 1,
            cartItemIds: [item.id]
          };
        } else {
          grouped[key].quantity++;
          grouped[key].cartItemIds.push(item.id);
        }
      });
      return Object.values(grouped);
    },

    totalOrderSum() {
      return this.groupedItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
      }, 0);
    }
  },
  mounted() {
    this.getCartItems();
  },
  methods: {
    async getCartItems() {
      try {
        const res = await fetch(API_URL + 'cart', {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!res.ok) return;
        const responseData = await res.json();
        this.items = responseData.data;
      } catch(e) {
      }
    },

    async increaseQuantity(product) {
      try {
        const res = await fetch(API_URL + `cart/${product.id}`, {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!res.ok) {
          if (res.status === 401) {
            router.push('/login');
          }
          return;
        }

        await this.getCartItems();
      } catch(e) {
      }
    },

    async decreaseQuantity(product, cartItemIds) {
      if (cartItemIds.length === 0) return;

      try {
        const res = await fetch(API_URL + `cart/${cartItemIds[cartItemIds.length - 1]}`, {
          method: 'DELETE',
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!res.ok) return;

        await this.getCartItems();
      } catch(e) {
      }
    },

    async deleteFromCart(product, cartItemIds) {
      try {
        for (const cartId of cartItemIds) {
          const res = await fetch(API_URL + `cart/${cartId}`, {
            method: 'DELETE',
            headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!res.ok) return;
        }

        await this.getCartItems();
      } catch(e) {
      }
    },

    async checkout() {
      try {
        const res = await fetch(API_URL + 'order', {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!res.ok) return;

        await router.push('/orders');
      } catch(e) {
      }
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
}

.router-link{
  color: black;
  text-decoration: none;
  font-size: 18px;
}

.router-link:hover{
  color: darkred;
}

.empty-cart {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: grey;
}

.cards-container {
  margin-top: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  border: 1px solid darkred;
  margin-bottom: 10px;
  border-radius: 25px;
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 10px 0;
}

.item-details p {
  margin: 5px 0;
}

.price-per-item {
  color: gray;
  font-size: 0.9rem;
}

.total-price {
  color: darkred;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-btn {
  padding: 5px 10px;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 50px;
  min-width: 30px;
  font-size: 16px;
}

.quantity {
  min-width: 30px;
  text-align: center;
}

.delete-btn {
  padding: 8px 15px;
  background-color: darkred;
  color: white;
  border: none;
  border-radius: 20px;
  margin-left: 10px;
  cursor: pointer;
}

.delete-btn:hover{
  background: white;
  color: darkred;
  border: 1px solid darkred;
}

.cart-footer {
  margin-top: 20px;
  padding: 20px;
  border-top: 1px solid darkred;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
}

.total-order {
  font-size: 1.5rem;
  color: darkred;
}

.checkout-btn {
  padding: 15px 30px;
  background-color: darkgreen;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
}

.checkout-btn:hover{
  background: white;
  color: darkgreen;
  border: 1px solid darkgreen;
}
</style>