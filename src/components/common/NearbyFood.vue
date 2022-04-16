<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';
import { ref } from 'vue';

const title = ref('附近美食');
</script>

<template>
  <BlockWrap :title="title"> </BlockWrap>
</template>
