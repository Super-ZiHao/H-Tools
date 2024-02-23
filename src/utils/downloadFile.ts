import getBase64ImageType from "./getBase64ImageType";
import isBase64String from "./isBase64String";

type Options = {
  url: string;
  /** 文件名称 */
  name?: string;
  /** 文件类型 */
  mimeType?: string;
}
/**
 * 下载 base64 文件
 */
export default function downloadFile({
  url,
  name = "image",
  mimeType
}: Options) {
  // 创建一个a标签用于下载
  let a = document.createElement('a');
  if (isBase64String(url)) {
    a.href = url;
    a.download = `${name}.${mimeType ?? getBase64ImageType(url)}`; // 设置下载的文件名
    a.click(); // 模拟点击下载
    a.remove(); // 下载完成后移除a标签
  } else {
    fetch(url)
      .then(response => {
        // 确保响应是ok的
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 获取blob对象
        return response.blob();
      })
      .then(blob => {
        // 创建一个指向该blob的URL
        const url = window.URL.createObjectURL(blob);

        // 创建一个a元素，并设置它的属性
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `${name}.${blob.type.split('/')[1]}`; // 设置下载的文件名
        // 将a元素添加到文档中，并触发点击事件开始下载
        document.body.appendChild(a);
        a.click();
        // 清理和释放URL对象
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
  }
}