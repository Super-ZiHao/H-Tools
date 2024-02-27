<script lang='ts' setup>
import CodeEditor from '@/components/code-editor.vue';
import { defineModel } from 'vue';

const value = defineModel<string>()
</script>

<template>
  <CodeEditor lang="scss" value="html{}" />
</template>

<style lang='scss' scoped>

</style>