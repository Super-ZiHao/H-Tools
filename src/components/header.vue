<script lang='ts' setup>
import { toolsRouter } from '@/router'
</script>

<template>
  <header class="flex items-center justify-between min-w-[800px] shadow-lg py-4 lg:px-12 px-4 h-16">
    <div class="flex items-center">
      <img class="h-14" src="../../public/logo.png" style="margin: -12px; filter: invert(1);" />
      <div class="text-lg">Tools</div>
    </div>
    <div class="flex items-center">
      <template v-for="item in toolsRouter" :key="item.name">
        <button v-if="item.path === $route.path" class="py-1 px-3 mx-1 my-1 bg-slate-200 rounded-md">{{ item.name }}</button>
        <button v-else class="hover:bg-slate-100 active:bg-slate-200 transition-all px-4 py-2 active:px-3 active:py-1 active:mx-1 active:my-1 rounded-md" @click="$router.push(item.path)">{{item.name}}</button>
      </template>
    </div>
  </header>
</template>

<style lang='scss' scoped>

</style>