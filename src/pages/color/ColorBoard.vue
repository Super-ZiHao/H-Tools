<script lang='ts' setup>
import ColorLayoutCard from './components/ColorLayoutCard.vue';
import BrightnessControl from './components/BrightnessControl.vue';
import ToneControl from './components/ToneControl.vue';
import OpacityControl from './components/OpacityControl.vue';
import InputColoControl from './components/InputColoControl.vue';
import { ref } from 'vue';

const SIZE = 50;
const SIZE_PX = `${SIZE}px`
const PIE_SIZE = '10px';

enum SV_TYPE_ENUM {
  L = 'hsl',
  V = 'hsv',
}
const SVType = ref<SV_TYPE_ENUM>(SV_TYPE_ENUM.V);

</script>

<template>
  <ColorLayoutCard class="color-board" body-class="color-board-body flex" title="色彩编辑器">
    <div class="flex flex-col gap-1 relative">
      <div class="color-mixer relative aspect-square flex-shrink-0">
        <!-- 饱和度亮度板 -->
        <BrightnessControl :sizeString="SIZE_PX" :pieSizeString="PIE_SIZE" />
        <!-- 色调环 -->
        <ToneControl :sizeString="SIZE_PX" :pieSizeString="PIE_SIZE" :borderSize="SIZE / 2" />
      </div>
      <!-- 透明度 -->
      <OpacityControl />

      <!-- 模式  -->
      <div
        :class="`mode-btn btn-v ${SVType === SV_TYPE_ENUM.V ? 'active' : ''} select-none transition-all absolute text-white flex items-center justify-center rounded-full cursor-pointer`"
        @mousedown="(e) => e.stopPropagation()">V</div>
      <div
        :class="`mode-btn btn-l ${SVType === SV_TYPE_ENUM.L ? 'active' : ''} select-none transition-all absolute text-white flex items-center justify-center rounded-full cursor-pointer`"
        @mousedown="(e) => e.stopPropagation()">L</div>
    </div>
    <!-- 输入控件 -->
    <InputColoControl />
  </ColorLayoutCard>
</template>

<style lang='scss'>
.color-board {
  max-height: 446px;

  .color-mixer {
    width: 340px;
    height: 340px;
  }
}

.mode-btn {
  width: 13%;
  aspect-ratio: 1;
  background: linear-gradient(145deg, #53595d, #464b4e);
  box-shadow: 5px 5px 5px #1f2123,
    -5px -5px 5px #7d858b;

  &:active,
  &.active {
    background: #4e5357;
    box-shadow: inset 9px 9px 18px #1f2123,
      inset -9px -9px 18px #7d858b;
  }

  &.btn-v {
    left: 2.4%;
    top: 2.4%;
  }
  &.btn-l {
    right: 2.4%;
    top: 2.4%;
  }
}

@container color-container (max-width: 600px) {
  .color-board {
    max-height: unset;

    .color-mixer {
      width: 100%;
      height: auto;
    }
  }

  .color-board-body {
    // 颜色
    flex-direction: column;
  }
}
</style>