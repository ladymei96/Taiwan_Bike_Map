import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Taiwan_Bike_Map/',
  server: {
    port: 8080,
    open: true
  },
  plugins: [vue(), Pages(), Layouts()],
  resolve: {
    alias: { '@/': `${path.resolve(__dirname, 'src')}/` }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
