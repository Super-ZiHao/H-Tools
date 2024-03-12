import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import tinycolor2, { ColorFormats } from 'tinycolor2';
import { divideAngle } from "../utils";

export enum ColorRecommendTypeEnum {
  NULL = 0,
  Complementary = 2,
  Triadic = 3,
  Tetradic = 4,
}

type ColorType = {
  hex?: string,
  hue?: number,
  sv?: { s?: number, v?: number },
  sl?: { s?: number, l?: number },
  rgb?: ColorFormats.RGB
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
  const hslString = computed(() => `hsla(${hue.value}, ${sl.s}%, ${sl.l}%, ${opacity.value}%)`);

  /** 推荐类型 */
  const colorRecommendType = ref<ColorRecommendTypeEnum>(ColorRecommendTypeEnum.NULL)
  /** 推荐颜色 */
  const colorRecommend = computed(() => {
    const color = tinycolor2({...hsv.value, a: opacity.value / 100 });
    const [, h_120, h_240] = divideAngle(hue.value, 3);
    const [, h_90, h_180, h_270] = divideAngle(hue.value, 4);
    
    // 互补组合
    const color_0 = color.toRgb();
    const color_180 = tinycolor2({ h: h_180, s: hsv.value.s, v: hsv.value.v, a: opacity.value / 100 }).toRgb();
  
    // 三色组合
    const color_120 = tinycolor2({ h: h_120, s: hsv.value.s, v: hsv.value.v, a: opacity.value / 100 }).toRgb();
    const color_240 = tinycolor2({ h: h_240, s: hsv.value.s, v: hsv.value.v, a: opacity.value / 100 }).toRgb();
  
    // 四色组合
    const color_90 = tinycolor2({ h: h_90, s: hsv.value.s, v: hsv.value.v, a: opacity.value / 100 }).toRgb();
    const color_270 = tinycolor2({ h: h_270, s: hsv.value.s, v: hsv.value.v, a: opacity.value / 100 }).toRgb();
    return {
      color_0,
      color_120,
      color_240,
      color_90,
      color_180,
      color_270
    }
  })

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
  /** 更新颜色 */
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
  /** 更新透明度 */
  const updateOpacity = (argOpacity: number) => {
    opacity.value = argOpacity;
  }
  /** 拷贝颜色 */
  return {
    colorRecommendType,
    colorRecommend,
    hex,
    hsv,
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