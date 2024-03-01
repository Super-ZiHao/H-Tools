<script lang='ts' setup>
import { CopyDocument } from '@element-plus/icons-vue';
import { ImgInfoType } from '../sprite/draggable.vue';
import { reactive, ref } from 'vue';
import CodeEditor from '@/components/code-editor/index.vue';

const { data } = defineProps<{
  data: ImgInfoType[]
}>();
const options = reactive({
  uuid: false,
  name: false,
  type: false,
})

const getPreviewCode = (sliceBase64?: boolean) => {
  const code = data.map(item => {
    const base64 = sliceBase64 ? `${item.base64.slice(0, 10)}...` : item.base64;
    if (!options.uuid && !options.name && !options.type) return base64;
    const obj: any = {
      base64,
    };
    if (options.uuid) {
      obj.uuid = item.id;
    }
    if (options.name) {
      obj.name = item.name;
    }
    if (options.type) {
      obj.type = item.type;
    }

    return obj;
  })

  return code;
};

const jsonEditorRef = ref<InstanceType<typeof CodeEditor>>();

</script>

<template>
  <div class="h-full flex-1 w-0 flex flex-col gap-4">
    <!-- 参数 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center flex-wrap pl-2">
        <ElCheckbox v-model="options.uuid" label="uuid" size="default" />
        <ElCheckbox v-model="options.name" label="名字" size="default" />
        <ElCheckbox v-model="options.type" label="类型" size="default" />
      </div>
      <ElButton :icon="CopyDocument" @click="jsonEditorRef?.copyString(JSON.stringify(getPreviewCode(false), null, 2))">
        Copy
      </ElButton>
    </div>
    <!-- 展示 json 代码 -->
    <CodeEditor
      language="json"
      :readonly="true"
      :value="JSON.stringify(getPreviewCode(true), null, 2)"
      ref="jsonEditorRef"
    />
  </div>
</template>

<style lang='scss' scoped>
.JSON-Editor {
  width: 100%;
  height: 100%;
}
</style>