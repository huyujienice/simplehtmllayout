import { transformWidthAndHeight } from "./widthAndHeight/index";

export default function transformVueFile(source) {
  const midParams = {};
  let res = transformWidthAndHeight(source, midParams);
  return res;
}
