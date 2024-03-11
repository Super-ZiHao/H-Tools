<script lang='ts' setup>
import { computed, defineProps } from 'vue';
import tinycolor2 from 'tinycolor2';
import useColorsStore from '../hook/useColorsStore';
import { divideAngle } from '../utils'
const props = defineProps<{
  color?: { r: number; g: number; b: number; a: number };
}>()

const { updateColor, updateOpacity } = useColorsStore();
const backgroundColor = computed(() => {
  const color = tinycolor2(props.color);
  if (props.color?.a === 1) {
    return color.toHexString();
  }
  return color.toHex8String();
});

const handlerClick = () => {
  updateColor({ rgb: props.color }, true);
  updateOpacity((props.color?.a ?? 1) * 100);
}

</script>

<template>
  <div class="color-card cursor-pointer transition-transform" @click="handlerClick" v-bind="$attrs" v-if="!!color">
    <div class="hex-string absolute inset-0 z-10 flex items-center justify-center text-white mix-blend-difference">{{ backgroundColor }}</div>
  </div>
  <div class="bg-white" v-else></div>
</template>

<style lang='scss' scoped>
/* 透明滑块 */
$grid-1: #ccc;
$grid-2: transparent;

.color-card {
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(45deg, $grid-1 25%, $grid-2 25%), linear-gradient(135deg, $grid-1 25%, $grid-2 25%), linear-gradient(45deg, $grid-2 75%, $grid-1 75%), linear-gradient(135deg, $grid-2 75%, $grid-1 75%);
  background-size: 12px 12px;
  background-position: 0 0, 6px 0, 6px -6px, 0 6px;

  background-color: rgb;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: v-bind(backgroundColor);
  }

  .hex-string {
    position: absolute;
  }
}
</style>