import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import the Vuex store

import '@/assets/css/variables.css';
import '@fortawesome/fontawesome-free/css/all.css';

// Global loading state
store.state.isLoading = true;

createApp(App)
  .use(router)
  .use(store) // Use the Vuex store
  .mount('#app');

// Set loading to false after all resources are loaded
window.addEventListener('load', () => {
  store.state.isLoading = false;
});
