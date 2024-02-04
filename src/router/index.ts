// router/index.js
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

export const toolsRouter: RouteRecordRaw[] = [
  // {
  //   path: '/sprite',
  //   name: '雪碧图',
  //   component: () => import('@/pages/sprite.vue'),
  // },
  {
    path: '/base64-to-Img',
    name: 'base64-to-Img',
    component: () => import('@/pages/base64Img.vue'),
  },
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
