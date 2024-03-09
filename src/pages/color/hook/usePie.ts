import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import useColorsStore from './useColorsStore'

function usePie(borderWidth: number) {
  const { changeHSL } = useColorsStore();
  const pieRef = ref<HTMLDivElement>()
  /**  */
  const pieDargPosition = reactive({
    left: 0,
    top: 0,
  })

  onMounted(() => {
    if (!pieRef.value) return;
    const { left, top, width } = pieRef.value.getBoundingClientRect();
    
    const centerX = left + (width / 2); // 圆心 X 坐标
    const centerY = top + (width / 2); // 圆心 Y 坐标
    const radius = (width - borderWidth) / 2; // 圆半径
    const startAngle = 0; // 开始的角度

    // 获取弧度
    const getRadians = (angle: number) => (angle * (Math.PI / 180));
    const startRadians = getRadians(startAngle);
    pieDargPosition.left = radius * Math.cos(0 - startRadians) + radius;
    pieDargPosition.top = radius * Math.sin(0 - startRadians) + radius;
    const move = (e: MouseEvent)=>{
      if (!pieRef.value) return;
      const { clientX, clientY } = e
        // 计算鼠标坐标相对于圆心的坐标
      const relativeX = clientX - centerX;
      const relativeY = clientY - centerY;
      // 计算角度
      const angle = Math.atan2(relativeY, relativeX) * (180 / Math.PI);
      // 根据圆的起始方向调整角度（如果是从水平向右开始，则需要减去90度）
      const adjustedAngle = angle - startAngle;
      const currentAngle = (adjustedAngle + 360) % 360;
      changeHSL({ h: currentAngle })
      // 将起始角度和当前角度转换为弧度
      const currentRadians = getRadians(currentAngle)
      // 计算滑块移动的角度差
      const angleDifference = currentRadians - startRadians;
      // 计算滑块在x轴和y轴的位置
      const x = radius * Math.cos(angleDifference) + radius; // 假设圆盘的中心在原点(0,0)
      const y = radius * Math.sin(angleDifference) + radius;
      pieDargPosition.left = x;
      pieDargPosition.top = y;
    }
    const down = () => {
      if (!pieRef.value) return;
      document.body.addEventListener('mousemove', move)
    }
    const up = () => {
      if (!pieRef.value) return;
      document.body.removeEventListener('mousemove', move)
    }

    pieRef.value.addEventListener('mousedown', down)
    document.body.addEventListener('mouseup', up)

    onBeforeUnmount(() => {
      if (!pieRef.value) return;
      pieRef.value.removeEventListener('mousedown', down)
      document.body.removeEventListener('mouseup', up)
    })
  })
  return {
    pieRef,
    pieDargPosition
  }
}

export default usePie;