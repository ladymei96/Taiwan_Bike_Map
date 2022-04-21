import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './index.css';
import 'leaflet/dist/leaflet.css';
import eventBus from '@/plugins/eventBus.js';

router.afterEach((to, from, failure) => {
  window.scrollTo({ top: 0 });
});
const app = createApp(App);
app.config.globalProperties.$eventBus = eventBus;
app.use(router).use(createPinia()).mount('#app');
