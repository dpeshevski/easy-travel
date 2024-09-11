<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <p>
      Welcome to the admin dashboard.
      Use the sidebar to navigate between different management tools.
    </p>
    <div class="button-group">
      <router-link to="/admin/unavailable-products">
        <Button type="primary">Manage Unavailable Products</Button>
      </router-link>
      <router-link to="/admin/orders">
        <Button type="primary">View Orders</Button>
      </router-link>
    </div>

    <div class="product-creation-container">
      <ProductCreationForm />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../../components/common/Button.vue';
import ProductCreationForm from '../../modules/products/components/ProductCreationForm.vue';

export default defineComponent({
  name: 'AdminDashboardView',
  components: {
    Button,
    ProductCreationForm
  }
});
</script>

<style scoped>
.admin-dashboard {
  text-align: center;
  padding: 2rem;
}

.button-group {
  margin-bottom: 2rem;
}

.button-group a {
  margin-right: 1rem;
}

.product-creation-container {
  margin-top: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
