<script lang='ts' setup>
import { isArray, get } from 'lodash-es';
import { ref, computed } from 'vue';
import isValidVariableName from '@/utils/isValidVariableName.ts'
import downloadImgs from '@/utils/downloadImgs.ts'
import isBase64Image from '@/utils/isBase64Image.ts'
import jsBeautify from 'js-beautify';
const textareaVlue = ref<string>('');
const inputVlue = ref<string>('');
const nameValue = ref<string>('image_');

/** 判断 textarea 内容是否为数组 */
const isTextareaError = computed(() => {
  if (textareaVlue.value === '') return false;
  try {
    const arr = JSON.parse(textareaVlue.value);

    if (isArray(arr)) return false;
    return true
  } catch (e) {
    console.log(e);
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
      downloadImgs(arr, { name: nameValue.value });
      return;
    }
    default: {
      downloadImgs(arr.map((i: any) => get(i, inputValue)), { name: nameValue.value })
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
  } catch(e) {}
})

</script>

<template>
  <div class="text-2xl mb-6">批量下载 base64 图</div>
  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1280px] p-4 flex items-start flex-col gap-3">
    <div class="w-full flex justify-between items-center h-8">
      <div>{{ isTextareaError ? '请输入正确的 JSON 格式' : `当前数可下载图片数量: ${availableImgLength}` }}</div>
      <div class="flex items-centr gap-4 h-full">
        <button class="h-full px-4 transition-all rounded-md border hover:bg-slate-100 active:bg-slate-200" @click="formatJson">格式化</button>
        <button class="h-full px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-all text-white rounded-md" @click="handlerDownload">下载</button>
      </div>
    </div>
    <textarea
      :class="`h-[80%] w-full border resize-none p-2 rounded-md border-cyan-400 ${isTextareaError ? 'outline-red-600 outline-2 outline outline-offset-[-2px]' : ''}`"
      placeholder="例: [{ info: { base64: 'data:image/png;base64,iVBORASDASC' } }, { info: { base64: 'data:image/png;base64,iVBORASDASC2' } }]"
      v-model="textareaVlue"
    ></textarea>

    <div class="flex items-start flex-col gap-2">
      <div class="flex gap-2 items-center">
        图片名称前缀:
        <input
          :class="`border h-9 border-cyan-400 rounded-md px-2 ${isInputError ? 'outline-red-600 outline-2 outline outline-offset-[-2px]' : ''}`"
          type="text"
          placeholder="例: user"
          v-model="nameValue"
        >

        <span class=" text-sm text-gray-400">批量下载图片后缀会以数字出现</span>
      </div>
      <div class="flex gap-2 items-center">
        地址所在层级:
        <input
          :class="`border h-9 border-cyan-400 rounded-md px-2 ${isInputError ? 'outline-red-600 outline-2 outline outline-offset-[-2px]' : ''}`"
          type="text"
          placeholder="例: a.b.c"
          v-model="inputVlue"
        >
      </div>
    </div>
    
  </div>
</template>

<style lang='scss' scoped>

</style>