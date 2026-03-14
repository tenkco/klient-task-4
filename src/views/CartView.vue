<!-- Коммит 12: Создание страницы корзины (базовая версия) -->
<template>
  <div class="cart">
    <div class="header">
      <h2>Корзина</h2>
      <router-link to="/catalog" class="back-link">← В каталог</router-link>
    </div>

    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="items.length === 0" class="empty-cart">
      <p>Корзина пуста</p>
      <router-link to="/catalog" class="continue-link">Продолжить покупки</router-link>
    </div>
    <div v-else>
      <!-- Группировка товаров -->
      <div class="cart-items">
        <div v-for="group in groupedItems" :key="group.product.id" class="cart-group">
          <div class="group-header">
            <h3>{{ group.product.name }}</h3>
            <span class="group-price">{{ group.product.price }} ₽ × {{ group.count }}</span>
          </div>

          <div class="group-actions">
            <button @click="decreaseQuantity(group.product)" class="qty-btn">-</button>
            <span class="qty">{{ group.count }}</span>
            <button @click="increaseQuantity(group.product)" class="qty-btn">+</button>
            <button @click="removeItem(group.product)" class="remove-btn">Удалить все</button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="total">Итого: {{ totalPrice }} ₽</div>
        <button @click="checkout" class="checkout-btn">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from '@/consts'

export default {
  name: 'CartView',
  data() {
    return {
      items: [],
      loading: true,
      error: ''
    }
  },
  computed: {
    // Группировка одинаковых товаров
    groupedItems() {
      const groups = {}
      this.items.forEach(item => {
        const productId = item.product_id
        if (!groups[productId]) {
          groups[productId] = {
            product: item,
            count: 1,
            cartIds: [item.id]
          }
        } else {
          groups[productId].count++
          groups[productId].cartIds.push(item.id)
        }
      })
      return Object.values(groups)
    },

    totalPrice() {
      return this.items.reduce((sum, item) => sum + item.price, 0)
    }
  },
  mounted() {
    this.fetchCart()
  },
  methods: {
    async fetchCart() {
      try {
        this.loading = true
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}cart`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Ошибка загрузки корзины')
        }

        const data = await response.json()
        this.items = data.data || []
      } catch (error) {
        this.error = 'Не удалось загрузить корзину'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async increaseQuantity(product) {
      // Добавляем еще один такой же товар
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}cart/${product.product_id}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          // Обновляем корзину
          await this.fetchCart()
        }
      } catch (error) {
        console.error(error)
      }
    },

    async decreaseQuantity(product) {
      // Удаляем один экземпляр товара
      // Находим ID товара в корзине для удаления
      const itemToRemove = this.items.find(item => item.product_id === product.product_id)
      if (itemToRemove) {
        await this.removeSingleItem(itemToRemove.id)
      }
    },

    async removeSingleItem(cartItemId) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}cart/${cartItemId}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          await this.fetchCart()
        }
      } catch (error) {
        console.error(error)
      }
    },

    async removeItem(product) {
      // Удаляем все экземпляры этого товара
      const itemsToRemove = this.items.filter(item => item.product_id === product.product_id)

      for (const item of itemsToRemove) {
        try {
          const token = localStorage.getItem('token')
          await fetch(`${API_URL}cart/${item.id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        } catch (error) {
          console.error(error)
        }
      }

      await this.fetchCart()
    },

    async checkout() {
      // Коммит 14: Оформление заказа
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}order`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (!response.ok) {
          if (response.status === 422) {
            throw new Error('Корзина пуста')
          }
          throw new Error(data.error?.message || 'Ошибка оформления заказа')
        }

        alert('Заказ успешно оформлен!')
        this.$router.push('/catalog')
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.back-link {
  color: darkgreen;
  text-decoration: none;
}

.empty-cart {
  text-align: center;
  padding: 50px;
}

.continue-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: darkgreen;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-group {
  border: 1px solid gray;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: white;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.group-header h3 {
  margin: 0;
}

.group-price {
  font-weight: bold;
  color: darkgreen;
}

.group-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: 1px solid gray;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
}

.qty {
  min-width: 30px;
  text-align: center;
}

.remove-btn {
  margin-left: auto;
  padding: 5px 10px;
  background-color: darkred;
  color: white;
  border: none;
  border-radius: 4px;
}

.remove-btn:hover {
  background-color: darkred;
}

.cart-summary {
  border-top: 2px solid gray;
  padding-top: 20px;
  text-align: right;
}

.total {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

.checkout-btn {
  padding: 10px 30px;
  background-color: darkgreen;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
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