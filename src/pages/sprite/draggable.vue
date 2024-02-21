<script lang='ts' setup>
import { ElButton } from 'element-plus';
import { ref } from 'vue';
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
const DROP_FILE = 'drop-file';
const DRAGGING_ITEM = 'dragging-item';

const imgInfoArr = (defineModel<ImgInfoType[]>())
const containerRef = ref();
const handlerDragover = (e: DragEvent) => { 
  e.preventDefault();
  containerRef.value.classList.add(DROP_FILE);
};
const handlerDragleave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  containerRef.value.classList.remove(DROP_FILE);
}
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
const handlerDrop = (e: DragEvent) => {
  e.preventDefault();
  containerRef.value.classList.remove(DROP_FILE);
  // 获取拖放的文件
  const files = [...(e.dataTransfer?.files ?? [])]
  fileInfoFormat(files);
}

/** 拖拽程序 */
const sourceNode = ref<HTMLElement>();
const labelFileRef = ref();
const handlerDragstart = (e: DragEvent) => {
  containerRef.value?.classList.add(DRAGGING);
  setTimeout(() => {
    e.target && (e.target as HTMLElement).classList.add(DRAGGING_ITEM);
  }, 0);
  sourceNode.value = e.target as HTMLElement;
}
const handlerDragenter = (e: DragEvent) => {
  e.preventDefault();
  if (e.target === sourceNode.value || e.target === labelFileRef.value.$el || !sourceNode.value) return;

  const children = Array.from(labelFileRef.value.$el?.children ?? [])
  const sourceIndex = children.indexOf(sourceNode.value)
  const targetIndex = children.indexOf(e.target as HTMLElement)
  if (!imgInfoArr.value) return;
  let a = imgInfoArr.value[sourceIndex];
  imgInfoArr.value[sourceIndex] = imgInfoArr.value[targetIndex];
  imgInfoArr.value[targetIndex] = a;
}
const handlerDragend = (e: DragEvent) =>  {
  containerRef.value?.classList.remove(DRAGGING);
  e.target && (e.target as HTMLElement).classList.remove(DRAGGING_ITEM);
}

/** input change */
const handlerInputChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  fileInfoFormat([...(input.files ?? [])]);
}
const fileInputRef = ref<HTMLInputElement>();
</script>

<template>
  <div class="container flex-shrink-0 relative w-64 rounded-md h-full border-[2px] transition-all border-cyan-400 overflow-auto"
    @drop="handlerDrop"
    @dragleave="handlerDragleave"
    @dragover="handlerDragover"
    ref="containerRef"
  >
    <TransitionGroup
      class="flex relative flex-col gap-2 p-2 w-full mb-9 draggable transition-all"
      @dragstart="handlerDragstart"
      @dragenter="handlerDragenter"
      @dragend="handlerDragend"
      ref="labelFileRef"
      name="list"
      tag="div"
    >
      <div
        class="draggable-item text-nowrap overflow-hidden w-full h-14 p-2 rounded-md text-ellipsis select-none text-lg bg-slate-100 flex items-center gap-2 cursor-pointer hover:bg-slate-200 active:bg-slate-300 hover:scale-[1.02] transition-all"
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
    <ElButton
      class="upload-btn"
      type="success" 
      @click="fileInputRef?.click()"
    >
      点击上传
    </ElButton>
    <input
      class="hidden"
      type="file"
      accept=".jpg,.jpeg,.png,.gif,.svg"
      :multiple="true"
      @change="handlerInputChange"
      ref="fileInputRef"
      name="file"
    >
  </div>
</template>

<style lang='scss' scoped>

.container {
  &.drop-file { // 拖拽上传
    border: 2px dashed #7ec050;
  }
  &.dragging { // 改变位置中
    border: 2px solid rgb(37, 99, 235) !important;
    .draggable-item {
      &:hover,
      &:active {
        transform: scale(1) !important;
        background-color: rgb(241 245 249 / var(--tw-bg-opacity)) !important;
      }
    }
  }
}

.upload-btn { // 上传按钮
  position: sticky;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}

.draggable {
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
  transform: translateY(20px);
}
</style>