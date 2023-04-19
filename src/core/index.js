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
  return createVitePlugin();
}

function createVitePlugin() {
  const needReloadFile = new Set();
  return {
    name: "simplehtmllayout",
    enforce: "pre",
    transform(src, id) {
      if (/.vue$/.test(id)) {
        if (src.includes("simplehtmllayout")) {
          needReloadFile.add(id);
        } else {
          needReloadFile.delete(id);
        }
        return {
          code: transformVueFile(src),
          map: null, // 如果可行将提供 source map
        };
      }
    },
    async handleHotUpdate(ctx) {
      //todo
      //transform后文件内容正确
      //热更新中的css模块未更新
      const { server, file } = ctx;
      //使用full-reload也会出现未更新的情况
      // server.ws.send({ type: "full-reload", path: "*" });
      // 未找到原因，目前只能通过重启服务解决
      if (needReloadFile.has(file)) {
        try {
          await server.restart();
        } catch (e) {}
      }
    },
  };
}
