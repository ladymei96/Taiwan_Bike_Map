<script setup>
import Logo from '@/components/common/Logo.vue';
import MobileLogo from '@/components/Mobile/MobileLogo.vue';
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { userDevice } from '@/store';

const MENU_LIST = reactive([
  {
    path: '/',
    title: '首頁'
  },
  {
    path: '/station',
    title: '站點資訊'
  },
  {
    path: '/route',
    title: '路線導覽'
  }
]);
const PC_LOGO_SIZE = reactive({
  bike: {
    width: 39,
    height: 32
  },
  riding: {
    width: 182,
    height: 25
  }
});
const deviceStore = userDevice();
const { isMobile } = storeToRefs(deviceStore);
</script>

<template>
  <header class="fixed top-0 w-full z-20">
    <MobileLogo v-if="isMobile" />
    <div class="bg-dark01 text-white font-bold">
      <div
        class="container mx-auto md:px-20 flex justify-center md:justify-between items-center py-6"
      >
        <Logo v-if="!isMobile" :size="PC_LOGO_SIZE" />
        <nav>
          <ul class="flex space-x-7 text-lg">
            <li v-for="item in MENU_LIST" :key="item.title">
              <router-link :to="item.path">{{ item.title }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.router-link-active {
  color: #ffde3f;
}
</style>
