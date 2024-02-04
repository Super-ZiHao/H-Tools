<script lang='ts' setup>
import { ref, computed, onMounted } from 'vue';
import isValidVariableName from '@/utils/isValidVariableName.ts'
import downloadImgs from '@/utils/downloadImgs.ts'
import isBase64Image from '@/utils/isBase64Image.ts'

const jsonValue = ref<any>([]);
const inputVlueString = ref<string>('');
const nameValue = ref<string>('image_');
const isJsonError = ref<boolean>(false);
const jsonRef = ref<HTMLDivElement>();

const editor = ref<any>();
onMounted(() => {
  if (!jsonRef.value) return;
  editor.value  = new JSONEditor(jsonRef.value, {
    mode: "code",
    mainMenuBar: false,
    schema: {
      base64: [],
    },
    onChangeText(jsonString) {
      try {
        const json = JSON.parse(jsonString);
        jsonValue.value = json;
        isJsonError.value = false;
      } catch (error) {
        isJsonError.value = true;
      }
    },
  });
  editor.value.setText(`[\n  \n]`)
})

const isInputError = computed(() => {
  if (inputVlueString.value === '') return false;
  const a = inputVlueString.value.split('.');
  if (a?.length < 2) return isValidVariableName(inputVlueString.value) ? false : true;
  return a.some(i => !isValidVariableName(i)) ? true : false
})
/** 下载图片 */
const handlerDownload = () => {
  if (isJsonError.value) return alert('您输入的 Json 格式有误，请重新输入');
  if (isInputError.value) return alert('请按照 a.b.c 的 方式重新输入');
  if (availableImgLength.value === 0) return alert('当前检测出的图片数量为 0');
  const inputValue = inputVlueString.value ?? '';
  switch (true) {
    case inputValue === '': {
      downloadImgs(jsonValue.value, { name: nameValue.value });
      return;
    }
    default: {
      downloadImgs(jsonValue.value.map((i: any) => _.get(i, inputValue)), { name: nameValue.value })
      return;
    }
  }
}

// 当前可下载图片
const availableImgLength = computed(() => {
  if (isJsonError.value || isInputError.value) return 0;
  const nestedValuesArr = jsonValue.value.map((i: any) => _.get(i, inputVlueString.value))
  return (inputVlueString.value === '' ? jsonValue.value : nestedValuesArr).filter((i: string) => isBase64Image(i)).length;
})

</script>

<template>
  <div class="text-2xl mb-6">批量下载 base64 图</div>
  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1280px] p-4 flex items-start flex-col gap-3">
    <div class="w-full flex justify-between items-center h-8">
      <div>当前数可下载图片数量: {{availableImgLength}}</div>
      <div class="flex items-centr gap-4 h-full">
        <!-- <button class="h-full px-4 transition-all rounded-md border hover:bg-slate-100 active:bg-slate-200">格式化</button> -->
        <button class="h-full px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-all text-white rounded-md" @click="handlerDownload">下载</button>
      </div>
    </div>
    <div class="JSON-Editor" ref="jsonRef"></div>

    <div class="grid grid-cols-3 grid-rows-2 mt-4 px-4 gap-y-4 gap-x-4 w-full" style="justify-self: end;">
      <div class="flex gap-3 items-center">
        名称前缀:
        <input
          :class="`border h-9 w-40 border-cyan-400 rounded-md px-2`"
          type="text"
          placeholder="例: user"
          v-model="nameValue"
        >
      </div>
      <div class="flex gap-3 items-center">
        属性层级:
        <input
          :class="`border h-9 w-40 border-cyan-400 rounded-md px-2 ${isInputError ? 'outline-red-600 outline-2 outline outline-offset-[-2px]' : ''}`"
          type="text"
          placeholder="例: a.b.c"
          v-model="inputVlueString"
        >
      </div>
      <!-- <div class="flex gap-3 items-center">
        图片类型:
        <select class="border h-9 w-40 rounded-md px-2">
          <option value="base64">base64</option>
          <option value="number">url</option>
        </select>
      </div> -->
    </div>
    <div class=" mt-auto mx-auto">
      <span class=" text-sm text-gray-400">ps: 编辑器最外层仅能为数组格式，否则程序将会无法使用</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.JSON-Editor {
  width: 100%;
  height: 70%;
}
</style>