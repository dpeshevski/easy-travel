<template>
  <p>Explore unique travel products and packages!</p>
  <router-link to="/products">
    <Button type="primary">View Products</Button>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/common/Button.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Button
  }
});
</script>
