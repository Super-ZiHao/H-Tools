<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router';
import { toolsRouter } from '@/router'

const router = useRouter();
const route = useRoute();
</script>

<template>
  <header
    class="fixed top-0 left-0 z-20 flex items-center justify-between w-full min-w-[800px] backdrop-filter shadow-lg shadow-gray-400 py-4 lg:px-12 px-4 h-16 "
    :style="{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255, 255, 255, 0.7)'}"
  >
    <div class="flex items-center">
      <img class="h-14" src="../../public/logo.png" style="margin: -12px; filter: invert(1);" />
      <div class="text-lg">Tools</div>
    </div>
    <div class="flex items-center">
      <button
        :class="`hover:bg-slate-100 active:bg-slate-200 transition-all ${item.path === route.path ? 'py-1 px-3 bg-slate-200 mx-1 my-1' : 'px-4 py-2'}  active:px-3 active:py-1 active:mx-1 active:my-1 rounded-md`"
        @click="router.push(item.path)"
        v-for="item in toolsRouter" :key="item.name"
      >{{item.name}}</button>
    </div>
  </header>
</template>

<style lang='scss' scoped>

</style>