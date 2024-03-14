<script lang='ts' setup>
import { CopyDocument } from '@element-plus/icons-vue';
import ColorLayoutCard from './components/ColorLayoutCard.vue';
import useColorsStore, { ColorTypeEnum } from './hook/useColorsStore';
import tinycolor from 'tinycolor2';
import { storeToRefs } from 'pinia';

const { formatCurrentColorCore } = storeToRefs(useColorsStore())
const { copyColor } = useColorsStore()

const colorTypeArr: ColorTypeEnum[] = [
  ColorTypeEnum.HEX,
  ColorTypeEnum.HEX8,
  ColorTypeEnum.RGB,
  ColorTypeEnum.RGBA,
  ColorTypeEnum.HSL,
  ColorTypeEnum.HSLA,
  ColorTypeEnum.HSV,
  ColorTypeEnum.HSVA,
]
const getStringBgColor = (type: ColorTypeEnum) => {
  const { r, g, b, alpha, hex, hue, sl_s, sv_s, l, v } = formatCurrentColorCore.value;
  const a = alpha / 100;
  switch (type) {
    case ColorTypeEnum.HEX: return `#${hex}`
    case ColorTypeEnum.RGB: return `rgb(${r}, ${g}, ${b})`
    case ColorTypeEnum.HSL: return `hsl(${hue}, ${sl_s}%, ${l}%)`
    case ColorTypeEnum.HSV: return `hsv(${hue}, ${sv_s}%, ${v}%)`
    case ColorTypeEnum.HEX8: return tinycolor({ r, g, b, a }).toHex8String()
    case ColorTypeEnum.RGBA: return `rgba(${r}, ${g}, ${b}, ${a})`
    case ColorTypeEnum.HSLA: return `hsla(${hue}, ${sl_s}%, ${l}%, ${a})`
    case ColorTypeEnum.HSVA: return `hsva(${hue}, ${sv_s}%, ${v}%, ${a})`
  }
}


</script>

<template>
  <ColorLayoutCard class="min-h-[240px] max-h-[500px]" title="格式坞">
    <div class="pt-3 flex flex-col gap-4 px-4 w-full">
      <!-- <ElInput class="switch-input" :prefixIcon="Switch" /> -->
      <div class="grid grid-cols-2 gap-2">
        <ElInput
          class="text-input rounded"
          v-for="item in colorTypeArr"
          :value="getStringBgColor(item)"
          :key="item"
        >
          <template #prepend>{{ item }}</template>
          <template #append>
            <ElIcon class="cursor-pointer hover:text-slate-300 transition-colors"  @click="copyColor(getStringBgColor(item))"><CopyDocument /></ElIcon>
          </template>
        </ElInput>
      </div>
    </div>
  </ColorLayoutCard>
</template>

<style lang='scss' scoped>

::v-deep(.el-radio) {
  margin-right: 12px;
}


</style>