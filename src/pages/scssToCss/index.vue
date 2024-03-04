<script lang='ts' setup>
import CssPage from './css-page.vue';
import CodeEditor from '@/components/code-editor/index.vue';
import { ref } from 'vue';
import Title from '@/components/title.vue';

const value = ref('');
</script>

<template>
  <Title />
  <!-- <iframe src="https://www.sassmeister.com/" class="w-full h-full rounded-xl overflow-hidden shadow-2xl border max-w-[1440px]"></iframe> -->

  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1440px] p-4 flex gap-4">
    <!-- scss 编辑器 -->
    <div class="flex-1 h-full flex items-center flex-col gap-4 relative">
      <div class="absolute z-10 text-white rounded-md left-2 bottom-2 cursor-default select-none text-xs bg-orange-400 px-2 py-1">SCSS</div>
      <CodeEditor language="scss" @change="(v) => value = v" />
    </div>
    <!-- css 展示区 -->
    <div class="flex-1 h-full flex items-center flex-col gap-4 relative">
      <div class="absolute z-10 text-white rounded-md left-2 bottom-2 cursor-default select-none text-xs bg-orange-400 px-2 py-1">CSS</div>
      <CssPage :value="value" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>