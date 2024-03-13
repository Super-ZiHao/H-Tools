<!-- 色调环 - 控件 -->
<script lang='ts' setup>
import { defineProps, withDefaults, ref, computed } from 'vue';
import useColorsStore from '../hook/useColorsStore';
import { storeToRefs } from 'pinia';
import { divideAngle, getAngle } from '../utils'
import { CopyDocument, Mouse } from '@element-plus/icons-vue';

const startAngle = 0; // 开始的角度
const props = withDefaults(defineProps<{
  borderSize: number;
  sizeString: string;
  pieSizeString: string;
}>(), {

});
const { colorRecommendNumber } = storeToRefs(useColorsStore());
const { updateColor, copyColor, currentColorCore } = useColorsStore();
const pieRef = ref<HTMLDivElement>()

const getRadians = (angle: number) => (angle * (Math.PI / 180));
const getPieDargPosition = (currentAngle: number) => {
  if (!pieRef.value) return;
  const { width } = pieRef.value.getBoundingClientRect();
  const radius = (width - props.borderSize) / 2; // 圆半径
  const startRadians = getRadians(startAngle);
  // 将起始角度和当前角度转换为弧度
  const currentRadians = getRadians(getAngle(currentAngle))
  // 计算滑块移动的角度差
  const angleDifference = currentRadians - startRadians;
  // 计算滑块在x轴和y轴的位置
  const x = radius * Math.cos(angleDifference) + radius; // 假设圆盘的中心在原点(0,0)
  const y = radius * Math.sin(angleDifference) + radius;
  return {
    left: `${x}px`,
    top: `${y}px`,
  }
}


const change = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  if (!pieRef.value) return;
  const { clientX, clientY } = e
  const { left, top, width } = pieRef.value.getBoundingClientRect();
  const centerX = left + (width / 2); // 圆心 X 坐标
  const centerY = top + (width / 2); // 圆心 Y 坐标
  // 计算鼠标坐标相对于圆心的坐标
  const relativeX = clientX - centerX;
  const relativeY = clientY - centerY;
  // 获取弧度
  // 计算角度
  const angle = Math.atan2(relativeY, relativeX) * (180 / Math.PI);
  // 根据圆的起始方向调整角度（如果是从水平向右开始，则需要减去90度）
  const adjustedAngle = angle - startAngle;
  const currentAngle = (adjustedAngle + 360) % 360;

  updateColor('hsva', { h: currentAngle })
}

const up = () => {
  if (!pieRef.value) return;
  document.body.removeEventListener('mousemove', change)
  document.body.removeEventListener('mouseup', up)
}
const down = (e: MouseEvent) => {
  if (!pieRef.value) return;
  change(e);
  document.body.addEventListener('mousemove', change)
  document.body.addEventListener('mouseup', up)
}


/** 推荐颜色逻辑 */
const hueRecommend = computed(() => divideAngle(currentColorCore.hue, colorRecommendNumber.value).slice(1, colorRecommendNumber.value))


enum SV_TYPE_ENUM {
  L = 'hsl',
  V = 'hsv',
}
const SVType = ref<SV_TYPE_ENUM>(SV_TYPE_ENUM.V);

</script>

<template>
  <div class="pie-chart" @mousedown="down" ref="pieRef">
    <div class="pie-chart-mask cursor-default" @mousedown="(e) => e.stopPropagation()"></div>
    <div
      class="pie-drag-btn flex items-center justify-center transition-transform cursor-pointer absolute rounded-full z-10"
      :style="{ ...getPieDargPosition(currentColorCore.hue), '--hue': currentColorCore.hue }">
      <ElIcon>
        <Mouse />
      </ElIcon>
    </div>

    <ElTooltip :content="`Hue: ${String(Math.round(item))}`" placement="top" v-for="item in hueRecommend" :key="item">
      <div
        class="pie-drag-btn preview flex items-center justify-center transition-transform cursor-pointer absolute rounded-full z-10"
        :style="{ ...getPieDargPosition(item) }" @mousedown="(e) => { e.stopPropagation() }"
        @click="() => copyColor(String(item))">
        <ElIcon>
          <CopyDocument />
        </ElIcon>
      </div>
    </ElTooltip>

    <div
      :class="`btn-l ${SVType === SV_TYPE_ENUM.V ? 'active' : ''} select-none transition-all absolute left-0 top-0 text-white w-11 h-11 flex items-center justify-center rounded-full cursor-pointer`"
      @mousedown="(e) => e.stopPropagation()"
    >V</div>
    <div
      :class="`btn-l ${SVType === SV_TYPE_ENUM.L ? 'active' : ''} select-none transition-all absolute right-0 top-0 text-white w-11 h-11 flex items-center justify-center rounded-full cursor-pointer`"
      @mousedown="(e) => e.stopPropagation()"
    >L</div>
  </div>
</template>

<style lang='scss' scoped>
$size: v-bind(sizeString);
$borderSize: calc($size / 2);
$pieSize: v-bind(pieSizeString);

/* 圆盘 */
.pie-chart {
  --red: #ff0000;
  --blue: #0000ff;
  --yellow: #ffff00;
  --green: #00ff00;
  position: absolute;
  inset: $pieSize;
  border-radius: 50%;
  background: conic-gradient(hsl(270, 100%, 50%),
      hsl(300, 100%, 50%),
      hsl(330, 100%, 50%),
      hsl(0, 100%, 50%),
      hsl(30, 100%, 50%),
      hsl(60, 100%, 50%),
      hsl(90, 100%, 50%),
      hsl(120, 100%, 50%),
      hsl(150, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(210, 100%, 50%),
      hsl(240, 100%, 50%),
      hsl(270, 100%, 50%),
    );

  .pie-chart-mask {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100% - $size);
    height: calc(100% - $size);
    background-color: #4d5358;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .pie-drag-btn {
    width: $borderSize;
    height: $borderSize;
    box-shadow: inset 5px 5px 10px #1f2123, inset -5px -5px 10px #7d858b;
    color: white;
    mix-blend-mode: difference;

    &.preview {
      box-shadow: inset 5px 5px 10px #666666, inset -5px -5px 10px #ffffff;
      color: white;
      mix-blend-mode: difference;

      &:hover ::v-deep(.el-icon) {
        opacity: 1;
      }

      ::v-deep(.el-icon) {
        opacity: 0;
        transition: opacity;
      }
    }
  }


  .btn-l {
    background: linear-gradient(145deg, #53595d, #464b4e);
    box-shadow: 5px 5px 5px #1f2123,
      -5px -5px 5px #7d858b;

    &:active,
    &.active {
      background: #4e5357;
      box-shadow: inset 9px 9px 18px #1f2123,
        inset -9px -9px 18px #7d858b;
    }
  }
}
</style>