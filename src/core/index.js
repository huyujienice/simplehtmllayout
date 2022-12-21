import { transformWidthAndHeight } from "./widthAndHeight/index";

export function transformVueFile(source) {
  const midParams = {};
  let res = transformWidthAndHeight(source, midParams);
  return res;
}
