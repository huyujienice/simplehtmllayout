import { vitePlugin } from "./vitePlugin.js";
import { transformSFC,getPassInOptions } from "./common.js";

export default function transformVueFile(source) {
  if (!source.includes("simplehtmllayout")) return source;
  const midParams = {};
  getPassInOptions(midParams, this?.query);  
  return transformSFC(source);
}

export function vitePluginSimplehtmllayout(options) {
  return vitePlugin(options);
}

