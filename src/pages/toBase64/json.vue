<script lang='ts' setup>
import { ElButton, ElCheckbox, ElMessage } from 'element-plus';
import { CopyDocument } from '@element-plus/icons-vue';
import { ImgInfoType } from '../sprite/draggable.vue';
import { computed, reactive } from 'vue';
import clipboard from 'clipboard';

const { data } = defineProps<{
  data: ImgInfoType[]
}>();
const options = reactive({
  uuid: false,
  name: false,
  type: false,
})

const previewCode = computed(() => {
  const code = data.map(item => {
    if (!options.uuid && !options.name && !options.type) return item.base64;
    const obj: any = {
      base64: item.base64,
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
});

const handlerCopy = () => {
  clipboard.copy(JSON.stringify(previewCode.value, null, 4));
  ElMessage.success('复制成功');
}

</script>

<template>
  <div class="h-full flex-1 w-0 flex flex-col gap-4">
    <!-- 参数 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center flex-wrap pl-2">
        <ElCheckbox v-model="options.uuid" label="uuid" size="large" />
        <ElCheckbox v-model="options.name" label="名字" size="large" />
        <ElCheckbox v-model="options.type" label="类型" size="large" />
      </div>
      <ElButton :icon="CopyDocument" @click="handlerCopy">
        Copy
      </ElButton>
    </div>
    <!-- 展示 json 代码 -->
    <div class="flex flex-col border-[2px] rounded-md overflow-auto overflow-x-hidden flex-1 border-cyan-400 p-2 text-gray-400" v-if="(typeof previewCode[0] === 'string')">
      [
        <div class="text-ellipsis w-full overflow-hidden" v-for="(base64, idx) in previewCode" :key="idx">&nbsp;&nbsp;&nbsp;&nbsp;"{{ base64.slice(0, 100) }}..."</div>
      ]
    </div>
    <div class="flex flex-col border-[2px] rounded-md overflow-auto overflow-x-hidden flex-1 border-cyan-400 p-2 text-gray-400" v-else>
      [
        <div class="text-ellipsis w-full overflow-hidden" v-for="(item, idx) in previewCode" :key="idx">
          &nbsp;&nbsp;&nbsp;&nbsp;{
          <div v-for="(key, idx2) in Object.keys(item)" :key="`${idx}-${idx2}`" class=" text-ellipsis overflow-hidden w-full text-nowrap">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ key }}: "{{ item[key].slice(0, 100) }}",</div>
          &nbsp;&nbsp;&nbsp;&nbsp;},
        </div>
      ]
    </div>
  </div>
</template>

<style lang='scss' scoped>
.JSON-Editor {
  width: 100%;
  height: 100%;
}
</style>