import { Elements } from '~/types/page-data';
import { elements as dawn } from "./dawn";

// We can create multiple themes, each containing elements and widgets in therir own styles

const themeMap = {
  DAWN: dawn
}

// For now there's just one theme called DAWN. 'getElementMap' maps the elements available in the theme with element names.
export const getElementMap = (theme: keyof typeof themeMap) => {
  return {
    [Elements.TEXT]: themeMap[theme].TextWidget,
    [Elements.IMAGE]: themeMap[theme].ImageWidget,
    [Elements.BUTTONS]: themeMap[theme].ButtonWidget,
    [Elements.EMPTY_SPACE]: themeMap[theme].EmptySpaceWidget,
  }
}

// function to get element by name. Used in ColumnComponent to render elements inside.
export const getElement = (theme: keyof typeof themeMap, component: Elements) => {
  const map = getElementMap(theme);
  return map[component];
}