<template>
  <div class="app-layout">
    <Header />
    <div class="admin-layout">
      <AdminSidebar />
      <MainContent :title="title" :contentClass="'admin'">
        <slot />
      </MainContent>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import MainContent from './MainContent.vue';
import AdminSidebar from '../components/admin/AdminSidebar.vue';

export default defineComponent({
  name: 'AdminLayout',
  components: {
    Header,
    Footer,
    MainContent,
    AdminSidebar
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
});
</script>
