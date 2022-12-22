import { transformWidthAndHeight } from "./widthAndHeight/index";

export default function transformVueFile(source) {
  const midParams = {};
  if (!source.includes("simplehtmllayout")) return source;
  let res = transformWidthAndHeight(source, midParams);
  return res;
}
