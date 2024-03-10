<script lang='ts' setup>
import { defineProps } from 'vue';

defineProps<{
  title?: string;
}>()
</script>

<template>
  <div class="flex flex-col w-full h-full rounded-xl overflow-hidden">
    <div class="w-full h-14 bg-[#222222] flex items-center pl-8 text-white text-xl flex-shrink-0" v-if="!!title">{{ title }}</div>
    <div class="w-full h-0 flex-1 relative bg-[#4d5358] flex gap-4">
      <slot></slot>
    </div>
  </div>
</template>