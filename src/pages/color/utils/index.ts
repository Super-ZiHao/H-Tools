
// 获取 360 度角的 % 值 数组
export const divideAngle = (angle: number, count = 3) => {
  const a = angle >= 0 ? angle % 360 : -angle % 360;
  const b = 360 / count;
  return Array.from({ length: count }).map((_i, idx) => ((idx * b) + a) % 360)
}

export const getAngle = (angle: number) => angle >= 0 ? angle % 360 : -angle % 360;

// 兼容移动端
export const getEventType = (e: MouseEvent | TouchEvent) => {
  const type = e.type;
  if (type === 'touchmove' || type === 'touchstart' || type === 'touchend') return (e as TouchEvent).touches[0];
  return e as MouseEvent;
}