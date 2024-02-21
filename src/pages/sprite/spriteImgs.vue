<script lang='ts' setup>
import { ElButton, ElInput, ElOption, ElSelect } from 'element-plus';
import { ImgInfoType } from './draggable.vue';
import { computed, ref } from 'vue';
const { data } = defineProps<{
  data: ImgInfoType[]
}>();

const radius = ref(0);
const maxSize = ref(300);
const gap = ref(0);
const col = ref(3);
const scale = ref(0.5);
const scaleOptions = [
  {
    value: 0.5,
    label: 'x0.5',
  },
  {
    value: 1,
    label: 'x1',
  },
  {
    value: 2,
    label: 'x2',
  },
  {
    value: 4,
    label: 'x4',
  },
  {
    value: 8,
    label: 'x8',
  },
]

enum Mode {
  Horizontal = 0,
  Vertical = 1,
  Grid = 2,
}
const mode = ref<Mode>(Mode.Horizontal);
const modeOptions = [
  {
    value: Mode.Horizontal,
    label: '横图',
  },
  {
    value: Mode.Vertical,
    label: '竖图',
  },
  {
    value: Mode.Grid,
    label: '网格',
  },
]


const imgsContainer = ref<any>();
const handlerDownloadImg = () => {
  if (imgsContainer.value) {
    html2canvas(imgsContainer.value.$el, {
      backgroundColor: 'transparent',
      scale: scale.value,
    })
      .then((canvas) => {
        let imageURL = canvas.toDataURL("image/png");    
        //canvas转base64图片，这里我们将base64图片进行下载到本地就可以了
        let a = document.createElement('a');
        a.href = imageURL;
        a.download = `sprites.png`; // 设置下载的文件名
        a.click(); // 模拟点击下载
        a.remove(); // 下载之后把创建的元素删除
      })
    }
}

const modeClass = computed(() => {
  switch(mode.value) {
    case Mode.Horizontal: return 'flex items-center';
    case Mode.Vertical: return 'flex flex-col items-center';
    case Mode.Grid: return '';
  }
})


</script>

<template>
  <div class="h-full flex-1 w-0 flex flex-col gap-4">
    <!-- 排列 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 flex-wrap">
        <ElInput style="width: 80px;" v-model="radius">
          <template class="px-0" #prepend>圆角</template>
        </ElInput>
        <ElInput style="width: 130px;" v-model="maxSize">
          <template class="px-0" #prepend>maxSize</template>
        </ElInput>
        <ElInput style="width: 80px;" v-model="gap">
          <template class="px-0" #prepend>间距</template>
        </ElInput>
        <ElSelect style="width: 80px;" v-model="scale">
          <ElOption
            v-for="item in scaleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
        <ElSelect style="width: 80px;" v-model="mode">
          <ElOption
            v-for="item in modeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
        <ElInput style="width: 80px;" v-model="col" v-if="mode === Mode.Grid">
          <template class="px-0" #prepend>col</template>
        </ElInput>
      </div>
      <ElButton type="primary" @click="handlerDownloadImg">下载</ElButton>
    </div>
    <!-- 展示图片 -->
    <div :class="`border-[2px] flex-1 ${modeClass} rounded-md border-cyan-400 overflow-auto p-2`">
      <TransitionGroup
        :class="`imgs-group-${mode} bg-transparent`"
        tag="div"
        name="list"
        ref="imgsContainer"
        :style="`gap: ${gap}px; --max-size:${maxSize}px; --col: ${col}`"
      >
        <img
          class="transition-all block"
          v-for="info in data"
          :key="info.id"
          :src="info.url"
          :style="`border-radius: ${radius}px; max-width: ${maxSize}px; max-height: ${maxSize}px`"
          draggable="false"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

::v-deep(.el-input-group__prepend) {
  padding: 0 8px;
}

.imgs-group-0 {
  display: flex;
}
.imgs-group-1 {
  display: flex;
  flex-direction: column;
}
.imgs-group-2 {
  display: grid;
  grid-template-columns: repeat(var(--col), var(--max-size));
  grid-auto-rows: var(--max-size);
  align-items: center;
  justify-items: center;
}
</style>