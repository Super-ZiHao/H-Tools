<!-- 输入控件 -->
<script lang='ts' setup>
import useColorsStore, { UpdateColorTypeEnum } from '../hook/useColorsStore';
import { CopyDocument } from '@element-plus/icons-vue';
import NumberInput from './NumberInput.vue';
import useHistoryColor from '../hook/useHistoryColor';
import tinycolor from 'tinycolor2';
import { computed } from 'vue';

const { updateColor, copyColor, currentColorCore } = useColorsStore();
const { saveHistoryColor } = useHistoryColor();

const hslString = computed(() => `hsla(${currentColorCore.hue}, ${currentColorCore.sl_s}%, ${currentColorCore.l}%, ${currentColorCore.alpha}%)`);

const handlerSave = () => {
  saveHistoryColor({ r: currentColorCore.r, g: currentColorCore.g, b: currentColorCore.b, a: currentColorCore.alpha / 100 })
  ElNotification({
    title: '保存成功',
    message: '颜色已保存到历史记录',
    type: 'success',
    showClose: false,
  })
}
</script>

<template>
  <div class="pt-3 pr-5 pb-4 flex flex-col justify-between flex-1">
    <div class="rounded-md overflow-hidden">
      <div class="color-palette w-full h-28 relative overflow-hidden"></div>
      <ElInput class="text-input overflow-hidden" v-model="currentColorCore.hex" maxlength="6" @input="(v) => (!!tinycolor(v).getFormat() && updateColor('hex8' , v, [UpdateColorTypeEnum.HEX]))">
        <template #prepend>#</template>
        <template #append>
          <ElIcon class="cursor-pointer hover:text-slate-300 transition-colors" @click="copyColor(`#${currentColorCore.hex}`)">
            <CopyDocument />
          </ElIcon>
        </template>
      </ElInput>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <NumberInput v-model="currentColorCore.r" title="R" :max="255" @change="() => updateColor('rgba')" />
      <NumberInput v-model="currentColorCore.g" title="G" :max="255" @change="updateColor('rgba')" />
      <NumberInput v-model="currentColorCore.b" title="B" :max="255" @change="updateColor('rgba')" />
      <NumberInput v-model="currentColorCore.hue" title="H" :max="360" @change="updateColor('hsva')" />
      <NumberInput v-model="currentColorCore.sv_s" title="S" :max="100" @change="updateColor('hsva')" />
      <NumberInput v-model="currentColorCore.v" title="V" :max="100" @change="updateColor('hsva')" />
      <NumberInput v-model="currentColorCore.sl_s" title="S" :max="100" @change="updateColor('hsla')" />
      <NumberInput v-model="currentColorCore.l" title="L" :max="100" @change="updateColor('hsla')" />
    </div>
    <ElButton type="primary" @click="handlerSave">
      保存颜色
    </ElButton>
  </div>
</template>

<style lang='scss' scoped>
/* 透明滑块 */
$grid-1: #ccc;
$grid-2: transparent;

.color-palette {
  background-image: linear-gradient(45deg, $grid-1 25%, $grid-2 25%), linear-gradient(135deg, $grid-1 25%, $grid-2 25%), linear-gradient(45deg, $grid-2 75%, $grid-1 75%), linear-gradient(135deg, $grid-2 75%, $grid-1 75%);
  background-size: 12px 12px;
  background-position: 0 0, 6px 0, 6px -6px, 0 6px;

  background-color: rgb;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: v-bind(hslString);
  }
}


::v-deep(.el-input-number) {
  width: 100%;

  .el-input__inner {
    text-align: right;
  }

  .el-input__wrapper {
    border-radius: 0 4px 4px 0;
  }
}
</style>