import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import MapCard from './components/MapCard.vue';



// Importe o variables.css aqui
import '@/assets/css/variables.css';



// Global loading state
store.state.isLoading = true;

createApp(App)
  .use(router)
  .use(store)
  .component('popup-component', MapCard)
  .mount('#app');