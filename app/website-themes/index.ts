import { Elements } from '~/types/page-data';
import { elements as dawn } from "./dawn";

const themeMap = {
  DAWN: dawn
}

export const getWidgetComponentMap = (theme: keyof typeof themeMap) => {
  return {
    [Elements.TEXT]: themeMap[theme].TextWidget,
    [Elements.IMAGE]: themeMap[theme].ImageWidget,
    [Elements.BUTTONS]: themeMap[theme].ButtonWidget,
    [Elements.EMPTY_SPACE]: themeMap[theme].EmptySpaceWidget,
  }
}

export const getWidgetComponent = (theme: keyof typeof themeMap, component: Elements) => {
  const map = getWidgetComponentMap(theme);
  return map[component];
}