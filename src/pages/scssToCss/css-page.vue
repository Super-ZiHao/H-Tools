<script lang='ts' setup>
import { computed } from 'vue';
import CodeEditor from '@/components/code-editor/index.vue';

const props = defineProps<{
  value: string
}>()

const cssCode = computed(() => {
  return props.value;
});

</script>

<template>
  <CodeEditor language="css" :value="cssCode" :readonly="true" />
</template>

<style lang='scss' scoped>

</style>