<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';

import { TOP_ROAD } from '@/statics/constants/topRoad_config.js';
import { onMounted, ref, getCurrentInstance } from 'vue';

let vueInstance;
const title = ref('熱門路線');
const description = ref('四大精選路線，推薦給你。');

const showModal = item => {
  const params = {
    modalName: 'RoadInfoModal',
    options: item
  };
  vueInstance.$eventBus.$emit('toggleModal', params);
};

onMounted(() => {
  const { proxy } = getCurrentInstance();
  vueInstance = proxy;
});
</script>

<template>
  <BlockWrap :title="title" :description="description">
    <main class="grid gap-4 grid-cols-1 md:grid-cols-2 px-16 lg:px-28">
      <div
        class="topRoute__item relative h-72 px-5 text-center flex flex-col items-center justify-center text-white bg-gray-800 rounded-2xl bg-cover bg-center saturate-70"
        :style="item.Style"
        v-for="item in TOP_ROAD"
        :key="item.RouteName"
      >
        <h1
          class="topRoute__text mb-3 sm:mb-6 text-3xl font-bold relative z-20"
        >
          {{ item.RouteName }}
        </h1>
        <button
          class="topRoute__text text-3xl font-bold opacity-0 relative z-20"
          @click="showModal(item)"
        >
          See More >
        </button>
        <div
          class="topRoute__mask absolute top-0 left-0 w-full h-full rounded-2xl bg-gray-500 opacity-0 z-10"
        ></div>
      </div>
    </main>
  </BlockWrap>
</template>
<style lang="scss" scoped>
.topRoute__item {
  &:hover {
    button {
      opacity: 1;
    }
    .topRoute__mask {
      opacity: 0.5;
    }
  }
  .topRoute__mask {
    transition: all 0.3s;
  }
}
.topRoute__text {
  text-shadow: 0.1em 0.2em 0.3em black;
}
</style>
