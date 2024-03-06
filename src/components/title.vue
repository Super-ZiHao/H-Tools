<!-- 工具名称 -->
<script lang='ts' setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <div class="text-2xl mb-3 text-[#5C8374]">
    {{ route.meta.title }}
  </div>
</template>
