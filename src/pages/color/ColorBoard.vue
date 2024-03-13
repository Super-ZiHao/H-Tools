<script lang='ts' setup>
import ColorLayoutCard from './components/ColorLayoutCard.vue';
import BrightnessControl from './components/BrightnessControl.vue';
import ToneControl from './components/ToneControl.vue';
import OpacityControl from './components/OpacityControl.vue';
import InputColoControl from './components/InputColoControl.vue';

const SIZE = 50;
const SIZE_PX = `${SIZE}px`
const PIE_SIZE = '10px';

</script>

<template>
  <ColorLayoutCard class="color-board" body-class="color-board-body" title="颜色选择器">
    <div class="flex flex-col gap-1">
      <div class="relative aspect-square flex-shrink-0" style="width: 340px; height: 340px;">
        <!-- 饱和度亮度板 -->
        <BrightnessControl :sizeString="SIZE_PX" :pieSizeString="PIE_SIZE" />
        <!-- 色调环 -->
        <ToneControl :sizeString="SIZE_PX" :pieSizeString="PIE_SIZE" :borderSize="SIZE / 2" />
      </div>
      <!-- 透明度 -->
      <OpacityControl />
    </div>
    <!-- 输入控件 -->
    <InputColoControl />
  </ColorLayoutCard>
</template>

<style lang='scss'>
.color-board {
  max-height: 446px;
}
@container color-container (max-width: 600px) {
  .color-board {
    max-height: 700px;
  }
  .color-board-body { // 颜色
    flex-direction: column;
  }
}

</style>