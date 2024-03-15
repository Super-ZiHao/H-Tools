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
    <div class="card-title w-full bg-[#222222] flex items-center justify-between flex-shrink-0" v-if="!!title">
      <div class="text-white etext-white">{{ title }}</div>

      <div class="text-sm text-gray-400">
        {{ subTitle }}
        <slot name="subTitle"></Slot>
      </div>
    </div>
    <div :class="`w-full flex-1 relative bg-[#4d5358] overflow-auto ${bodyClass ?? ''}`">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-title {
  padding-inline: 24px;
  height: 56px;
  font-size: 20px;
}
@container color-container (max-width: 600px) {
  .card-title {
    padding-inline: 16px;
    font-size: 18px;
    height: 48px;
  }
}

@container color-container (max-width: 400px) {
  .card-title {
    padding-inline: 8px;
    height: 40px;
  }
}
</style>