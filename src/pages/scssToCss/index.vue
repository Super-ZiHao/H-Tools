<script lang='ts' setup>
import CssPage from './css-page.vue';
import CodeEditor from '@/components/code-editor/index.vue';
import { ref } from 'vue';
import Title from '@/components/title.vue';
import { Mode } from './type';

const value = ref('');
const mode = ref<Mode>(Mode.SCSS)
</script>

<template>
  <Title />
  <div class="shadow-2xl border rounded-xl w-full h-full max-w-[1440px] p-4 flex gap-4">
    <!-- scss 编辑器 -->
    <div class="flex-1 h-full flex items-center flex-col gap-4 relative">
      <div class="absolute z-10 left-2 bottom-2">
        <ElDropdown>
          <ElTag type="primary" effect="dark">{{ mode.toLocaleUpperCase() }}</ElTag>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem v-for="item in Mode" @click="mode = item" :key="item">{{ item.toLocaleUpperCase() }}</ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </div>
      <CodeEditor
        v-if="mode === Mode.SCSS"
        language="scss"
        @change="(v) => value = v"
        :default-value="value"
      />
      <CodeEditor
        v-else
        language="less"
        @change="(v) => value = v"
        :default-value="value"
      />
    </div>
    <!-- css 展示区 -->
    <div class="flex-1 h-full flex items-center flex-col gap-4 relative">
      <ElTag class="absolute left-2 bottom-2 z-10 cursor-default select-none" type="success" effect="dark">CSS</ElTag>
      <CssPage :current-language="mode" :value="value" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>