<script lang='ts' setup>
import { computed, defineProps } from 'vue';
import tinycolor2, { ColorInputWithoutInstance } from 'tinycolor2';
import useColorsStore, { ColorTypeEnum } from '../hook/useColorsStore';
import { CopyDocument } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
const props = defineProps<{
  color?: ColorInputWithoutInstance
}>()

const { currentFormat } = storeToRefs(useColorsStore())
const { updateColor, copyColor } = useColorsStore();

const stringBgColor = computed(() => {
  const color = tinycolor2(props.color);
  const alpha = color.getAlpha();
  switch (currentFormat.value) {
    case ColorTypeEnum.HEX: return alpha === 1 ? color.toHexString() : color.toHex8String();
    case ColorTypeEnum.RGB: return color.toRgbString()
    case ColorTypeEnum.HSL: return color.toHslString()
    case ColorTypeEnum.HSV: return color.toHsvString()
    default: return color.toHexString()
  }
})

const previewBgColor = computed(() => tinycolor2(props.color).toRgbString());

const handlerCopy = (e: MouseEvent) => {
  e.stopPropagation();
  copyColor(stringBgColor.value)
}


</script>

<template>
  <div class="color-card cursor-pointer transition-transform" @click="updateColor('auto', color)" v-bind="$attrs">
    <!-- 中间文字 -->
    <div class="hex-string absolute w-full h-full left-0 top-0 p-2 z-10 flex items-center justify-center text-white mix-blend-difference" style="font-size:  12px;">{{ stringBgColor }}</div>
    <!-- 复制按钮 -->
    <ElTooltip
      placement="top"
      :content="stringBgColor"
    >
      <div class="color-card-copy absolute top-0 right-0 z-20 px-3 rounded-bl-md transition-all text-white py-[2px]" @click="handlerCopy">
        <ElIcon><CopyDocument /></ElIcon>
      </div>
    </ElTooltip>
  </div>
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
    background-color: v-bind(previewBgColor);
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