<script lang='ts' setup>
import ColorLayoutCard from './components/ColorLayoutCard.vue';
import ColorCard from './components/ColorCard.vue';
import useHistoryColor from './hook/useHistoryColor';
import { storeToRefs } from 'pinia';

const { historyColor } = storeToRefs(useHistoryColor());

</script>

<template>
  <ColorLayoutCard title="历史保存" sub-title="最多保存 20 种颜色">
    <div class="grid-container grid w-full h-fit p-4 gap-4">
      <ColorCard class="w-full h-full aspect-square rounded-md" v-for="item in historyColor" :color="item" :key="String(item)" />
    </div>
  </ColorLayoutCard>
</template>

<style lang='scss' scoped>
.grid-container {
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
}
</style>