import { onBeforeMount, ref } from "vue";
import { defineStore } from "pinia";
import { ColorFormats } from "tinycolor2";
import { uniqWith } from 'lodash-es';

const HISTORY_COLOR_KEY = 'history-color';
export const MAX_LENGTH = 50;
/** 历史保存颜色 */
const useHistoryColor = defineStore(HISTORY_COLOR_KEY, () => {
  // 获取
  onBeforeMount(() => {
    try {
      const history = (JSON.parse(localStorage.getItem(HISTORY_COLOR_KEY) || '[]') as []).filter((_i, idx) => idx <= MAX_LENGTH);
      const uniqHistory = uniqWith([...history], (v1: any, v2: any) => {
        return v1.r === v2.r && v1.g === v2.g && v1.b === v2.b
      })
      historyColor.value = uniqHistory;
    } catch (e) {
      console.log(e)
    }
  })
  const historyColor = ref<ColorFormats.RGBA[]>([])
  const saveHistoryColor = (color: ColorFormats.RGBA) => {
    const uniqHistory = uniqWith([color, ...historyColor.value], (v1: ColorFormats.RGBA, v2: ColorFormats.RGBA) => {
      return v1.r === v2.r && v1.g === v2.g && v1.b === v2.b && v1.a === v2.a
    }).filter((_i, idx) => idx <= MAX_LENGTH);
    historyColor.value = uniqHistory
    localStorage.setItem(HISTORY_COLOR_KEY, JSON.stringify(uniqHistory));
  }
  return {
    historyColor,
    saveHistoryColor
  }
});

export default useHistoryColor;