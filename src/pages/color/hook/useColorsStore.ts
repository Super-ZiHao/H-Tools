import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import tinycolor2 from 'tinycolor2';

type ColorType = {
  hex?: string,
  hue?: number,
  sv?: { s?: number, v?: number },
  sl?: { s?: number, l?: number },
  rgb?: { r?: number, g?: number, b?: number }
}
enum ColorTypeEnum {
  hex = 'hex',
  hue = 'hue',
  sv = 'sv',
  sl = 'sl',
  rgb = 'rgb',
}

/** 颜色核心 */
const useColorsStore = defineStore('color', () => {
  const hex = ref('ff0000');
  const hue = ref(0);
  /** sv */ 
  const sv = reactive({
    s: 100,
    v: 100,
  })
  /** hsb 格式 */
  const sl = reactive({
    s: 100,
    l: 50,
  })
  const rgb = reactive({
    r: 255,
    g: 0,
    b: 0
  })
  /** 透明度 */
  const opacity = ref(100);
  const hsv = computed(() => ({ h: hue.value, s: sv.s / 100, v: sv.v / 100 }));
  const hsl = computed(() => ({ h: hue.value, s: sl.s / 100, l: sl.l / 100 }));
  const hslString = computed(() => `hsla(${hue.value}, ${sl.s}%, ${sl.l}%, ${opacity.value}%)`);

  const change = (color: tinycolor2.Instance, updateArr: ColorTypeEnum[]) => {
    const v_hex = color.toHex();
    const v_hsl = color.toHsl();
    const v_hsv = color.toHsv();
    const v_rgb = color.toRgb();
    const currentArray =Object.keys(ColorTypeEnum).filter(i => !updateArr.includes(i as ColorTypeEnum));
    currentArray.forEach((item) => {
      switch (item) {
        case ColorTypeEnum.hue: {
          hue.value = v_hsl.h;
          break;
        }
        case ColorTypeEnum.sv: {
          Object.assign(sv, {
            s: v_hsv.s * 100,
            v: v_hsv.v * 100
          })
          break;
        }
        case ColorTypeEnum.sl: {
          Object.assign(sl, {
            s: v_hsl.s * 100,
            l: v_hsl.l * 100
          })
          break;
        }
        case ColorTypeEnum.rgb: {
          Object.assign(rgb, v_rgb);
          break;
        }
        case ColorTypeEnum.hex: {
          hex.value = v_hex;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  const updateColor = ({
    hex: argHex,
    hue: argHue,
    rgb: argRgb,
    sl: argSl,
    sv: argSv,
  }: ColorType, deep: boolean = false) => {
    if (deep) {
      argHex && (hex.value = argHex);
      argHue && (hue.value = argHue);
      argRgb && (Object.assign(rgb, argRgb));
      argSl && (Object.assign(sl, argSl));
      argSv && (Object.assign(sv, argSv));
    }
    if (argHex) {
      change(tinycolor2(argHex ?? hex.value), [ColorTypeEnum.hex])
    }
    if (argHue || argHue === 0) {
      change(tinycolor2({ h: argHue ?? hex.value, s: sl.s / 100, l: sl.l / 100 }), [ColorTypeEnum.hue, ColorTypeEnum.sl, ColorTypeEnum.sv])
    }
    if (argRgb) {
      change(tinycolor2({ ...rgb, ...argRgb }), [ColorTypeEnum.rgb])
    }
    if (argSl) {
      change(tinycolor2({ h: hue.value, s: (argSl.s ?? sv.s) / 100, l: (argSl.l ?? sv.v)/ 100 }), [ColorTypeEnum.sl, ColorTypeEnum.hue])
    }
    if (argSv) {
      change(tinycolor2({ h: hue.value, s: (argSv.s ?? sv.s) / 100, v: (argSv.v ?? sv.v)/ 100 }), [ColorTypeEnum.sv, ColorTypeEnum.hue])
    }
  }

  const updateOpacity = (argOpacity: number) => {
    opacity.value = argOpacity;
  }
  return {
    hex,
    hsv,
    hsl,
    sl,
    sv,
    hue,
    opacity,
    rgb,
    hslString,
    updateColor,
    updateOpacity,
  }
});

export default useColorsStore;