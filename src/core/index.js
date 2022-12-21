import { transformWidthAndHeight } from "./widthAndHeightClass/index";

export function transformVueFile(source) {
  const midParams = {};
  let res = transformWidthAndHeight(source, midParams);
  return res;
}
