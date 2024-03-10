<script lang='ts' setup>
import { defineProps, withDefaults } from 'vue';

const { title } = withDefaults(defineProps<{
  title?: string;
}>(), {
  title: '标题',
});
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="w-full h-14 bg-[#222222] rounded-t-xl flex items-center pl-8 select-none text-white text-xl">{{ title }}</div>
    <div class="w-full flex-1 rounded-b-xl relative bg-[#4d5358] flex gap-4">
      <slot></slot>
    </div>
  </div>
</template>