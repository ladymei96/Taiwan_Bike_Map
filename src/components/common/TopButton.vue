<script setup>
import topIcon from '@/statics/assets/icons/Arrow_top.svg';

const backTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<template>
  <button @click="backTop">
    <img width="50" :src="topIcon" alt="top icon" />
  </button>
</template>
