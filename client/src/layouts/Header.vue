<template>
  <header class="app-header">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/admin">Admin</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'HeaderComponent'
};
</script>
