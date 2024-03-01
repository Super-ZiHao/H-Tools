<!-- 代码编辑器组件 -->
<script lang='ts' setup>
import { onBeforeUnmount, onMounted, toRaw, watch } from 'vue';
import useMonacoEditor from './hooks';
import { copy } from 'clipboard';

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
    const value = toRaw(monacoEditor.value)?.getValue();
    emit('change', value);
  })

  onBeforeUnmount(() => {
    didChangeModelContent?.dispose();
  })
})
watch(() => props.value, (newVal) => {
  updateVal(newVal ?? '');
})


// 格式化代码
const formatCode = () => {
  formatDoc()
}
const copyString = (v?: string) => {
  const value = v ? v : toRaw(monacoEditor.value)?.getValue();
  if (value) {
    copy(value);
    ElMessage.success('复制成功');
  } else {
    ElMessage.error('出错了❌')
  }
}
defineExpose({
  formatCode,
  copyString,
})

</script>

<template>
  <div class="border-[2px] w-full border-cyan-400 flex-1 rounded-md overflow-auto" ref="monacoEditorRef">
  </div>
</template>

<style lang='scss' scoped>

</style>