<!-- 代码编辑器组件 -->
<script lang='ts' setup>
withDefaults(defineProps<{
  /** 语言 */
  lang: 'json' | 'scss' | 'less' | 'css',
  /** 当前值 */
  value: string,
  /** 只读 */
  readonly?: boolean,
}>(), {
  readonly: false,
})
</script>

<template>
  <div class="border-[2px] border-cyan-400 flex-1 rounded-md">
    {{ value }}
  </div>
</template>

<style lang='scss' scoped>

</style>