<script lang='ts' setup>
import { isArray, get } from 'lodash-es';
import { ref, computed } from 'vue';
import isValidVariableName from '@/utils/isValidVariableName.ts'
import downloadImgs from '@/utils/downloadImgs.ts'
import isBase64Image from '@/utils/isBase64Image.ts'
import jsBeautify from 'js-beautify';
const textareaVlue = ref<string>(
  '["data:image/png;base64,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"]'
);
const inputVlue = ref<string>('');

/** 判断 textarea 内容是否为数组 */
const isTextareaError = computed(() => {
  if (textareaVlue.value === '') return false;
  try {
    const arr = JSON.parse(textareaVlue.value);
    if (isArray(arr)) return false;
    return true
  } catch (e) {
    return true;
  }
})
const isInputError = computed(() => {
  if (inputVlue.value === '') return false;
  const a = inputVlue.value.split('.');
  if (a?.length < 2) return isValidVariableName(inputVlue.value) ? false : true;
  return a.some(i => !isValidVariableName(i)) ? true : false
})

/** 格式化 textarea 值 */
const formatJson = () => {
  if (!textareaVlue.value) return;
  textareaVlue.value = jsBeautify(textareaVlue.value, { indent_size: 4, space_in_empty_paren: true });
}

/** 下载图片 */
const handlerDownload = () => {
  if (!textareaVlue.value) return;
  if (textareaVlue.value === '') return alert('您还未输入base64数组，请先输入。');
  if (isTextareaError.value || isInputError.value) return alert('您输入的格式有误，请重新输入');

  const textareaValue = textareaVlue.value ?? '';
  const inputValue = inputVlue.value ?? '';
  const arr: any = JSON.parse(textareaValue);

  switch (true) {
    case inputValue === '': {
      downloadImgs(arr);
      return;
    }
    default: {
      downloadImgs(arr.map((i: any) => get(i, inputValue)))
      return;
    }
  }
}


// 当前可下载图片
const availableImgLength = computed(() => {
  if (!textareaVlue.value) return 0;
  if (textareaVlue.value === '') return 0;
  if (isTextareaError.value || isInputError.value) return 0;

  const textareaValue = textareaVlue.value ?? '';
  const inputValue = inputVlue.value ?? '';
  try {
    const arr: any = JSON.parse(textareaValue);
    const inputArr = inputValue.split('.').map(i => i.trim());
    const nestedValuesArr = arr.map((i: any) => get(i, inputArr))
    return (inputValue === '' ? arr : nestedValuesArr).filter((i: string) => isBase64Image(i)).length;
  } catch(e) {

  }

})
</script>

<template>
  <div class=" text-2xl mb-6">批量下载 base64 图</div>
  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1280px] p-4 flex flex-col justify-between">
    <textarea
      :class="`h-[calc(100%-60px)] w-full border resize-none p-2 rounded-md border-cyan-400 ${isTextareaError ? 'outline-red-600 outline-2 outline outline-offset-[-2px]' : ''}`"
      placeholder="例: [{ info: { base64: 'data:image/png;base64,iVBORASDASC' } }, { info: { base64: 'data:image/png;base64,iVBORASDASC2' } }]"
      v-model="textareaVlue"
      @keydown="(e) => e.stopPropagation()"
      ref="textareaRef"
    ></textarea>
    <div class="w-full flex justify-between items-center">
      <div class="flex items-center gap-4 h-full">
        图片层级:
        <input
          :class="`border border-cyan-400 h-full rounded-md px-2 ${isInputError ? 'outline-red-600 outline-2 outline outline-offset-[-2px]' : ''}`"
          type="text"
          placeholder="例: info.base64"
          ref="inputRef"
          v-model="inputVlue"
        >

        {{ isTextareaError ? '请输入正确的 JSON 格式' : `当前数可下载图片数量: ${availableImgLength}` }}
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