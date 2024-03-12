<script lang='ts' setup>
import { reactive } from 'vue';
import draggable, { ImgInfoType } from './draggable.vue';
import SpriteImgs from './spriteImgs.vue';

/** 以放入图片数据 */
const imgInfoArr = reactive<ImgInfoType[]>([]);

</script>

<template>
  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1440px] p-4 flex gap-4 overflow-hidden m-auto">
    <!-- 上传图片 -->
    <draggable  v-model="imgInfoArr"></draggable>
    
    <!-- 处理图片 -->
    <SpriteImgs :data="imgInfoArr"></SpriteImgs>
  </div>
</template>

<style lang='scss'>
</style>