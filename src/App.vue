<script setup lang="ts">
import {  } from 'vue-router';
import Header from './components/header.vue';
import Main from './components/main.vue';
</script>

<template>
  <Header />
  <Main>
    <template v-slot:default>
      <RouterView />
    </template>
  </Main>
</template>

<style scoped>
</style>
