import { transformWidthAndHeight } from "./widthAndHeight/index.js";
import { transformPositionLayout } from "./positionLayout/index.js";
import { transformMarginpaddingLayout } from "./marginpaddingLayout/index.js";
import { vitePlugin } from "./vitePlugin.js";
import { getPassInOptions } from "./common.js";

const MIDPARAMS = {};

export default function transformVueFile(source) {
  if (!source.includes("simplehtmllayout")) return source;
  getPassInOptions(MIDPARAMS, this?.query);
  return templateTransform(source);
}

export function vitePluginSimplehtmllayout(options) {
  return vitePlugin(options);
}

function templateTransform(source) {
  let res = transformWidthAndHeight(source, MIDPARAMS);
  res = transformPositionLayout(res, MIDPARAMS);
  res = transformMarginpaddingLayout(res, MIDPARAMS);
  return res;
}
