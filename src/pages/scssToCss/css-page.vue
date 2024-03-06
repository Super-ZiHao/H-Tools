<script lang='ts' setup>
import { ref, watch } from 'vue';
import CodeEditor from '@/components/code-editor/index.vue';
import { compileString } from 'sass';
import { render } from 'less';
import { Mode } from './type';

const props = defineProps<{
  value: string
  // 当前转换语言
  currentLanguage: Mode;
}>();

const code = ref('');

const handlerChange = (newValue: string) => {
  try {
    switch (props.currentLanguage) {
      case Mode.SCSS: {
        const compile = compileString(newValue);
        code.value = compile.css;
        break;
      }
      case Mode.LESS: {
        render(newValue).then(res => {
          code.value = res.css;
        })
        break;
      }
    }
  } catch (error) {
    code.value = '出现错误～'
  }
  
}
watch(() => props.value, handlerChange)
watch(() => props.currentLanguage, () => handlerChange(props.value))

</script>

<template>
  <CodeEditor :error="code === 'error'" language="css" :value="code" :readonly="true" />
</template>

<style lang='scss' scoped>

</style>