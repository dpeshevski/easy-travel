<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';
import AdminLayout from './layouts/AdminLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    DefaultLayout,
    AdminLayout
  },
  setup() {
    const route = useRoute();

    const layout = computed(() => (route.meta.layout === 'admin' ? 'AdminLayout' : 'DefaultLayout'));

    return {
      layout
    };
  }
});
</script>
