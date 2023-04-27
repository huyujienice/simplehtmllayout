import { vitePlugin } from "./vitePlugin";
import { transformSFC,getPassInOptions } from "./common";

export default function transformVueFile(source) {
  if (!source.includes("simplehtmllayout")) return source;
  const midParams = {};
  getPassInOptions(midParams, this?.query);  
  return transformSFC(source);
}

export function vitePluginSimplehtmllayout(options) {
  return vitePlugin(options);
}

