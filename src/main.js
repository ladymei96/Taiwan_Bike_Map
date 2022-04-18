import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './index.css';
import 'leaflet/dist/leaflet.css';

router.afterEach((to, from, failure) => {
  window.scrollTo(0, 0);
});

createApp(App).use(router).use(createPinia()).mount('#app');
