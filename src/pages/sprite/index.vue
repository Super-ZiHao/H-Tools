<script lang='ts' setup>
import { reactive } from 'vue';
import draggable, { ImgInfoType } from './draggable.vue';

/** 以放入图片数据 */
const imgInfoArr = reactive<ImgInfoType[]>([]);

</script>

<template>
  <div class=" text-2xl mb-6">雪碧图生成器</div>
  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1440px] p-4 flex gap-4 overflow-hidden">
    <draggable  v-model="imgInfoArr"></draggable>
    <div class="w-full h-full border-[3px] rounded-md border-cyan-400 overflow-auto">
      <TransitionGroup class="w-fit" tag="div" name="list">
        <img
          class="transition-all"
          style="transition: all .3s;"
          v-for="info in imgInfoArr"
          :key="info.id"
          :src="info.url"
          draggable="false"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang='scss'>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>