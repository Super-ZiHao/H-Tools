import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

export default defineConfig({
  plugins: [
    vue(),
    (monacoEditorPlugin as any).default({
      languageWorkers: ['css', 'json'],
    }),
    visualizer({ open: true }), // 打包产物明细
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: '/h-tools/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'public': resolve(__dirname, 'public'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        // TODO: 处理GitHub Pages 部署 _plugin-vue_export-helper.js 404
        // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
        sanitizeFileName(name: any) {
          const match = DRIVE_LETTER_REGEX.exec(name)
          const driveLetter = match ? match[0] : ''
          // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
          // Otherwise, avoid them because they can refer to NTFS alternate data streams.
          return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
        },
      }
    }
  }
})
