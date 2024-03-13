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
  const color = tinycolor({ h: formatCurrentColorCore.value.hue, s: formatCurrentColorCore.value.sv_s /100, v: formatCurrentColorCore.value.v / 100, a: formatCurrentColorCore.value.alpha / 100});
  const notAlphaColor = tinycolor({ h: formatCurrentColorCore.value.hue, s: formatCurrentColorCore.value.sv_s /100, v: formatCurrentColorCore.value.v / 100 });
  switch (type) {
    case ColorTypeEnum.HEX: return notAlphaColor.toHexString()
    case ColorTypeEnum.RGB: return notAlphaColor.toRgbString()
    case ColorTypeEnum.HSL: return notAlphaColor.toHslString()
    case ColorTypeEnum.HSV: return notAlphaColor.toHsvString()
    case ColorTypeEnum.HEX8: return color.toHex8String()
    case ColorTypeEnum.RGBA: return `rgba(${formatCurrentColorCore.value.r}, ${formatCurrentColorCore.value.g}, ${formatCurrentColorCore.value.b}, ${formatCurrentColorCore.value.alpha / 100})`
    case ColorTypeEnum.HSLA: return `hsla(${formatCurrentColorCore.value.hue}, ${formatCurrentColorCore.value.sl_s}%, ${formatCurrentColorCore.value.l}%, ${formatCurrentColorCore.value.alpha / 100})`
    case ColorTypeEnum.HSVA: return `hsva(${formatCurrentColorCore.value.hue}, ${formatCurrentColorCore.value.sv_s}%, ${formatCurrentColorCore.value.v}%, ${formatCurrentColorCore.value.alpha / 100})`
  }
}


</script>

<template>
  <ColorLayoutCard class="min-h-[240px]" title="格式坞">
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