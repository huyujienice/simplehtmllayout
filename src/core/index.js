import { transformWidthAndHeight } from "./widthAndHeight/index";
import { transformPositionLayout } from "./positionLayout/index";

export default function transformVueFile(source) {
  const midParams = {};
  if (!source.includes("simplehtmllayout")) return source;
  let res = transformWidthAndHeight(source, midParams);
  res = transformPositionLayout(res, midParams);
  return res;
}
