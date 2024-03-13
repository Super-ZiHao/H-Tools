import { computed, onBeforeMount, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { copy } from 'clipboard';
import tinycolor2, { ColorInputWithoutInstance } from 'tinycolor2';
import tinycolor from "tinycolor2";

type ColorType = 'rgba' | 'hsla' | 'hsva' | 'hex8' | 'auto'

export enum ColorTypeEnum {
  RGB = 'rgb',
  HEX = 'hex',
  HSL = 'hsl',
  HSV = 'hsv',
  RGBA = 'rgba',
  HEX8 = 'hex8',
  HSLA = 'hsla',
  HSVA = 'hsva',
}

/** 推荐颜色 */
export enum ColorRecommendTypeEnum {
  NULL = 0,
  Complementary = 2,
  Triadic = 3,
  Tetradic = 4,
}

/** 更新全局颜色 */
export enum UpdateColorTypeEnum {
  RGB = 'rgb',
  HEX = 'hex',
  HSL = 'hsl',
  HSV = 'hsv',
  ALPHA = 'alpha',
  HUE = 'hue',
}
const DEFAULT_ARR: any[] = []


interface ColorCore {
  hex: string;
  r: number;
  g: number;
  b: number;
  hue: number;
  sv_s: number;
  v: number;
  sl_s: number;
  l: number
  alpha: number;
}
const intNumber: (a: number) => number = (a: number) => Math.round(a)
/** 颜色核心 */
const useColorsStore = defineStore('color', () => {

  onBeforeMount(() => { // 初始化当前核心颜色
    const color = 'red';
    const colorCore = tinycolor(color)
    const rgb = colorCore.toRgb()
    const hsl = colorCore.toHsl()
    const hsv = colorCore.toHsv()
    console.log(rgb)
    Object.assign(currentColorCore, {
      hex: colorCore.toHex(),
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
      hue: hsl.h,
      sv_s: hsv.s * 100,
      v: hsv.v * 100,
      sl_s: hsl.s * 100,
      l: hsl.l * 100,
      alpha: rgb.a * 100,
    })
  })
  // @ts-ignore
  const currentColorCore = reactive<ColorCore>({})



  const formatCurrentColorCore = computed(() => ({
    hex: currentColorCore.hex,
    r: intNumber(currentColorCore.r),
    g: intNumber(currentColorCore.g),
    b: intNumber(currentColorCore.b),
    hue: intNumber(currentColorCore.hue),
    sv_s: intNumber(currentColorCore.sv_s),
    v: intNumber(currentColorCore.v),
    sl_s: intNumber(currentColorCore.sl_s),
    l: intNumber(currentColorCore.l),
    alpha: intNumber(currentColorCore.alpha),
  }))

  /** 推荐类型 */
  const colorRecommendNumber = ref<ColorRecommendTypeEnum>(ColorRecommendTypeEnum.NULL)

  /** 当前格式 */
  const currentFormat = ref<ColorTypeEnum>(ColorTypeEnum.HEX)

  const updateColor = (updateColorType: ColorType, value?: any, arr: UpdateColorTypeEnum[] = DEFAULT_ARR) => {
    const {
      h = currentColorCore.hue,
      s = (updateColorType === 'hsva' ? currentColorCore.sv_s : currentColorCore.sl_s) / 100,
      v = currentColorCore.v / 100,
      l = currentColorCore.l / 100,
      r = currentColorCore.r,
      g = currentColorCore.g,
      b = currentColorCore.b,
      a = currentColorCore.alpha / 100
    } = typeof value === 'object' ? value : {}
    let tinycolor: tinycolor2.Instance;
    switch (updateColorType) {
      case 'hex8': tinycolor = tinycolor2(currentColorCore.hex); break;
      case 'hsla': tinycolor = tinycolor2({ h, s, l, a }); break;
      case 'rgba': tinycolor = tinycolor2({ r, g, b, a }); break;
      case 'hsva': tinycolor = tinycolor2({ h, s, v, a }); break;
      case 'auto': tinycolor = tinycolor2(value as ColorInputWithoutInstance); break;
      default: tinycolor = tinycolor2(currentColorCore.hex); break;
    }

    const hsv = tinycolor.toHsv()
    const hsl = tinycolor.toHsl()
    const colorType: UpdateColorTypeEnum[] = Object.values(UpdateColorTypeEnum) as any;
    const useColorArr = colorType.filter(item => !arr.includes(item as UpdateColorTypeEnum))

    useColorArr.forEach(item => {
      switch (item) {
        case UpdateColorTypeEnum.HEX: currentColorCore.hex = tinycolor.toHex(); break;
        case UpdateColorTypeEnum.HUE: currentColorCore.hue = hsv.h; break;
        case UpdateColorTypeEnum.ALPHA: currentColorCore.alpha = hsv.a * 100; break;
        case UpdateColorTypeEnum.RGB: Object.assign(currentColorCore, tinycolor.toRgb()); break;
        case UpdateColorTypeEnum.HSL: Object.assign(currentColorCore, { sl_s: hsl.s * 100, l: hsl.l * 100 }); break;
        case UpdateColorTypeEnum.HSV: Object.assign(currentColorCore, { sv_s: hsv.s * 100, v: hsv.v * 100 }); break;
      }
    })
  }
  /** 拷贝颜色 */
  const copyColor = (s: string) => {
    copy(s);
    ElMessage.success(`复制成功: ${s}`);
  }
  return {
    currentColorCore,
    formatCurrentColorCore,
    colorRecommendNumber,
    currentFormat,
    updateColor,
    copyColor,
  }
});

export default useColorsStore;