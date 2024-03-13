<script lang='ts' setup>
import ColorLayoutCard from './components/ColorLayoutCard.vue';
import ColorCard from './components/ColorCard.vue';
import useHistoryColor from './hook/useHistoryColor';
import { storeToRefs } from 'pinia';
import useColorsStore, { ColorTypeEnum } from './hook/useColorsStore';

const { currentFormat } = storeToRefs(useColorsStore())
const { historyColor } = storeToRefs(useHistoryColor());

</script>

<template>
  <ColorLayoutCard  class="max-h-[446px]" title="历史保存">
    <template #subTitle>
      <ElRadioGroup v-model="currentFormat">
        <ElRadio :value="ColorTypeEnum.HEX" size="large">Hex</ElRadio>
        <ElRadio :value="ColorTypeEnum.RGB" size="large">RGB</ElRadio>
        <ElRadio :value="ColorTypeEnum.HSV" size="large">Hsv</ElRadio>
        <ElRadio :value="ColorTypeEnum.HSL" size="large">Hsl</ElRadio>
      </ElRadioGroup>
    </template>
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