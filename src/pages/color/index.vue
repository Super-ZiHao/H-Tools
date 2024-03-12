<script lang='ts' setup>
import ColorBoard from './ColorBoard.vue';
import Info from './Info.vue';
import History from './History.vue'
import Recommend from './Recommend.vue'
</script>

<template>
	<div class="color-container grid gap-4 w-full h-full flex-1 max-w-[1280px] rounded-2xl m-auto">
    <ColorBoard class="color-board shadow-md" />
    <Info class="color-info shadow-md" />
    <History class="color-history shadow-md" />
    <Recommend class="color-recommend shadow-md" />
	</div>
</template>

<style lang='scss' scoped>
.color-container {
  grid-template-columns: 340px 100px 140px 100px 1fr 1fr;
  grid-template-rows: 330px 100px 72px 1fr;
  grid-template-areas: "board board board history history history"
                        "board board board history history history"
                        "recommend recommend info info info info"
                        "recommend recommend info info info info"
}

.color-board { // 调色板
  grid-area: board;
  aspect-ratio: 1;
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