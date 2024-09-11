import { createApp } from 'vue';
import { provideApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router';
import store from './store';
import apolloClient from './api/apollo/client';
import './styles/_index.scss';

const app = createApp(App);
app.use(store);
app.use(router);
provideApolloClient(apolloClient);
app.mount('#app');
