<!-- 输入控件 -->
<script lang='ts' setup>
import useColorsStore from '../hook/useColorsStore';
import { storeToRefs } from 'pinia';
import { CopyDocument } from '@element-plus/icons-vue';
import NumberInput from './NumberInput.vue';
import useHistoryColor from '../hook/useHistoryColor';

const { hslString, hue, sl, sv, hex, rgb, opacity } = storeToRefs(useColorsStore());
const { updateColor } = useColorsStore();
const { saveHistoryColor } = useHistoryColor();

const handlerSave = () => {
  saveHistoryColor({ ...rgb.value, a: opacity.value / 100 })
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
      <ElInput class="hex-input overflow-hidden" v-model="hex" maxlength="6" @input="(v: string) => updateColor({ hex: v })">
        <template #prepend>#</template>
        <template #append>
          <ElIcon>
            <CopyDocument />
          </ElIcon>
        </template>
      </ElInput>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <NumberInput v-model="rgb.r" title="R" :max="255" @change="(r) => updateColor({ rgb: { r } })" />
      <NumberInput v-model="rgb.g" title="G" :max="255" @change="(g) => updateColor({ rgb: { g } })" />
      <NumberInput v-model="rgb.b" title="B" :max="255" @change="(b) => updateColor({ rgb: { b } })" />
      <NumberInput v-model="hue" title="H" :max="360" @change="(hue) => updateColor({ hue })" />
      <NumberInput v-model="sv.s" title="S" :max="100" @change="(s) => updateColor({ sv: { s } })" />
      <NumberInput v-model="sv.v" title="V" :max="100" @change="(v) => updateColor({ sv: { v } })" />
      <NumberInput v-model="sl.s" title="S" :max="100" @change="(s) => updateColor({ sl: { s } })" />
      <NumberInput v-model="sl.l" title="L" :max="100" @change="(l) => updateColor({ sl: { l } })" />
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

::v-deep(.el-input) {
  &.hex-input {
    --el-border-radius-base: 0px;

    input {
      text-align: center;
    }
  }

  --el-input-focus-border-color: 'transparent';
  --el-input-border-color: 'transparent';
  --el-input-hover-border-color: 'transparent';
  --el-input-bg-color: #707b80;
  caret-color: white;

  .el-input-group__prepend,
  .el-input-group__append {
    user-select: none;
    padding: 0;
    width: 32px;
    flex-shrink: 0;
    background-color: var(--el-input-bg-color);
    color: #a9b4bc;
  }

  .el-input__inner {
    color: white;
  }
}</style>