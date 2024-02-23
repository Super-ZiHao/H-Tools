<script setup lang="ts">
import Header from './components/header.vue';
import Main from './components/main.vue';
</script>

<template>
  <Header />
  <Main>
    <template v-slot:default>
      <RouterView v-slot="{Component, route}">
        <KeepAlive>
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </RouterView>
    </template>
  </Main>
</template>

<style>
html .el-input-group__prepend {
  padding: 0 8px;
}
</style>
