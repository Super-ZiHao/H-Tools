// router/index.js
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

export const toolsRouter: RouteRecordRaw[] = [
  {
    path: '/sprite',
    name: '雪碧图',
    component: () => import('@/pages/sprite/index.vue'),
  },
  {
    path: '/file-download',
    name: '文件下载',
    component: () => import('@/pages/fileDownload.vue'),
  },
  {
    path: '/to-base64',
    name: '转base64',
    component: () => import('@/pages/toBase64/index.vue'),
  },
  {
    path: '/scss-to-css',
    name: 'scss转css',
    component: () => import('@/pages/scssToCss/index.vue'),
  }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: toolsRouter[0].path,
  },
  ...toolsRouter
  // 更多的路由...
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
