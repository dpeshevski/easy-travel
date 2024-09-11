<template>
  <div class="app-layout">
    <Header />
    <MainContent :title="title" :contentClass="'centered'">
      <slot />
    </MainContent>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import MainContent from './MainContent.vue';

export default defineComponent({
  name: 'LayoutComponent',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Header,
    Footer,
    MainContent
  }
});
</script>
