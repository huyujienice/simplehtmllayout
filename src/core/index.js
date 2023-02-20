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
    transform(src, id) {
      let _src = src;
      if (/.vue$/.test(id)) {
        _src = transformVueFile(src);
      }
      return { code: _src };
    },
    async handleHotUpdate(ctx) {
      //todo
      //热更新中的css模块未处理transfrom过后的源文件
      //使用full-reload即可
      const { modules, server } = ctx;
      const arr = [...modules];
      console.log(modules);
      server.ws.send({ type: "full-reload" });
      return arr;
    },
  };
}
