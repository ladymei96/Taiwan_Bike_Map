<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';
import Card from '@/components/common/Card.vue';

import Arrow_prev from '@/statics/assets/icons/Arrow_prev.svg';
import Arrow_next from '@/statics/assets/icons/Arrow_next.svg';
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  tourismList: {
    type: Array,
    default() {
      return [];
    }
  }
});

const currentIndex = ref(0);

const changeIndex = change => {
  currentIndex.value =
    (currentIndex.value + change + props.tourismList.length) %
    props.tourismList.length;
};
</script>

<template>
  <BlockWrap :title="title">
    <main class="px-28">
      <div class="flex justify-end mb-8">
        <button class="mr-2" @click="changeIndex(-1)">
          <img :src="Arrow_prev" alt="arrowPrev" width="40" />
        </button>
        <button @click="changeIndex(1)">
          <img :src="Arrow_next" alt="arrowNext" width="40" />
        </button>
      </div>
      <!-- 排版先稍微寫死 -->
      <TransitionGroup
        class="w-1/3 h-96 relative overflow-hidden"
        tag="div"
        name="right-in"
      >
        <Card
          class="absolute"
          v-for="(item, index) in tourismList"
          :key="item.name"
          :singleTourismData="item"
          v-show="currentIndex === index"
        />
      </TransitionGroup>
    </main>
  </BlockWrap>
</template>
<style scoped>
.right-in-enter-from {
  left: 100%;
}
.right-in-enter-active,
.right-in-leave-active {
  transition: left 0.5s ease;
}
.right-in-enter-to,
.right-in-leave-from {
  left: 0%;
}
.right-in-leave-to {
  left: -100%;
}
</style>
