<!-- 代码编辑器组件 -->
<script lang='ts' setup>
import { onMounted } from 'vue';
import useMonacoEditor from './hooks';

const { value, language, readonly } = withDefaults(defineProps<{
  /** 语言 */
  language: 'json' | 'scss' | 'less' | 'css',
  /** 当前值 */
  value: string,
  /** 只读 */
  readonly?: boolean,
}>(), {
  readonly: false,
})


const { monacoEditorRef, createEditor } = useMonacoEditor({
  language,
  value,
  readOnly: readonly,
});
onMounted(() => {
  if (!monacoEditorRef.value) return;
  
  // 初始化编辑器
  createEditor();
})

</script>

<template>
  <div class="border-[2px] border-cyan-400 flex-1 rounded-md overflow-auto" ref="monacoEditorRef">
  </div>
</template>

<style lang='scss' scoped>

</style>