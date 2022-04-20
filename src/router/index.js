import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Station from '@/views/Station.vue';
import Road from '@/views/Road.vue';
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
    path: '/road',
    name: 'road',
    component: Road
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
