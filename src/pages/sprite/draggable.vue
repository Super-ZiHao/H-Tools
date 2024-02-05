<script lang='ts' setup>
import { onMounted, ref } from 'vue';
export type ImgInfoType = {
  /** 唯一 id */
  id: string;
  /** 图片地址 */
  url: string;
  /** 图片名字 */
  name: string
  /** 图片类型（格式） */
  type: string;
}

const DRAGGING = 'dragging';
const DRAGGING_ITEM = 'dragging-item';

const imgInfoArr = (defineModel<ImgInfoType[]>())
/** label 元素 */
const labelFileRef = ref();

onMounted(() => {
  console.log(labelFileRef.value.$el);
})
/** 在 label 内拖动 */
const handlerDragover = (e: DragEvent) => { 
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer && (e.dataTransfer.dropEffect = 'copy'); 

  labelFileRef.value.$el?.classList.add('drop-file');
};
/** 拖动文件离开 label */
const handlerDragleave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  labelFileRef.value.$el?.classList.remove('drop-file');
}
/** 格式化拖入图片文件 */
const fileInfoFormat = (files: File[]) => {
  const imgs: File[] = files.filter(file => file.type.startsWith('image/'));
  // 处理图片
  imgs.forEach(img => {
    // 获取图片的宽高
    const imgUrl = URL.createObjectURL(img);
    const image = new Image();
    image.src = imgUrl;
    const info:ImgInfoType = {
      id: _.uniqueId(),
      name: img.name,
      url: imgUrl,
      type: img.type,
    }
    imgInfoArr.value?.push(info);
  })
};

/** 当前拖动元素 */
const sourceNode = ref<HTMLElement>();
/** 结束拖动松开鼠标 */
const handlerDrop = (e: DragEvent) => {
  e.preventDefault();
  labelFileRef.value.$el?.classList.remove('drop-file');
  // 获取拖放的文件
  const files = [...(e.dataTransfer?.files ?? [])]
  fileInfoFormat(files);
}
/** 点击上传 */
const handlerClickUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  fileInfoFormat([...(input.files ?? [])]);
}
/** 拖动开始 */
const handlerDragstart = (e: DragEvent) => {
  labelFileRef.value.$el?.classList.add(DRAGGING);
  setTimeout(() => {
    e.target && (e.target as HTMLElement).classList.add(DRAGGING_ITEM);
  }, 0);
  sourceNode.value = e.target as HTMLElement;
}
/** 拖动进入其他元素 */
const handlerDragenter = (e: DragEvent) => {
  e.preventDefault();
  if (e.target === sourceNode.value || e.target === labelFileRef.value.$el || !sourceNode.value) return;

  const children = Array.from(labelFileRef.value.$el?.children ?? [])
  const sourceIndex = children.indexOf(sourceNode.value)
  const targetIndex = children.indexOf(e.target as HTMLElement)
  console.log(sourceIndex, targetIndex);
  if (!imgInfoArr.value) return;
  let a = imgInfoArr.value[sourceIndex];
  imgInfoArr.value[sourceIndex] = imgInfoArr.value[targetIndex];
  imgInfoArr.value[targetIndex] = a;
}
const handlerDragend = (e: DragEvent) =>  {
  labelFileRef.value.$el?.classList.remove(DRAGGING);
  e.target && (e.target as HTMLElement).classList.remove(DRAGGING_ITEM);
}
</script>

<template>
  <TransitionGroup
    class="flex flex-col gap-2 p-2 w-full h-full draggable cursor-pointer overflow-auto"
    @drop="handlerDrop"
    @dragover="handlerDragover"
    @dragleave="handlerDragleave"
    @dragstart="handlerDragstart"
    @dragenter="handlerDragenter"
    @dragend="handlerDragend"
    for="fileInput"
    ref="labelFileRef"
    name="list"
    tag="label"
  >
    <div
      class="draggable-item w-full h-14 p-2 rounded-md text-ellipsis select-none text-lg bg-slate-100 flex items-center gap-2 cursor-pointer hover:bg-slate-200 active:bg-slate-300 hover:scale-[1.02] transition-all"
      @click="(e) => {
        e.stopPropagation();
        e.preventDefault();
      }"
      draggable="true"
      v-for="info in imgInfoArr"
      :key="info.id"
    >
      <img :src="info.url" class="aspect-square h-full rounded-md" draggable="false" alt="">
      {{ info.name }}
    </div>
  </TransitionGroup>
  <input
    class="hidden"
    type="file"
    accept=".jpg,.jpeg,.png,.gif,.svg"
    :multiple="true"
    @change="handlerClickUpload"
    id="fileInput"
    name="file"
  >
</template>

<style lang='scss' scoped>
.draggable {

  &.dragging { // 改变位置中
    outline: 3px solid rgb(37, 99, 235) !important;
    outline-offset: -3px;
    .draggable-item {
      &:hover,
      &:active {
        transform: scale(1) !important;
        background-color: rgb(241 245 249 / var(--tw-bg-opacity)) !important;
      }
    }
  }
  &.drop-file { // 拖拽上传
    outline: 3px dashed rgb(37, 99, 235);
    outline-offset: -3px;
  }

  &:empty {
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
      content: '点击或拖拽图片文件到这里';
    }
  }

  .dragging-item {

    color: transparent;
    background-color: transparent;
    border: 1px solid rgb(203 213 225 / var(--tw-bg-opacity));
    img {
      opacity: 0;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>