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

export function vitePluginSimplehtmllayout() {
  return {
    name: "simplehtmllayout",
    enforce: "pre",
    transform(code, id) {
      if (/.vue$/.test(id) && code.includes("simplehtmllayout")) {
        code = transformVueFile(code);
      }
      return { code };
    },
    handleHotUpdate(ctx) {
      const { file, server, modules } = ctx;
    },
  };
}
