import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Station from '@/views/Station.vue';
import Route from '@/views/Route.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/station',
    name: 'station',
    component: Station
  },
  {
    path: '/route',
    name: 'route',
    component: Route
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
