import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/station',
    name: 'station',
    component: () => import('../views/Station.vue')
  },
  {
    path: '/route',
    name: 'route',
    component: () => import('../views/Route.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
