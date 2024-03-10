<!-- 色调环 - 控件 -->
<script lang='ts' setup>
import { defineProps, withDefaults, ref, computed } from 'vue';
import useColorsStore from '../hook/useColorsStore';
import { storeToRefs } from 'pinia';

const startAngle = 0; // 开始的角度
const props = withDefaults(defineProps<{
  borderSize: number;
  sizeString: string;
  pieSizeString: string;
}>(), {

});
const { hue } = storeToRefs(useColorsStore());
const { updateColor } = useColorsStore();
const pieRef = ref<HTMLDivElement>()

const pieDargPosition = computed(() => {
  if (!pieRef.value) return;
  const { width } = pieRef.value.getBoundingClientRect();
  const radius = (width - props.borderSize) / 2; // 圆半径
  const startRadians = getRadians(startAngle);
  // 将起始角度和当前角度转换为弧度
  const currentRadians = getRadians(hue.value)
  // 计算滑块移动的角度差
  const angleDifference = currentRadians - startRadians;
  // 计算滑块在x轴和y轴的位置
  const x = radius * Math.cos(angleDifference) + radius; // 假设圆盘的中心在原点(0,0)
  const y = radius * Math.sin(angleDifference) + radius;
  return {
    left: `${x}px`,
    top: `${y}px`,
  }
})

const getRadians = (angle: number) => (angle * (Math.PI / 180));

const change = (e: MouseEvent)=>{
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
  updateColor({ hue: currentAngle }, true)
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
</script>

<template>
<div class="pie-chart shadow-md" @mousedown="down" ref="pieRef">
  <div class="pie-chart-mask cursor-default" @mousedown="(e) => e.stopPropagation()"></div>
  <div
    class="pie-drag-btn hover:scale-[1.15] transition-transform shadow-md bg-white border-2 cursor-pointer absolute rounded-full z-10"
    :style="{...pieDargPosition}"
  ></div>
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
  background: conic-gradient(
    hsl(270, 100%, 50%),
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
  }
}
</style>