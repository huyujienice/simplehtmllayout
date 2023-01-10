import { transformWidthAndHeight } from "./widthAndHeight/index";
import { transformPositionLayout } from "./positionLayout/index";
import { transformMarginpaddingLayout } from "./marginpaddingLayout/index";
import { getPassInOptions } from "./common";

export default function transformVueFile(source) {
  if (!source.includes("simplehtmllayout")) return source;
  const midParams = {};
  getPassInOptions(midParams, this?.query);
  let res = transformWidthAndHeight(source, midParams);
  res = transformPositionLayout(res, midParams);
  res = transformMarginpaddingLayout(res, midParams);
  return res;
}
