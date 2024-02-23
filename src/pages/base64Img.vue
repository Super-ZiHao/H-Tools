<script lang='ts' setup>
import { ref, computed, onMounted } from 'vue';
import isValidVariableName from '@/utils/isValidVariableName.ts'
import downloadImgs from '@/utils/downloadImgs.ts'
import isBase64String from '@/utils/isBase64String.ts'
import _ from 'lodash';
import JSONEditor from 'jsoneditor';
import { ElButton, ElInput } from 'element-plus';

const jsonValue = ref<any>([]);
const deepValue = ref<string>('');
const nameValue = ref<string>('image_');
const isJsonError = ref<boolean>(false);

/** json 编辑器 */
const jsonRef = ref<HTMLDivElement>();
const editor = ref();
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

/** 层级语法错误 */
const isDeepError = computed(() => {
  if (deepValue.value === '') return false;
  const a = deepValue.value.split('.');
  if (a?.length < 2) return isValidVariableName(deepValue.value) ? false : true;
  return a.some(i => !isValidVariableName(i)) ? true : false
})
/** 下载图片 */
const handlerDownload = () => {
  switch (true) {
    case deepValue.value === '': {
      downloadImgs(jsonValue.value, { name: nameValue.value });
      return;
    }
    default: {
      downloadImgs(jsonValue.value.map((i: any) => _.get(i, deepValue.value)), { name: nameValue.value })
      return;
    }
  }
}

/** 当前 json 中识别出可下载的数量 */
const canDownloadNum = computed(() => {
  if (isJsonError.value || isDeepError.value) return 0;
  const nestedValuesArr = jsonValue.value.map((i: any) => _.get(i, deepValue.value))
  return (deepValue.value === '' ? jsonValue.value : nestedValuesArr).filter((i: string) => {
    try {
      const url = new URL(i);
      if (isBase64String(i) || url.protocol === 'https:') { // 是 base64 ｜ url
        return true;
      }
    } catch (e) {
      return false;
    }
  }).length;
})

</script>

<template>
  <div class="text-2xl mb-6">文件下载（base64、url）</div>
  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1440px] p-4 flex items-start flex-col gap-3">
    <div class="w-full flex justify-between items-center h-8">
      <div>识别出可下载数量: {{canDownloadNum}}</div>
      <div class="flex items-centr gap-1 h-full">
        <ElButton>格式化</ElButton>
        <ElButton :disabled="isJsonError || isDeepError || canDownloadNum === 0" type="primary" @click="handlerDownload">下载</ElButton>
      </div>
    </div>
    <div class="JSON-Editor" ref="jsonRef"></div>

    <div class="flex mt-4 gap-4 w-full" style="justify-self: end;">
      <ElInput style="width: 140px;" v-model="nameValue" placeholder="例: user">
        <template #prepend>名称前缀</template>
      </ElInput>
      <ElInput style="width: 160px;" v-model="deepValue" placeholder="例: a.b.c">
        <template #prepend>属性层级</template>
      </ElInput>
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