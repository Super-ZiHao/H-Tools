import getBase64ImageType from "./getBase64ImageType";

type Options = {
  /** base64 */
  base64: string;
  /** 文件名称 */
  name?: string;
  /** 文件类型 */
  mimeType?: string;
}
/**
 * 下载 base64 文件
 */
export default function downloadBase64({
  base64,
  name = "image",
  mimeType
}: Options) {
  // 创建一个a标签用于下载
  let a = document.createElement('a');
  a.href = base64;
  a.download = `${name}.${mimeType ?? getBase64ImageType(base64)}`; // 设置下载的文件名
  a.click(); // 模拟点击下载
  a.remove(); // 下载完成后移除a标签
}