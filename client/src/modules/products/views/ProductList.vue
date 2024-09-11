<template>
  <div class="product-list">
    <h1 v-if="!isAdminView">{{ 'Available Products' }}</h1>
    <div v-if="loading">Loading products...</div>
    <div v-else-if="error">{{ errorMessage }}</div>
    <div v-else>
      <label v-if="!isAdminView" for="category">Category:</label>
      <select v-if="!isAdminView" id="category" v-model="selectedCategory">
        <option value="">All</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <div class="product-grid" v-if="filteredProducts.length">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item">
          <ProductCard
            :product="product"
            :isAdminView="isAdminView"
            @remove-product="removeProduct"
          />
        </div>
      </div>
      <p v-else>No products available</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, ref, onMounted
} from 'vue';
import { useStore } from 'vuex';
import ProductCard from '../components/ProductCard.vue';
import { ProductStatus } from '../types';

export default defineComponent({
  name: 'ProductList',
  components: { ProductCard },
  props: {
    isAdminView: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore();
    const loading = ref(true);
    const error = ref(false);
    const errorMessage = ref('');
    const selectedCategory = ref('');

    const loadProducts = () => {
      const status = props.isAdminView ? ProductStatus.UNAVAILABLE : ProductStatus.AVAILABLE;

      store.dispatch('products/fetchProducts', status)
        .then(() => {
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
          error.value = true;
          errorMessage.value = 'Failed to load products';
        });
    };

    onMounted(() => {
      loadProducts();
    });

    const products = computed(() => store.state.products.products);
    const categories = computed(() => store.getters['products/formattedCategories']);

    const filteredProducts = computed(() => {
      if (props.isAdminView) {
        return products.value;
      }

      return selectedCategory.value
        ? store.getters['products/getProductsByCategory'](selectedCategory.value)
        : products.value;
    });

    const removeProduct = (productId: string) => {
      store.dispatch('products/deleteProduct', productId)
        .then(() => {
          loadProducts();
        })
        .catch((err) => {
          console.error('Failed to remove product:', err);
        });
    };

    return {
      loading,
      error,
      errorMessage,
      selectedCategory,
      products,
      categories,
      filteredProducts,
      removeProduct
    };
  }
});
</script>
