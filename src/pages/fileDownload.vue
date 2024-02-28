<script lang='ts' setup>
import { ref, computed } from 'vue';
import isValidVariableName from '@/utils/isValidVariableName.ts'
import downloadImgs from '@/utils/downloadImgs.ts'
import isBase64String from '@/utils/isBase64String.ts'
import _ from 'lodash';
import { ElButton, ElInput } from 'element-plus';
import CodeEditor from '@/components/code-editor/index.vue';

const jsonValue = ref<any>([]);
const deepValue = ref<string>('');
const nameValue = ref<string>('image_');
const isJsonError = ref<boolean>(false);

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

const changeEditor = (val: string) => {
  try {
    const json = JSON.parse(val);
    jsonValue.value = json;
    isJsonError.value = false;
  } catch (error) {
    isJsonError.value = true;
  }
}

</script>

<template>
  <div class="text-2xl mb-6 text-[#5C8374]">文件下载（base64、url）</div>
  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1440px] p-4 flex items-start flex-col gap-4">
    <div class="relative w-full flex justify-between items-center h-8">
      <div class="flex items-center gap-4">
        <ElInput style="width: 160px;" v-model="nameValue" placeholder="例: user">
          <template #prepend>名称前缀</template>
        </ElInput>
        <ElInput style="width: 160px;" v-model="deepValue" placeholder="例: a.b.c">
          <template #prepend>属性层级</template>
        </ElInput>
      </div>
      <div class="absolute left-[50%] translate-x-[-50%]">识别可下载数量: {{canDownloadNum}}</div>
      <div class="flex items-centr gap-1 h-full">
        <ElButton :disabled="isJsonError || isDeepError || canDownloadNum === 0" type="primary" @click="handlerDownload">下载</ElButton>
      </div>
    </div>
    <CodeEditor language="json" value="[]" @change="changeEditor" />
  </div>
</template>

<style lang='scss' scoped>
.JSON-Editor {
  width: 100%;
  height: 90%;
}
</style>