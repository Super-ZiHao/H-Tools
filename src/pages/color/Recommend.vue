<script lang='ts' setup>
import ColorLayoutCard from './components/ColorLayoutCard.vue';
import useColorsStore, { ColorRecommendTypeEnum } from './hook/useColorsStore';
import { storeToRefs } from 'pinia';
import ColorCard from './components/ColorCard.vue';
import { Hide } from '@element-plus/icons-vue';
import { ElLink } from 'element-plus';
import { computed } from 'vue';
import { divideAngle } from './utils';

const { colorRecommendNumber } = storeToRefs(useColorsStore())
const { currentColorCore } = useColorsStore();
const hueRecommend = computed(() => divideAngle(currentColorCore.hue, colorRecommendNumber.value))

const getColor = (h: number) => ({ h, s: currentColorCore.sv_s, v: currentColorCore.v, a: currentColorCore.alpha / 100 })
</script>

<template>
  <ColorLayoutCard>
    <ElTabs type="border-card" v-model="colorRecommendNumber">
      <ElTabPane class="flex gap-3" label="互补色" :name="ColorRecommendTypeEnum.Complementary">
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.02]" v-for="h in hueRecommend" :color="getColor(h)" :key="h" />
      </ElTabPane>
      <ElTabPane class="flex gap-3" label="三色" :name="ColorRecommendTypeEnum.Triadic">
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.04]" v-for="h in hueRecommend" :color="getColor(h)" :key="h" />
      </ElTabPane>
      <ElTabPane class="grid grid-cols-2 gap-3" label="四色" :name="ColorRecommendTypeEnum.Tetradic">
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.06]" v-for="h in hueRecommend" :color="getColor(h)" :key="h" />
      </ElTabPane>
    </ElTabs>
    <ElLink
      :class="`${colorRecommendNumber === ColorRecommendTypeEnum.NULL ? 'text-blue-600' : 'text-gray-300 active:text-blue-400 hover:text-violet-300'} absolute right-8 top-4  transition-colors  cursor-pointer flex items-center gap-1`"
      :icon="Hide"
      :underline="false"
      @click="colorRecommendNumber = ColorRecommendTypeEnum.NULL"
    >隐藏</ElLink>
  </ColorLayoutCard>
</template>

<style lang='scss' scoped>
$header-height: 56px;
::v-deep(.el-tabs) {
  width: 100%;
  border-radius: .75rem;
  border: none;
  background-color: #4e5357;

  .el-tabs__nav-scroll {
    background-color: #222222;
  }
  .el-tabs__nav {
    background-color: #222222;
    height: $header-height;
    .el-tabs__item {
      height: 100%;
      border: none;
      color: #abb4bb;
      translate: 0 1px;
      &:hover {
        color: #abb4bb;
      }
      &.is-active {
        background-color: #727b7f;
        color: white;
      }
    }
  }

  .el-tabs__content {
    width: 100%;
    height: calc(100% - $header-height);
    padding: 0;
    .el-tab-pane {
      width: 100%;
      height: 100%;
      padding: 16px;
    }
  }
}
</style>