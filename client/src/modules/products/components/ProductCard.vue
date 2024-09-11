<template>
  <div class="product-card">
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p v-if="product.price" class="product-price">Price: ${{ product.price }}</p>
    <span class="product-category">Category: {{ product.category }}</span>
    <div class="card-footer">
      <div v-if="!isAdminView">
        <router-link :to="`/products/${product.id}`">
          <Button type="primary" size="small" @click="viewDetails">View Details</Button>
        </router-link>
      </div>
      <div v-else>
        <Button type="danger" size="small" @click="removeProduct">Remove</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from '../../../components/common/Button.vue';
import { Category } from '../types';

export default defineComponent({
  name: 'ProductCard',
  components: {
    Button
  },
  props: {
    product: {
      type: Object as PropType<{
        id: string;
        name: string;
        description: string;
        price: number;
        category: Category;
      }>,
      required: true
    },
    isAdminView: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    viewDetails() {
      this.$router.push(`/products/${this.product.id}`);
    },
    removeProduct() {
      this.$emit('remove-product', this.product.id);
    }
  }
});
</script>
