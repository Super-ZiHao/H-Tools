/**
 * 此文件用于修复 vite-plugin-monaco-editor 插件不稳定，被 vite.config.ts 中 base 配置影响打包
 * 
 * 主要实现，将打包后的 index.html 路径替换成正确的
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)

const __dirnameNew = path.dirname(__filenameNew)

fs.readFile(path.join(__dirnameNew, '../dist', 'index.html'), 'utf8', (err, data) => {
    if (err) {
      console.log(err)
        return;
    }
    const newData = data.replace(/monacoeditorwork/g, 'h-tools/monacoeditorwork');
    fs.writeFile(path.join(__dirnameNew, '../dist', 'index.html'), newData, 'utf8', (err) => {
        if (err) {
        console.log(err)
        } else {
            console.log('File updated successfully');
        }
    });
});