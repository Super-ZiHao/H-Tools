<!-- 调色板 -->
<script lang='ts' setup>
import useSquare from './hook/useSquare';
import usePie from './hook/usePie';
import useColorsStore from './hook/useColorsStore';

const SIZE = 50;
const SIZE_PX = `${SIZE}px`

const { hsl } = useColorsStore();

/** 调色板 */
const { squareDargPosition, squareRef } = useSquare();
/** 色调环 */
const { pieDargPosition, pieRef } = usePie(SIZE / 2);

</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-16 bg-[#222222] rounded-t-xl flex items-center pl-6 select-none text-white text-md">十六进制颜色选择器</div>
    <div class="w-full h-[calc(100%-4em)] rounded-b-xl relative bg-[#4d5358]">
      <!-- 调色板 -->
      <div
        class="square-chart cursor-pointer absolute z-10 rounded-xl overflow-hidden"
        :style="`background-color: hsl(${hsl.h}, 100%, 50%);`"
        ref="squareRef"
      >
        <div
          class="square-drag-btn pointer-events-none absolute left-[-10px] top-[-10px] w-5 h-5 rounded-full z-10"
          :style="{transform: `translate(${squareDargPosition.left}px, ${squareDargPosition.top}px)`}"
        ></div>
      </div>
      <!-- 色调环 -->
      <div class="pie-chart shadow-md" ref="pieRef">
        <div class="pie-chart-mask" @mousedown="(e) => e.stopPropagation()"></div>
        <div
          class="pie-drag-btn shadow-md bg-white border-2 cursor-pointer absolute rounded-full z-10"
          :style="{transform: `translate(${pieDargPosition.left}px, ${pieDargPosition.top}px)`}"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
$size: v-bind(SIZE_PX);
$borderSize: calc($size / 2);
$pieSize: 20px;
/* 亮度版 */
.square-chart {
  left: 50%;
  top: 50%;
  width: calc((100% - $size - ($pieSize * 2)) / 1.4142135623730951);
  height: calc((100% - $size - ($pieSize * 2)) / 1.4142135623730951);
  transform: translate(-50%,-50%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    display: block;
  }

  &::before {
    background: linear-gradient(to right, #fff, rgba(0, 0, 0, 0));
  }
  &::after {
    background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
  }
  .square-drag-btn {
    background: radial-gradient(transparent 40%, white 0%);
  }
}


/* 圆盘 */
.pie-chart {
  --red: #ff0000;
  --blue: #0000ff;
  --yellow: #ffff00;
  --green: #00ff00;
  position: absolute;
  inset: $pieSize;
  border-radius: 50%;
  /* background: conic-gradient(#00ff00, blue, red, #00ff00); */

  background: conic-gradient(
    hsl(270, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(330, 100%, 50%),
    hsl(0, 100%, 50%),
    hsl(30, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(150, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(210, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(270, 100%, 50%),
    );

  .pie-chart-mask {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100% - $size);
    height: calc(100% - $size);
    background-color: #4d5358;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .pie-drag-btn {
    width: $borderSize;
    height: $borderSize;
  }
}
</style>