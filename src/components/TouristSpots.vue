<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';
import view_1 from '@/statics/assets/taiwanPhoto/view_1.jpg';
import view_2 from '@/statics/assets/taiwanPhoto/view_2.jpg';
import view_3 from '@/statics/assets/taiwanPhoto/view_3.jpg';
import view_4 from '@/statics/assets/taiwanPhoto/view_4.jpg';

import { ref } from 'vue';

const title = ref('旅途中美景');
const description = ref(
  '台灣的各個美景，都美不勝收。等你一同來發現這座寶島的奧妙！'
);
</script>
<template>
  <BlockWrap :title="title" :description="description">
    <div class="flex flex-col md:flex-row h-600px">
      <div class="flex w-full h-1/2 md:h-auto md:w-2/3">
        <img class="w-1/2 object-cover" :src="view_1" alt="" />
        <img class="w-1/2 object-cover" :src="view_2" alt="" />
      </div>
      <div class="flex-col w-full md:w-1/3">
        <img class="w-full h-1/4 md:h-1/2 object-cover" :src="view_3" alt="" />
        <img class="w-full h-1/4 md:h-1/2 object-cover" :src="view_4" alt="" />
      </div>
    </div>
  </BlockWrap>
</template>
