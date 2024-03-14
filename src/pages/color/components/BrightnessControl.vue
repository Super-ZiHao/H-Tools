<!-- 饱和度亮度板 - 控件 -->
<script lang='ts' setup>
import { ref, defineProps } from 'vue';
import useColorsStore, { UpdateColorTypeEnum } from '../hook/useColorsStore';
import { computed } from 'vue';

defineProps<{
  sizeString: string;
  pieSizeString: string;
}>()

const { updateColor, currentColorCore } = useColorsStore()
const squareRef = ref<HTMLDivElement>();

const handlerChangeOffset = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  if (!squareRef.value) return
  const { left, top, width, height } = squareRef.value.getBoundingClientRect();
  const { clientX, clientY } = e;
  const xRatio = (clientX - left) / width;
  const yRatio = (clientY - top) / height;
  const s = Math.min(100, Math.max(0, xRatio * 100));
  const v = Math.min(100, Math.max(0, (1 - yRatio) * 100));

  /**
   * 特殊情况，需要在外部修改值!!!!!!!!!!!!!!!!!!
   * 鉴于 vue 双向绑定，尽量不要在外面直接修改 store 中的值，会为以后留下坑
  */
  currentColorCore.sv_s = s;
  currentColorCore.v = v;
  updateColor('hsva', {}, [UpdateColorTypeEnum.HSV, UpdateColorTypeEnum.HUE])
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

// 计算滑块位移
const translate = computed(() => {
  if (!squareRef.value) return '';
  return `translate(${currentColorCore.sv_s / 100 * squareRef.value.offsetWidth}px, ${((100 - currentColorCore.v) / 100) * squareRef.value.offsetHeight}px)`
})
</script>

<template>
  <div
    class="square-chart aspect-square cursor-pointer absolute z-10 rounded-xl overflow-hidden"
    :style="`background-color: hsl(${currentColorCore.hue}, 100%, 50%);`"
    @mousedown="handlerSquareDown"
    ref="squareRef"
  >
    <div
      class="square-drag-btn pointer-events-none absolute left-[-8px] top-[-8px] w-4 h-4 rounded-full z-10"
      :style="{ transform: translate }"
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
    background: radial-gradient(transparent 30%, white 0%);
    mix-blend-mode: difference;
  }
}
</style>