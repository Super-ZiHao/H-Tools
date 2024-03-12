<script lang='ts' setup>
import { computed, defineProps } from 'vue';
import tinycolor2, { ColorInputWithoutInstance } from 'tinycolor2';
import useColorsStore from '../hook/useColorsStore';
import { CopyDocument } from '@element-plus/icons-vue';
const props = defineProps<{
  color?: ColorInputWithoutInstance
}>()

const { updateColor, copyColor } = useColorsStore();
const backgroundColor = computed(() => {
  const color = tinycolor2(props.color);
  const alpha = color.getAlpha();
  if (alpha === 1) {
    return color.toHexString();
  }
  return color.toHex8String();
});

const handlerCopy = (e: MouseEvent) => {
  e.stopPropagation();
  copyColor(tinycolor2(props.color).toRgbString())
}


</script>

<template>
  <div class="color-card cursor-pointer transition-transform" @click="updateColor('auto', color)" v-bind="$attrs" v-if="!!color">
    <div class="hex-string absolute inset-0 z-10 flex items-center justify-center text-white mix-blend-difference">{{ backgroundColor }}</div>

    <div class="color-card-copy absolute top-0 right-0 z-20 px-3 rounded-bl-md transition-all text-white py-1" @click="handlerCopy">
      <ElIcon><CopyDocument /></ElIcon>
    </div>
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

  .color-card-copy {
    opacity: 0;
    background-color: rgba($color: #000000, $alpha: .3);
    &:hover {
      background-color: rgba($color: #000000, $alpha: .6);
    }
  }
  &:hover .color-card-copy{
    opacity: 1;
  }
}

</style>