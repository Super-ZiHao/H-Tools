<script lang='ts' setup>
import ColorBoard from './ColorBoard.vue';
import useColorsStore from './hook/useColorsStore';

const { hsl } = useColorsStore();
</script>

<template>
	<div class="color-container grid gap-4 w-full h-full max-w-[1440px]">
    <ColorBoard class="color-board" />
    <!-- 透明度 -->
		<div class="color-opacity shadow-md border-2 p-2 rounded-md w-full h-full"></div>
    <!-- 当前颜色 -->
    <div class="color-preview shadow-md border-2 rounded-md w-full h-full">
      <div class="w-full h-full" :style="`background-color: hsl(${hsl.h}, ${hsl.s * 100}%, ${hsl.l * 100}%)`"></div>
    </div>
    <!-- 信息 -->
    <div class="color-info shadow-md border-2 p-2 rounded-md w-full h-full"></div>
    <!-- 历史 -->
    <div class="color-history shadow-md border-2 p-2 rounded-md w-full h-full"></div>
    <!-- 推荐色 -->
    <div class="color-recommend shadow-md border-2 p-2 rounded-md w-full h-full"></div>
	</div>
</template>

<style lang='scss' scoped>
.color-container {
  grid-template-columns: 150px 100px 100px 100px 1fr 1fr;
  grid-template-rows: 330px 100px 72px 1fr;
  grid-template-areas: "board board board info info info"
                        "board board board info info info"
                        "opacity opacity preview preview recommend recommend"
                        "history history history history recommend recommend"
}

.color-board { // 调色板
  grid-area: board;
  aspect-ratio: 1;
}
.color-opacity { // 透明色
  grid-area: opacity;
}

.color-preview { // 颜色预览
  grid-area: preview;
}
.color-info { // 信息
  grid-area: info;
}
.color-history { // 历史
  grid-area: history;
  min-height: 200px;
}
.color-recommend { // 推荐色
  grid-area: recommend;
}
</style>