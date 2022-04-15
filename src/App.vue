<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

import { watch } from 'vue';
import { userDevice } from './store';
import { useWindowSize } from 'vue-window-size';

const { width: windowWidth } = useWindowSize();
/** Store */
const deviceStore = userDevice();

watch(windowWidth, newVal => {
  deviceStore.isMobile = newVal < 768;
});
</script>

<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<style></style>
