<script lang='ts' setup>
import ColorLayoutCard from './components/ColorLayoutCard.vue';
import ColorCard from './components/ColorCard.vue';
import useHistoryColor from './hook/useHistoryColor';
import { storeToRefs } from 'pinia';

const { historyColor } = storeToRefs(useHistoryColor());

</script>

<template>
  <ColorLayoutCard title="历史保存" sub-title="最多保存 20 种颜色">
    <div class="card-container p-4 gap-4">
      <ColorCard class="w-full hover:scale-110 aspect-square rounded-md" v-for="item in historyColor" :color="item" :key="String(item)" />
    </div>
  </ColorLayoutCard>
</template>

<style lang='scss' scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>