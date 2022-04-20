<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import TopButton from '@/components/common/TopButton.vue';
import InfoModal from '@/components/common/InfoModal.vue';

import { ref, watch, computed } from 'vue';
import { userDevice, infomationModal } from './store';
import { useWindowSize } from 'vue-window-size';

const topButtonDisplay = ref('hidden');
const { width: windowWidth } = useWindowSize();
/** Store */
const deviceStore = userDevice();
const infomationModalStore = infomationModal();

const isInfoModalDisplay = computed(() => {
  return infomationModalStore.isInfoModalDisplay;
});

watch(windowWidth, newVal => {
  deviceStore.isMobile = newVal < 768;
});
watch(isInfoModalDisplay, newVal => {
  document.body.style.overflow = newVal ? 'hidden' : '';
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
    <transition name="slide" appear>
      <InfoModal v-if="isInfoModalDisplay" class="opacity-1" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}
</style>
