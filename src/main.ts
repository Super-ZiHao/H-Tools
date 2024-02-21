import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router';
import './style/tailwind.css'
createApp(App)
.use(router)
.mount('#app')


/** cdn 引入库的类型 */
declare global {
  const _: typeof import('lodash'); // 声明 _ 变量为 lodash 的类型
  const JSONEditor: typeof import('jsoneditor').default; // 声明 JSONEditor
  const html2canvas: typeof import('html2canvas').default; // 声明 html2canvas
}