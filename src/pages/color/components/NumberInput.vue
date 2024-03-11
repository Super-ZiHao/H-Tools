<script lang='ts' setup>
import { defineProps, defineModel, defineEmits } from 'vue';

const emits = defineEmits<{
  change: [value: number]
}>();

const model = defineModel<number>();

defineProps<{
  title: string
}>();
</script>

<template>
  <div class="flex">
    <div class="flex items-center justify-center rounded-l bg-[#707b80] text-[#a9b4bc] h-full aspect-square text-sm">{{ title }}</div>
    <ElInputNumber
      v-model="model"
      :controls="false"
      :precision="0"
      :min="0"
      maxlength="2"
      v-bind="$attrs"
      @input="(e) => emits('change', Number(e ?? '0'))"
    />
  </div>
</template>

<style lang='scss' scoped>

</style>