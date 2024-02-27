<script lang='ts' setup>
import ScssPage from './scss-page.vue';
import CssPage from './css-page.vue';
import { ref } from 'vue';

const value = ref('');

</script>

<template>
  <div class="text-2xl mb-6">Scss 转 CSS(未完成)</div>
  <!-- <iframe src="https://www.sassmeister.com/" class="w-full h-full rounded-xl overflow-hidden shadow-2xl border max-w-[1440px]"></iframe> -->

  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1440px] p-4 flex gap-4">
    <ScssPage v-model="value" />
    <CssPage :value="value" />
  </div>
</template>

<style lang='scss' scoped>
</style>