<script lang='ts' setup>
import ColorLayoutCard from './components/ColorLayoutCard.vue';
import ColorCard from './components/ColorCard.vue';
import useHistoryColor, { MAX_LENGTH } from './hook/useHistoryColor';
import { storeToRefs } from 'pinia';
import useColorsStore, { ColorTypeEnum } from './hook/useColorsStore';
import { Plus } from '@element-plus/icons-vue';

const { currentFormat } = storeToRefs(useColorsStore())
const { historyColor } = storeToRefs(useHistoryColor());

</script>

<template>
  <ColorLayoutCard  class="max-h-[446px]" title="历史保存">
    <template #subTitle>
      <ElRadioGroup class="color-radio-group" v-model="currentFormat">
        <ElRadio :value="ColorTypeEnum.HEX" size="large">Hex</ElRadio>
        <ElRadio :value="ColorTypeEnum.RGB" size="large">RGB</ElRadio>
        <ElRadio :value="ColorTypeEnum.HSV" size="large">Hsv</ElRadio>
        <ElRadio :value="ColorTypeEnum.HSL" size="large">Hsl</ElRadio>
      </ElRadioGroup>
    </template>
    <div class="grid-container grid w-full h-fit p-4 gap-4">
      <ColorCard class="w-full h-full aspect-square rounded-md" v-for="item in historyColor" :color="item" :key="String(item)" />
      <div
        class="w-full h-full aspect-square rounded-md flex items-center justify-center text-white bg-[#989898]"
        v-for="(_item, idx) in MAX_LENGTH - historyColor.length"
        :key="idx"
      >
        <ElIcon size="24px"><Plus/></ElIcon>
      </div>
    </div>
  </ColorLayoutCard>
</template>

<style lang='scss' scoped>
.grid-container {
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
}

@container color-container (max-width: 600px) {
  ::v-deep(.color-radio-group) {
    .el-radio {
      margin-right: 12px;

      .el-radio__label {
        padding-left: 4px;
      }
    }
  }
}

@container color-container (max-width: 400px) {
  ::v-deep(.color-radio-group) {
    .el-radio {
      margin-right: 6px;
      .el-radio__label {
        padding-left: 2px;
      }
    }
  }
}
</style>