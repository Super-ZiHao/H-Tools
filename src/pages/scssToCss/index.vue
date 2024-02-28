<script lang='ts' setup>
import CssPage from './css-page.vue';
import CodeEditor from '@/components/code-editor/index.vue';
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <div class="text-2xl mb-6 text-[#5C8374]">Scss 转 CSS(未完成)</div>
  <!-- <iframe src="https://www.sassmeister.com/" class="w-full h-full rounded-xl overflow-hidden shadow-2xl border max-w-[1440px]"></iframe> -->

  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1440px] p-4 flex gap-4">
    <!-- scss 编辑器 -->
    <div class="flex-1 h-full flex items-center flex-col gap-4">
      <div class="title">SCSS</div>
      <CodeEditor language="scss" @change="(v) => value = v" />
    </div>
    <!-- css 展示区 -->
    <div class="flex-1 h-full flex items-center flex-col gap-4">
      <div class="title">CSS</div>
      <CssPage :value="value" />
    </div>
  </div>
</template>

<style lang='scss' scoped>

.title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: #AC7D88;
}
</style>