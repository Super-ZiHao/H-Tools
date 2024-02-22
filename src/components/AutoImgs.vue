<script lang='ts' setup>
import { CSSProperties, onMounted, ref, onUpdated } from 'vue';

interface Props {
  src: string;
  style?: CSSProperties;
}

const { src, style } = defineProps<Props>();
const imgRef = ref<HTMLImageElement>();
const ratio = ref();

onMounted(() => {
  const img = new Image();
  img.onload = function () {
    ratio.value = `${img.width}/${img.height}`
    img.remove();
  }
  img.src = src;
})
onUpdated(() => {
  const img = new Image();
  img.onload = function () {
    ratio.value = `${img.width}/${img.height}`
    img.remove();
  }
  img.src = src;
})
</script>

<template>
  <img :src="src" :style="{aspectRatio: ratio , ...style}" v-bind="$attrs" ref="imgRef">
</template>

<style lang='scss' scoped>

</style>