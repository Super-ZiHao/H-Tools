import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { copy } from 'clipboard';
import tinycolor2, { ColorFormats, ColorInputWithoutInstance } from 'tinycolor2';

type ColorType = 'rgba' | 'hsla' | 'hsva' | 'hex8' | 'auto'
type ColorInput = ColorFormats.HSLA & ColorFormats.HSVA & ColorFormats.RGBA
export enum ColorRecommendTypeEnum {
  NULL = 0,
  Complementary = 2,
  Triadic = 3,
  Tetradic = 4,
}

export enum ColorTypeEnum {
  RGB = 'rgb',
  HEX = 'hex',
  HSL = 'hsl',
  HSV = 'hsv',
  ALPHA = 'alpha',
  HUE = 'hue',
}
const DEFAULT_ARR: any[] = []

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
  const alpha = ref(100);

  const hsv = computed(() => ({ h: hue.value, s: sv.s / 100, v: sv.v / 100 }));
  const hslString = computed(() => `hsla(${hue.value}, ${sl.s}%, ${sl.l}%, ${alpha.value}%)`);

  /** 推荐类型 */
  const colorRecommendNumber = ref<ColorRecommendTypeEnum>(ColorRecommendTypeEnum.NULL)

  const updateColor = (updateColorType: ColorType, value?: any, arr: ColorTypeEnum[] = DEFAULT_ARR) => {
    const {
      h = hue.value,
      s = (updateColorType === 'hsva' ? sv.s : sl.s) / 100,
      v = sv.v / 100,
      l = sl.l / 100,
      r = rgb.r,
      g = rgb.g,
      b = rgb.b,
      a = alpha.value / 100
    } = (typeof value === 'string' ? {} : value) as ColorInput;
    let tinycolor: tinycolor2.Instance;

    switch (updateColorType) {
      case 'hex8': tinycolor = tinycolor2(hex.value); break;
      case 'hsla': tinycolor = tinycolor2({ h, s, l, a }); break;
      case 'rgba': tinycolor = tinycolor2({ r, g, b, a }); break;
      case 'hsva': tinycolor = tinycolor2({ h, s, v, a }); break;
      case 'auto': tinycolor = tinycolor2(value as ColorInputWithoutInstance); break;
      default: tinycolor = tinycolor2(hex.value); break;
    }

    const hsv = tinycolor.toHsv()
    const hsl = tinycolor.toHsl()
    const colorType: ColorTypeEnum[] = Object.values(ColorTypeEnum) as any;
    const useColorArr = colorType.filter(item => !arr.includes(item as ColorTypeEnum))

    useColorArr.forEach(item => {
      switch (item) {
        case ColorTypeEnum.HEX: hex.value = tinycolor.toHex(); break;
        case ColorTypeEnum.HUE: hue.value = hsv.h; break;
        case ColorTypeEnum.ALPHA: alpha.value = hsv.a * 100; break;
        case ColorTypeEnum.RGB: Object.assign(rgb, tinycolor.toRgb()); break;
        case ColorTypeEnum.HSL: Object.assign(sl, { s: hsl.s * 100, l: hsl.l * 100 }); break;
        case ColorTypeEnum.HSV: Object.assign(sv, { s: hsv.s * 100, v: hsv.v * 100 }); break;
      }
    })
  }
  /** 拷贝颜色 */
  const copyColor = (s: string) => {
    copy(s);
    ElMessage.success(`复制成功: ${s}`);
  }
  return {
    colorRecommendNumber,
    hex,
    hsv,
    sl,
    sv,
    hue,
    alpha,
    rgb,
    hslString,
    updateColor,
    copyColor,
  }
});

export default useColorsStore;