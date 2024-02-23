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
    component: () => import('@/pages/base64Img.vue'),
  },
  // {
  //   path: '/to-base64',
  //   name: 'to-base64',
  //   component: () => import('@/pages/toBase64.vue'),
  // }
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
