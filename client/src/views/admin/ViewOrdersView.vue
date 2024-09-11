<template>
  <div class="view-orders">
    <h1>View Orders</h1>
    <p>Below is a list of all orders placed by users.</p>
    <OrderList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OrderList from '../../modules/orders/components/OrderList.vue';

export default defineComponent({
  name: 'ViewOrdersView',
  components: {
    OrderList
  }
});
</script>

<style scoped>
.view-orders {
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.order-list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
