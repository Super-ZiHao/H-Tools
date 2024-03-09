<script lang='ts' setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <main class="relative min-w-[800px] lg:px-24 lg:pb-24 lg:pt-8 pt-6 pb-12 px-12 h-[calc(100vh-4rem)] flex items-center justify-center flex-col">
    <div class="text-2xl mb-3 text-[#5C8374]">
      {{ route.meta.title }}
    </div>
    <slot name="default"></slot>
  </main>
</template>

<style lang='scss' scoped>

</style>