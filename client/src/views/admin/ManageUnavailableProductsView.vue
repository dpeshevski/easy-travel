<template>
  <div class="manage-unavailable-products">
    <h1>Manage Unavailable Products</h1>
    <p>Here you can see the list of products that are no longer available and manage them.</p>
    <ProductList :isAdminView="isAdminView" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductList from '../../modules/products/views/ProductList.vue';

export default defineComponent({
  name: 'ManageUnavailableProductsView',
  components: {
    ProductList
  },
  props: {
    isAdminView: {
      type: Boolean,
      required: true
    }
  }
});
</script>

<style scoped>
.manage-unavailable-products {
  padding: 2rem;
}
</style>
