<!-- 透明度 - 控件 -->
<script lang='ts' setup>
import { storeToRefs } from 'pinia';
import useColorsStore from '../hook/useColorsStore';

const { opacity, hue } = storeToRefs(useColorsStore());

</script>

<template>
  <div class="flex items-center px-14">
    <ElSlider v-model="opacity" height="200px" :style="`--background-color: hsl(${hue}, 100%, 50%)`" />
  </div>
</template>

<style lang='scss' scoped>
/* 透明滑块 */
$grid-1: #ccc;
$grid-2: transparent;
::v-deep(.el-slider) {
  --el-slider-height: 22px;
  --el-slider-button-wrapper-offset: -8px;
  .el-slider__button-wrapper {
    translate: 10% 0;
    .el-slider__button {
      border-color: white;
      width: 10px;
      height: 26px;
      border-radius: 999px;
    }
  }
  .el-slider__runway {
    position: relative;
    background-color: unset;
    border: 1px solid white;
    background-image:
    linear-gradient(45deg, $grid-1 25%, $grid-2 25%), linear-gradient(135deg, $grid-1 25%, $grid-2 25%), linear-gradient(45deg, $grid-2 75%, $grid-1 75%), linear-gradient(135deg, $grid-2 75%, $grid-1 75%);

    background-size: 12px 12px;
    background-position: 0 0,6px 0,6px -6px,0 6px;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(to left, var(--background-color, red), rgba(0, 0, 0, 0));
    }
  }
  .el-slider__bar {
    background-color: transparent;
  }

}
</style>