<!-- 输入控件 -->
<script lang='ts' setup>
import useColorsStore from '../hook/useColorsStore';
import { storeToRefs } from 'pinia';
import { CopyDocument } from '@element-plus/icons-vue';
import { ElInput } from 'element-plus';

const { hslString, hue, sl, sv } = storeToRefs(useColorsStore());
</script>

<template>
  <div class="p-3 flex flex-col justify-between flex-1">
    <div class="rounded-md overflow-hidden">
      <div class="color-palette w-full h-28 relative overflow-hidden"></div>
      <ElInput class="overflow-hidden" style="--el-border-radius-base: '0px'">
        <template #prepend>#</template>
        <template #append>
          <ElIcon>
            <CopyDocument />
          </ElIcon>
        </template>
      </ElInput>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <ElInput :value="hue"><template #prepend>H</template></ElInput>
      <ElInput :value="sv.s"><template #prepend>S</template></ElInput>
      <ElInput :value="sv.v"><template #prepend>V</template></ElInput>
      <ElInput :value="sl.s"><template #prepend>S</template></ElInput>
      <ElInput :value="sl.l"><template #prepend>L</template></ElInput>
      <ElInput><template #prepend>R</template></ElInput>
      <ElInput><template #prepend>G</template></ElInput>
      <ElInput><template #prepend>B</template></ElInput>
    </div>
    <ElButton type="success">保存</ElButton>
  </div>
</template>

<style lang='scss' scoped>
/* 透明滑块 */
$grid-1: #ccc;
$grid-2: transparent;
.color-palette {
  background-image: linear-gradient(45deg, $grid-1 25%, $grid-2 25%), linear-gradient(135deg, $grid-1 25%, $grid-2 25%), linear-gradient(45deg, $grid-2 75%, $grid-1 75%), linear-gradient(135deg, $grid-2 75%, $grid-1 75%);
  background-size: 12px 12px;
  background-position: 0 0,6px 0,6px -6px,0 6px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: v-bind(hslString);
  }
}

::v-deep(.el-input) {
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
    text-align: right;
    color: white;
  }
}
</style>