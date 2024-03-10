<script lang='ts' setup>
import { computed, ref } from 'vue';
import tinycolor2 from 'tinycolor2'
import ColorLayoutCard from './components/ColorLayoutCard.vue';
import useColorsStore from './hook/useColorsStore';
import { storeToRefs } from 'pinia';
import ColorCard from './components/ColorCard.vue';



const name = ref('0');
const { hsv, opacity } = storeToRefs(useColorsStore())
const color = computed(() => {
  const color = tinycolor2({...hsv.value, a: opacity.value / 100 });

  // 获取互补色
  const complementary = color.complement().toRgb();
  
  return {
    complementary,
  }
})

</script>

<template>
  <ColorLayoutCard>
    <ElTabs type="border-card" v-model="name">
      <ElTabPane label="互补色" name="0">
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.02]" :color="color.complementary" />
      </ElTabPane>
      <ElTabPane class="flex gap-3" label="三色" name="1">
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.04]" />
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.04]" />
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.04]" />
      </ElTabPane>
      <ElTabPane class="grid grid-cols-2 gap-3" label="四色" name="2">
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.06]" />
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.06]" />
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.06]" />
        <ColorCard class="w-full h-full rounded-xl hover:scale-[1.06]" />
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