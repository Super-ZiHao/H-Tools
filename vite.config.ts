import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer';
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import'

enum PackageType {
  ElementPlus = 'element-plus',
  JSONEditor = 'jsoneditor',
  Html2Canvas = 'html2canvas',
  VueRouter = 'vue-router',
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
          ...getCompleteUrl(PackageType.JSONEditor),
          css: 'dist/jsoneditor.min.css',
          path: 'dist/jsoneditor.min.js',
        },
        {
          ...getCompleteUrl(PackageType.Html2Canvas),
          path: 'dist/html2canvas.full.min.js',
        },
      ]
    })
  ],
  base: '/h-tools/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'public': resolve(__dirname, 'public'),
    }
  },
})
