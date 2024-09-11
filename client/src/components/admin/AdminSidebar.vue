<template>
  <aside class="admin-sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="/admin">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/admin/unavailable-products">Manage Unavailable Products</router-link>
        </li>
        <li>
          <router-link to="/admin/orders">View Orders</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
export default {
  name: 'AdminSidebar'
};
</script>
