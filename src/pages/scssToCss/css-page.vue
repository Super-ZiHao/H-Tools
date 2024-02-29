<script lang='ts' setup>
import { computed, ref, watch } from 'vue';
import CodeEditor from '@/components/code-editor/index.vue';
import { compileString } from 'sass';

const props = defineProps<{
  value: string
}>();

const code = ref('');

watch(() => props.value, (newValue) => {
  try {
    const compile = compileString(newValue);
    code.value = compile.css;
  } catch (error) {
  }
})

</script>

<template>
  <CodeEditor language="css" :value="code" :readonly="true" />
</template>

<style lang='scss' scoped>

</style>