import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ProductList from '../modules/products/views/ProductList.vue';
import ProductDetail from '../modules/products/views/ProductDetail.vue';

import AdminView from '../views/AdminView.vue';
import HomeView from '../views/HomeView.vue';

import AdminDashboardView from '../views/admin/AdminDashboardView.vue';
import ManageUnavailableProductsView from '../views/admin/ManageUnavailableProductsView.vue';
import ViewOrdersView from '../views/admin/ViewOrdersView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    component: AdminView,
    meta: {
      layout: 'admin'
    },
    children: [
      {
        path: '',
        component: AdminDashboardView
      },
      {
        path: 'unavailable-products',
        component: ManageUnavailableProductsView,
        props: { isAdminView: true }
      },
      {
        path: 'orders',
        component: ViewOrdersView
      }
    ]
  },
  {
    path: '/',
    component: HomeView,
    meta: { layout: 'default' }
  },
  {
    path: '/products',
    component: ProductList,
    meta: { layout: 'default' },
    props: { isAdminView: false }
  },
  {
    path: '/products/:id',
    component: ProductDetail,
    meta: { layout: 'default' },
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
