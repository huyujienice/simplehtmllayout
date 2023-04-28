import { vitePlugin } from "./vitePlugin";
import { transformSFC, initCssUnit } from "./common";
import type { PluginOptions } from "./types";

export default function transformVueFile(source: string): string {
  if (!source.includes("simplehtmllayout")) return source;
  initCssUnit(this?.query);
  return transformSFC(source);
}

export function vitePluginSimplehtmllayout(options:PluginOptions) {
  return vitePlugin(options);
}
