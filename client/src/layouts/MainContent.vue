<template>
  <main :class="['main-content', contentClass]">
    <h1 v-if="title">{{ title }}</h1>
    <slot />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainContent',
  props: {
    title: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    }
  }
});
</script>
