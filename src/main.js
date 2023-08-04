import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vue2TouchEvents from 'vue2-touch-events'

// Importe o variables.css aqui
import '@/assets/css/variables.css';

// Adicione os ícones que você deseja usar no library do Font Awesomef

// Global loading state
store.state.isLoading = true;

createApp(App)
  .use(router)
  .use(store)
  .use(Vue2TouchEvents)
  .mount('#app');
