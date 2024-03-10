<script lang='ts' setup>
import { defineProps, defineModel, defineEmits } from 'vue';

const emits = defineEmits<{
  change: [value: number]
}>();

const model = defineModel();

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
      @input="(e: string) => emits('change', Number(e))"
    />
  </div>
</template>

<style lang='scss' scoped>

</style>