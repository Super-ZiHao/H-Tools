<script lang='ts' setup>
import { defineProps } from 'vue';

defineProps<{
  title?: string;
  subTitle?: string;
  bodyClass?: string;
}>()
</script>

<template>
  <div class="flex flex-col w-full h-full rounded-xl overflow-hidden">
    <div class="w-full h-14 bg-[#222222] flex items-center justify-between flex-shrink-0" v-if="!!title">
      <div class="pl-8 text-white text-xl">{{ title }}</div>

      <div class="pr-8 text-sm text-gray-400">
        {{ subTitle }}
        <slot name="subTitle"></Slot>
      </div>
    </div>
    <div :class="`w-full h-0 flex-1 relative bg-[#4d5358] flex gap-4 overflow-auto ${bodyClass ?? ''}`">
      <slot></slot>
    </div>
  </div>
</template>