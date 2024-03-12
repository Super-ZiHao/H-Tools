// router/index.js
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

export interface RouterMetaType {
  bgColor?: string;
  headerBgColor?: string;
}

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
    path: '/color',
    name: 'COLOR',
    component: () => import('@/pages/color/index.vue'),
    meta: {
      bgColor: '#343434',
    }
  },
  {
    path: '/to-base64',
    name: 'TO-BASE64',
    component: () => import('@/pages/toBase64/index.vue'),
  },
  {
    path: '/to-css',
    name: 'TO-CSS',
    component: () => import('@/pages/toCss/index.vue'),
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

let loading: any;
router.beforeEach((_to, _from, next) => {
  loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.7)',
  })
  next()
})
router.afterEach(() => {
  loading?.close()
})

export default router
