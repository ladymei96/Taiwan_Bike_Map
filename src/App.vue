<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import TopButton from '@/components/common/TopButton.vue';

import { ref, watch } from 'vue';
import { userDevice } from './store';
import { useWindowSize } from 'vue-window-size';

const topButtonDisplay = ref('hidden');
const { width: windowWidth } = useWindowSize();
/** Store */
const deviceStore = userDevice();

watch(windowWidth, newVal => {
  deviceStore.isMobile = newVal < 768;
});
const onScroll = () => {
  topButtonDisplay.value = window.scrollY > 200 ? 'block' : 'hidden';
};

window.addEventListener('scroll', onScroll);
</script>

<template>
  <div>
    <Header />
    <router-view></router-view>
    <TopButton class="fixed bottom-6 right-6 z-30" :class="topButtonDisplay" />
    <Footer />
  </div>
</template>

<style></style>
