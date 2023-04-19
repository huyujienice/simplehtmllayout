import { transformWidthAndHeight } from "./widthAndHeight/index";
import { transformPositionLayout } from "./positionLayout/index";
import { transformMarginpaddingLayout } from "./marginpaddingLayout/index";
import { getPassInOptions } from "./common";

const MIDPARAMS = {};

export default function transformVueFile(source) {
  if (!source.includes("simplehtmllayout")) return source;
  getPassInOptions(MIDPARAMS, this?.query);
  return templateTransform(source)
}

export function vitePluginSimplehtmllayout(options) {
  return createVitePlugin(options);
}

function templateTransform(source) {
  let res = transformWidthAndHeight(source, MIDPARAMS);
  res = transformPositionLayout(res, MIDPARAMS);
  res = transformMarginpaddingLayout(res, MIDPARAMS);
  return res;
}

function createVitePlugin(options) {
  const needReloadFile = new Set();
  return {
    name: "simplehtmllayout",
    enforce: "pre",
    transform(source, id) {
      if (/.vue$/.test(id)) {
        if (source.includes("simplehtmllayout")) {
          needReloadFile.add(id);
        } else {
          needReloadFile.delete(id);
        }
        getPassInOptions(MIDPARAMS, options);
        return {
          code: templateTransform(source),
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
