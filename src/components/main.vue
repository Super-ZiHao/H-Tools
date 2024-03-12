<script lang='ts' setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <main
    class="relative min-w-[960px] min-h-[100vh] box-border pt-24 pb-8 px-8 grid"
    :style="{ backgroundColor: (route.meta as any).bgColor ?? '' }"
  >
    <slot name="default"></slot>
  </main>
</template>

<style lang='scss' scoped>

</style>