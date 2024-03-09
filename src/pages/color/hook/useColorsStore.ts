import { reactive, ref } from "vue";
import { defineStore } from "pinia";

/** 颜色核心 */
const useColorsStore = defineStore('color', () => {
  /** hsb 格式 */
  const hsl = reactive({
    h: 0,
    s: 1,
    l: .5,
  })

  /** 透明度 */
  const alpha = ref(1);

  const changeHSL = ({h, s, l}: {h?: number, s?: number, l?: number}) => {
    (h || h === 0) && (hsl.h = h);
    (s || s === 0) && (hsl.s = s);
    (l || l === 0) && (hsl.l = l);
  }
  const changeAlpha = (value: number) => (alpha.value = value);
  return {
    hsl,
    alpha,
    changeHSL,
    changeAlpha
  }
});

export default useColorsStore;