import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)

const removeFilePath = path.join(__dirnameNew, '../dist/h-tools');
const copyFilePath = path.join(__dirnameNew, '../dist/h-tools/monacoeditorwork');
const copeToFilePath = path.join(__dirnameNew, '../dist/monacoeditorwork');
fs.cp(copyFilePath, copeToFilePath, { recursive: true }, (err) => {
  if (err) {
    console.log('copy 失败')
  } else {
    fs.rmdir(removeFilePath, { recursive: true }, (err) => {
      if (err) {
        console.log('删除失败')
      } else {
        console.log('打包完成 success');
      }
    });
  }
})

