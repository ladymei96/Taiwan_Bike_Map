<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';

import Tainan from '@/statics/assets/taiwanPhoto/Tainan.jpg';
import Keelung from '@/statics/assets/taiwanPhoto/Keelung.jpg';
import Hualien from '@/statics/assets/taiwanPhoto/Hualien.jpg';
import Taitung from '@/statics/assets/taiwanPhoto/Taitung.jpg';

import { reactive, ref } from 'vue';

const title = ref('熱門路線');
const description = ref('選條路線，來個挑戰吧!');
const topRouteList = reactive([
  {
    routeName: '七股瀉湖自行車道',
    city: '臺南市',
    queryCity: 'Tainan',
    url: `bg-[url('src/statics/assets/taiwanPhoto/Tainan.jpg')]`,
    bgImage: `background-image: url(${Tainan})`
  },
  {
    routeName: '基隆市自行車道濱海支線路網',
    city: '基隆市',
    queryCity: 'Keelung',
    url: `bg-[url('src/statics/assets/taiwanPhoto/Keelung.jpg')]`, // :class="[item.url]"
    bgImage: `background-image: url(${Keelung})`
  },
  {
    routeName: '光復糖廠自行車道',
    city: '花蓮縣',
    queryCity: 'Hualien',
    url: `bg-[url('src/statics/assets/taiwanPhoto/Hualien.jpg')]`,
    bgImage: `background-image: url(${Hualien})`
  },
  {
    routeName: '三仙台自行車道',
    city: '臺東縣',
    queryCity: 'Taitung',
    url: `bg-[url('src/statics/assets/taiwanPhoto/Taitung.jpg')]`,
    bgImage: `background-image: url(${Taitung})`
  }
]);
</script>

<template>
  <BlockWrap :title="title" :description="description">
    <main class="grid gap-4 grid-cols-2 px-28">
      <div
        class="topRoute__item relative px-14 py-24 h-72 text-center text-white bg-gray-800 rounded-2xl bg-center saturate-70"
        :style="item.bgImage"
        v-for="item in topRouteList"
        :key="item.routeName"
      >
        <h1 class="topRoute__text mb-6 text-3xl font-bold relative z-20">
          {{ item.routeName }}
        </h1>
        <a
          class="topRoute__text text-3xl font-bold opacity-0 relative z-20"
          href="javascript:;"
          >See More ></a
        >
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
    a {
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
