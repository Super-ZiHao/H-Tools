import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router';
import './style/tailwind.css'
createApp(App)
.use(router)
.mount('#app')


declare global {
  const _: typeof import('lodash'); // 声明 _ 变量为 lodash 的类型
  const JSONEditor: typeof import('@/types/JSONEditor').JSONEditor; // 声明 JSONEditor
}