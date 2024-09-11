<template>
  <div class="order-list-container">
    <h2>Orders Requiring Manual Confirmation</h2>
    <table class="order-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Customer</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.product.name }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.quantity }}</td>
          <td>${{ order.totalPrice.toFixed(2) }}</td>
          <td>{{ order.status }}</td>
          <td class="action-buttons">
            <button
              class="confirm-button"
              @click="confirmOrder(order.id)"
              >Confirm</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Order, Status } from '../types';

export default defineComponent({
  name: 'OrderList',
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('orders/fetchOrders');
    });

    const orders = computed(() => store.state.orders.orders.filter(
      (order: Order) => order.status === Status.PLACED
    ));

    const confirmOrder = (orderId: string) => {
      store.dispatch('orders/confirmOrder', orderId);
    };

    return {
      orders,
      confirmOrder
    };
  }
});
</script>

<style scoped>
.order-list-container {
  margin-top: 2rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.order-table th,
.order-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.order-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.order-table tr:hover {
  background-color: #f9f9f9;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.confirm-button {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-button:hover {
  background-color: #218838;
}
</style>
