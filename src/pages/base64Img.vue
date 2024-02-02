<script lang='ts' setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import isValidVariableName from '@/utils/isValidVariableName.ts'
import getNestedValues from '@/utils/getNestedValues.ts'
import downloadImgs from '@/utils/downloadImgs.ts'
import jsBeautify from 'js-beautify';
const textareaRef = ref<HTMLTextAreaElement>();
const inputRef = ref<HTMLInputElement>();
const isTextareaError = ref(false);
const isInputError = ref(false);

/** 判断 textarea 内容是否为数组 */
const textareaCallback = (e: any) => {
  const value = (e.target as HTMLTextAreaElement).value;
  if (value === '') return isTextareaError.value = false;
  try {
    const arr = JSON.parse(value);
    if (Array.isArray(arr)) {
      return isTextareaError.value = false;
    }
    return isTextareaError.value = true;
  } catch (e) {
    return isTextareaError.value = true;
  }
};
/** 判断 input 数据格式 */
const inputCallback = (e: any) => {
  const value = (e.target as HTMLInputElement).value;
  if (value === '') return isInputError.value = false;
  const a = value.split('.');
  if (a.length < 2) return isValidVariableName(value) ? (isInputError.value = false) : (isInputError.value = true);
  a.some(i => !isValidVariableName(i)) ? (isInputError.value = true) : (isInputError.value = false);
}
onMounted(() => {
  textareaRef.value?.addEventListener('input', textareaCallback);
  inputRef.value?.addEventListener('input', inputCallback);
});
onBeforeUnmount(() => {
  textareaRef.value?.removeEventListener('input', textareaCallback);
  inputRef.value?.removeEventListener('input', inputCallback);
});

/** 格式化 textarea 值 */
const formatJson = () => {
  if (!textareaRef.value) return;
  const v = textareaRef.value?.value;
  textareaRef.value.value = jsBeautify(v, { indent_size: 4, space_in_empty_paren: true });
}

/** 下载图片 */
const handlerDownload = () => {
  if (!textareaRef.value) return;
  if (textareaRef.value.value === '') return alert('您还未输入base64数组，请先输入。');
  if (isTextareaError.value || isInputError.value) return alert('您输入的格式有误，请重新输入');

  const textareaValue = textareaRef.value?.value ?? '';
  const inputValue = inputRef.value?.value ?? '';
  const arr: any = JSON.parse(textareaValue);

  const inputArr = inputValue.split('.').map(i => i.trim());

  switch (true) {
    case inputValue === '': {
      downloadImgs(arr);
      return;
    }
    default: {
      downloadImgs(arr.map((i: any) => getNestedValues(i, inputArr)))
      return;
    }
  }
}
</script>

<template>
  <div class=" text-2xl mb-6">批量下载 base64 图</div>
  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1280px] p-4 flex flex-col justify-between">
    <textarea :class="`h-[calc(100%-60px)] w-full border resize-none p-2 rounded-md border-cyan-400 ${isTextareaError ? 'outline-red-600 outline-2 outline outline-offset-[-2px]' : ''}`" placeholder="例: [{ info: { base64: 'data:image/png;base64,iVBORASDASC' } }, { info: { base64: 'data:image/png;base64,iVBORASDASC2' } }]" ref="textareaRef"></textarea>
    <div class="w-full flex justify-between items-center">
      <div class="flex items-center gap-4 h-full">
        图片层级:
        <input :class="`border border-cyan-400 h-full rounded-md px-2 ${isInputError ? 'outline-red-600 outline-2 outline outline-offset-[-2px]' : ''}`" type="text" placeholder="例: info.base64" alt="" ref="inputRef">

        {{ isTextareaError ? '请输入正确的 JSON 格式' : `当前数可下载图片数量: ${JSON.parse(textareaRef?.value ?? '[]').length}` }}
      </div>
      <div class="flex items-center gap-4">
        <button class="py-2 px-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-all text-white rounded-md" @click="formatJson">格式化</button>
        <button class="py-2 px-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-all text-white rounded-md" @click="handlerDownload">下载</button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>