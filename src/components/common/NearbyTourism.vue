<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';
import Card from '@/components/common/Card.vue';

import Arrow_prev from '@/statics/assets/icons/Arrow_prev.svg';
import Arrow_next from '@/statics/assets/icons/Arrow_next.svg';
import { computed, ref } from 'vue';

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

const allList = computed(() => {
  if (props.tourismList.length <= 3) {
    return props.tourismList;
  }
  const ary = [];
  const total = props.tourismList.length;
  let count;
  while (total > 0 && ary.length < 3 + 4) {
    count = Math.floor(ary.length / total);
    for (let i = 0; i < total; i++) {
      const id = `${count}-${props.tourismList[i].name}`;
      ary.push({ ...props.tourismList[i], id });
    }
  }
  return ary;
});
const showList = computed(() => {
  if (allList.value.length <= 3) {
    return allList.value;
  }
  const start = currentIndex.value - 2;
  return allList.value.slice(start).concat(allList.value.slice(0, start));
});
const isButtonDisable = computed(() => {
  return showList.value.length <= 3;
});

const changeIndex = change => {
  currentIndex.value =
    (currentIndex.value + change + showList.value.length) %
    showList.value.length;
};
</script>

<template>
  <BlockWrap :title="title">
    <main class="px-10 sm:px-16 lg:px-28">
      <div class="flex justify-end space-x-3 mb-8">
        <button
          :class="{ 'cursor-not-allowed': isButtonDisable }"
          @click="changeIndex(-1)"
          :disabled="isButtonDisable"
        >
          <img
            :class="{ 'saturate-0': isButtonDisable }"
            :src="Arrow_prev"
            alt="arrowPrev"
            width="40"
          />
        </button>
        <button
          :class="{ 'cursor-not-allowed': isButtonDisable }"
          @click="changeIndex(1)"
          :disabled="isButtonDisable"
        >
          <img
            :class="{ 'saturate-0': isButtonDisable }"
            :src="Arrow_next"
            alt="arrowNext"
            width="40"
          />
        </button>
      </div>
      <div v-if="showList.length" class="w-full flex overflow-hidden">
        <TransitionGroup
          class="flex w-full"
          :class="{ 'NearbyTourism__card--margin': showList.length > 3 }"
          name="list"
          tag="div"
        >
          <Card
            class="card__item"
            :class="{ 'NearbyTourism__card--hidden': showList.length > 3 }"
            v-for="item in showList"
            :key="item.id"
            :singleTourismData="item"
          />
        </TransitionGroup>
      </div>
      <p
        v-else
        class="h-80 bg-gray-300 text-white text-6xl font-bold flex items-center justify-center"
      >
        No Data
      </p>
    </main>
  </BlockWrap>
</template>
<style lang="scss" scoped>
.list-move {
  transition: all 0.5s ease;
}
.NearbyTourism__card--margin {
  margin-left: calc(-1 * 100% * 2);
  @media (min-width: 1024px) {
    margin-left: calc(-1 * 100% / 2 * 2);
  }
  @media (min-width: 1280px) {
    margin-left: calc(-1 * 100% / 3 * 2);
  }
}
.card__item {
  flex: calc(100% - 20px) 0 0;
  margin: 0px 10px;
  @media (min-width: 1024px) {
    flex: calc(50% - 20px) 0 0;
  }
  @media (min-width: 1280px) {
    flex: calc((100% / 3) - 20px) 0 0;
  }
}
.NearbyTourism__card--hidden:first-child,
.NearbyTourism__card--hidden:last-child {
  z-index: -1;
  visibility: hidden;
}
</style>
