import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";

/** 颜色核心 */
const useColorsStore = defineStore('color', () => {

  /** sv */ 
  const hue = ref(0);
  const sv = reactive({
    s: 100,
    v: 100,
  })
  /** hsb 格式 */
  const sl = reactive({
    s: 100,
    l: 50,
  })
  /** 透明度 */
  const opacity = ref(100);

  const hsv = computed(() => ({ h: hue.value, s: sv.s, v: sv.v }));
  const hsl = computed(() => ({ h: hue.value, s: sl.s, l: sl.l }));
  const hslString = computed(() => `hsla(${hsl.value.h}, ${hsl.value.s}%, ${hsl.value.l}%, ${opacity.value / 100})`);
  return {
    hsv,
    hsl,
    sl,
    sv,
    hue,
    opacity,
    hslString,
  }
});

export default useColorsStore;