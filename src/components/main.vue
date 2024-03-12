<script lang='ts' setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <main class="relative min-w-[960px] h-[calc(100vh-4rem)] lg:p-14 p-8 flex items-center justify-center flex-col">
    <slot name="default"></slot>
  </main>
</template>

<style lang='scss' scoped>

</style>