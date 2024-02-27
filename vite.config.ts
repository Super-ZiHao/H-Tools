import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer';
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import'
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

enum PackageType {
  ElementPlus = 'element-plus',
  JSONEditor = 'jsoneditor',
  html2canvas = 'html2canvas',
  VueRouter = 'vue-router',
  ElementPlusIconsVue = '@element-plus/icons-vue',
}

const getCompleteUrl = (name: string, css?: boolean) => {
  let varName = null;
  for (const key in PackageType) {
    if (PackageType[key] === name) {
      varName = key;
    }
  }
  return ({
    name,
    var: varName,
  })
}

export default defineConfig({
  plugins: [
    vue(),
    (monacoEditorPlugin as any).default({
      languageWorkers: ['css']
    }),
    visualizer({ open: true }), // 打包产物明细
    importToCDN({
      prodUrl: 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
      modules: [
        autoComplete('vue'),
        autoComplete("lodash"),
        {
          ...getCompleteUrl(PackageType.VueRouter),
          path: 'dist/vue-router.global.min.js'
        },
        {
          ...getCompleteUrl(PackageType.ElementPlus),
          css: `dist/index.min.css`,
          path: 'dist/index.full.min.js',
        },
        {
          ...getCompleteUrl(PackageType.ElementPlusIconsVue),
          path: 'dist/index.iife.min.js',
        },
        {
          ...getCompleteUrl(PackageType.JSONEditor),
          css: 'dist/jsoneditor.min.css',
          path: 'dist/jsoneditor.min.js',
        },
        {
          ...getCompleteUrl(PackageType.html2canvas),
          path: 'dist/html2canvas.min.js',
        },
      ]
    }),
  ],
  base: '/h-tools/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'public': resolve(__dirname, 'public'),
    }
  },
})
