<!-- 饱和度亮度板 - 控件 -->
<script lang='ts' setup>
import { ref, defineProps } from 'vue';
import useColorsStore from '../hook/useColorsStore';
import { storeToRefs } from 'pinia';

defineProps<{
  sizeString: string;
  pieSizeString: string;
}>()

const { sv, hue } = storeToRefs(useColorsStore());
const { updateColor } = useColorsStore()
const squareRef = ref<HTMLDivElement>();
const handlerChangeOffset = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  if (!squareRef.value) return
  const {left, top, right, bottom, width, height } = squareRef.value.getBoundingClientRect();
  let s = sv.value.s, v = sv.value.v
  const { clientX, clientY } = e;
  if (clientX >= left && clientX <= right) {
    s = (clientX - left) / width * 100;
  } else if (clientX > right) {
    s = 100;
  } else {
    s = 0;
  }
  if (clientY >= top && clientY <= bottom) {
    v = (1 - ((clientY - top) / height)) * 100;
  } else if (clientY > bottom) {
    v = 0;
  } else {
    v = 100;
  }
  updateColor({ sv: { s, v } }, true)
}

const handlerSquareDown = (e: MouseEvent) => {
  handlerChangeOffset(e)
  document.body.addEventListener('mousemove', handlerChangeOffset)
  const up = () => {
    document.body.removeEventListener('mousemove', handlerChangeOffset)
    document.body.removeEventListener('mouseup', up)
  }
  document.body.addEventListener('mouseup', up)
}

</script>

<template>
  <div
    class="square-chart cursor-pointer absolute z-10 rounded-xl overflow-hidden"
    :style="`background-color: hsl(${hue}, 100%, 50%);`"
    @mousedown="handlerSquareDown"
    ref="squareRef"
  >
    <div
      class="square-drag-btn pointer-events-none absolute translate-x-[-8px] translate-y-[-8px] w-4 h-4 rounded-full z-10"
      :style="{ left: `${sv.s}%`, top: `${(100 - sv.v)}%` }"
    ></div>
  </div>
</template>

<style lang='scss' scoped>
$size: v-bind(sizeString);
$pieSize: v-bind(pieSizeString);

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
</style>