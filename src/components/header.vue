<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router';
import { toolsRouter } from '@/router'

const router = useRouter();
const route = useRoute();
</script>

<template>
  <header class="flex items-center justify-between min-w-[800px] shadow-lg py-4 lg:px-12 px-4 h-16">
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