import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import useColorsStore from "./useColorsStore";
import tinycolor2 from 'tinycolor2';

function useSquare() {
  const { changeHSL, hsl } = useColorsStore();
  /** 滑块位置信息 */
  const squareDargPosition = reactive({
    left: 0,
    top: 0,
  })
  const handlerChangeOffset = (e: MouseEvent) => {
    if (!squareRef.value) return
    const {left, top, right, bottom, width, height } = squareRef.value.getBoundingClientRect();
    const { clientX, clientY } = e;
    let s, v;
    if (clientX >= left && clientX <= right) {
      squareDargPosition.left = clientX - left;
      s = (clientX - left) / width;
    } else if (clientX > right) {
      squareDargPosition.left = width;
      s = 1;
    } else {
      squareDargPosition.left = 0;
      s = 0
    }
    if (clientY >= top && clientY <= bottom) {
      squareDargPosition.top = clientY - top;
      v = 1 - ((clientY - top) / height);
    } else if (clientY > bottom) {
      squareDargPosition.top = height;
      v = 0;
    } else {
      squareDargPosition.top = 0;
      v = 1
    }
    const color = tinycolor2({ h: hsl.h, s, v }).toHsl()
    changeHSL({ s: color.s, l: color.l})
  }

  const handlerSquareDown = (e: MouseEvent) => {
    handlerChangeOffset(e)
    document.body.addEventListener('mousemove', handlerChangeOffset)
    const up = () => {
      document.body.removeEventListener('mousemove', handlerChangeOffset)
      document.body.removeEventListener('mouseup', up)
    }
    document.body.addEventListener('mouseup', up)
  }

  onMounted(() => {
    squareDargPosition.left = (squareRef.value?.offsetWidth) ?? 0;
    squareRef.value?.addEventListener('mousedown', handlerSquareDown)
    onBeforeUnmount(() => {
      squareRef.value?.removeEventListener('mousedown', handlerSquareDown)
    })
  })

  const squareRef = ref<HTMLDivElement>();

  return { squareRef, squareDargPosition }
}

export default useSquare;