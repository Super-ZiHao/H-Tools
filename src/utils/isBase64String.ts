/**
 * 
 * @description 检查是否是有效的Base64字符串
 * @param base64 base64字符串，建议带 data: 前缀，未带 type 将失效
 * @param type 检测类型
 * @returns boolean
 */
function isBase64String(base64: string, type?: 'img' | 'video' | 'audio') {
  if (typeof base64 !== 'string' || base64.trim().length === 0) return false;
  
  // 不存在 data 前缀
  const dataUriPrefixRegex = /^data:[a-zA-Z0-9-]+/;
  if (!dataUriPrefixRegex.test(base64)) return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(base64);
  
  switch (type) {
    case 'img': {
      const base64Regex = /^data:image\/(png|jpeg|gif|bmp|svg\+xml);base64,(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
      return base64Regex.test(base64);
    }
    case 'audio': {
      const base64Regex = /^data:audio\/(mpeg|aac|ogg|wav|x-flac|x-ms-wma|midi|amr|awb|x-wavpack|mp4|aac+|eaac+);base64,/
      return base64Regex.test(base64)
    }
    case 'video': {
      const base64Regex = /^data:video\/(mp4|avi|mkv|ogg|webm|quicktime|wmv|x-flv|3gp|3gpp|mpeg|hevc|h265|);base64,/
      return base64Regex.test(base64)
    }
    default: {
      const base64Suffix = base64.substring(base64.indexOf(',') + 1); // 跳过前缀和逗号
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(base64Suffix);
    }
  }
}

export default isBase64String;