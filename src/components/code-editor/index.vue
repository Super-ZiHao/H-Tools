<!-- 代码编辑器组件 -->
<script lang='ts' setup>
import { onBeforeUnmount, onMounted, toRaw, watch } from 'vue';
import useMonacoEditor from './hooks';

const emit = defineEmits(['change']);
const props = withDefaults(defineProps<{
  /** 语言 */
  language: 'json' | 'scss' | 'less' | 'css',
  /** 当前值 */
  value?: string,
  /** 只读 */
  readonly?: boolean,
}>(), {
  readonly: false,
})

const { monacoEditorRef, createEditor, monacoEditor, updateVal, formatDoc } = useMonacoEditor({
  language: props.language,
  value: props.value,
  readOnly: props.readonly,
});

onMounted(() => {
  if (!monacoEditorRef.value) return;
  // 初始化编辑器
  createEditor();

  // 监测更新
  const didChangeModelContent = monacoEditor.value?.onDidChangeModelContent(() => {
    const model = toRaw(monacoEditor.value)?.getValue();
    emit('change', model);
  })

  onBeforeUnmount(() => {
    didChangeModelContent?.dispose();
  })
})
watch(() => props.value, (newVal) => {
  updateVal(newVal ?? '');
})



/** 暴露方法 */
export type CodeEditorFun = {
  /** 格式化数组 */
  formatCode: typeof formatCode
}
// 格式化代码
const formatCode = () => {
  formatDoc()
}
defineExpose<CodeEditorFun>({
  formatCode,
})

</script>

<template>
  <div class="border-[2px] w-full border-cyan-400 flex-1 rounded-md overflow-auto" ref="monacoEditorRef">
  </div>
</template>

<style lang='scss' scoped>

</style>