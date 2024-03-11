<script lang='ts' setup>
import { computed, ref } from 'vue';
import tinycolor2 from 'tinycolor2'
import ColorLayoutCard from './components/ColorLayoutCard.vue';
import useColorsStore from './hook/useColorsStore';
import { storeToRefs } from 'pinia';
import ColorCard from './components/ColorCard.vue';
import { divideAngle } from './utils';

const name = ref('0');
const { hsv, opacity } = storeToRefs(useColorsStore())
const color = computed(() => {
  const color = tinycolor2({...hsv.value, a: opacity.value / 100 });
  const [, h_120, h_240] = divideAngle(hsv.value.h, 3);
  const [, h_90, h_180, h_270] = divideAngle(hsv.value.h, 4);
  
  // 互补组合
  const color_0 = color.toRgb();

  // 三色组合
  const color_120 = tinycolor2({ h: h_120, s: hsv.value.s, v: hsv.value.v, a: opacity.value / 100 }).toRgb();
  const color_240 = tinycolor2({ h: h_240, s: hsv.value.s, v: hsv.value.v, a: opacity.value / 100 }).toRgb();

  // 四色组合
  const color_90 = tinycolor2({ h: h_90, s: hsv.value.s, v: hsv.value.v, a: opacity.value / 100 }).toRgb();
  const color_180 = tinycolor2({ h: h_180, s: hsv.value.s, v: hsv.value.v, a: opacity.value / 100 }).toRgb();
  const color_270 = tinycolor2({ h: h_270, s: hsv.value.s, v: hsv.value.v, a: opacity.value / 100 }).toRgb();
  return {
    color_0,
    color_120,
    color_240,
    color_90,
    color_180,
    color_270
  }
})

</script>

<template>
  <ColorLayoutCard>
    <ElTabs type="border-card" v-model="name">
      <ElTabPane class="flex gap-3" label="互补色" name="0">
        <ColorCard class="w-full h-full rounded-xl text-2xl hover:scale-[1.02]" :color="color.color_0" />
        <ColorCard class="w-full h-full rounded-xl text-2xl hover:scale-[1.02]" :color="color.color_180" />
      </ElTabPane>
      <ElTabPane class="flex gap-3" label="三色" name="1">
        <ColorCard class="w-full h-full rounded-xl text-xl hover:scale-[1.04]" :color="color.color_0" />
        <ColorCard class="w-full h-full rounded-xl text-xl hover:scale-[1.04]" :color="color.color_120" />
        <ColorCard class="w-full h-full rounded-xl text-xl hover:scale-[1.04]" :color="color.color_240" />
      </ElTabPane>
      <ElTabPane class="grid grid-cols-2 gap-3" label="四色" name="2">
        <ColorCard class="w-full h-full rounded-xl text-xl hover:scale-[1.06]" :color="color.color_0" />
        <ColorCard class="w-full h-full rounded-xl text-xl hover:scale-[1.06]" :color="color.color_90" />
        <ColorCard class="w-full h-full rounded-xl text-xl hover:scale-[1.06]" :color="color.color_180" />
        <ColorCard class="w-full h-full rounded-xl text-xl hover:scale-[1.06]" :color="color.color_270" />
      </ElTabPane>
    </ElTabs>
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