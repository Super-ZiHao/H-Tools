<script lang='ts' setup>
import { reactive } from 'vue';
import Draggable, { ImgInfoType } from '../sprite/draggable.vue';
import Json from './json.vue';

const imgInfoArr = reactive<ImgInfoType[]>([]);

</script>

<template>
  <div class="text-2xl mb-6 text-[#5C8374]">在线转 base64（图片）</div>
  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1440px] p-4 flex gap-4 overflow-hidden">
    <!-- 上传图片 -->
    <Draggable v-model="imgInfoArr" />
    <!-- 解析结果 -->
    <Json :data="imgInfoArr" />
  </div>
</template>

<style lang='scss' scoped>

</style>