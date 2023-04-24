import { transformWidthAndHeight } from "./widthAndHeight/index";
import { transformPositionLayout } from "./positionLayout/index";
import { transformMarginpaddingLayout } from "./marginpaddingLayout/index";
import { getPassInOptions } from "./common";

const MIDPARAMS = {};

export default function transformVueFile(source) {
  if (!source.includes("simplehtmllayout")) return source;
  getPassInOptions(MIDPARAMS, this?.query);
  return templateTransform(source);
}

export function vitePluginSimplehtmllayoutPre(options) {
  return createPreVitePlugin(options);
}

export function vitePluginSimplehtmllayoutPost() {
  return createPostVitePlugin();
}

function templateTransform(source) {
  let res = transformWidthAndHeight(source, MIDPARAMS);
  res = transformPositionLayout(res, MIDPARAMS);
  res = transformMarginpaddingLayout(res, MIDPARAMS);
  return res;
}

function viteTemplateTransform(source, midParams = {}) {
  let res = transformWidthAndHeight(source, midParams);
  res = transformPositionLayout(res, midParams);
  res = transformMarginpaddingLayout(res, midParams);
  return res;
}

function createPostVitePlugin() {
  return {
    name: "simplehtmllayoutPost",
    enforce: "post",
    transform(source, id) {
      if (/.vue$/.test(id)) {
        console.log(source);
        return {
          code: source,
          map: null, // 如果可行将提供 source map
        };
      }
    },
  };
}

function createPreVitePlugin(options) {
  const needReloadFile = new Set();
  getPassInOptions(MIDPARAMS, options);
  return {
    name: "simplehtmllayoutPre",
    enforce: "pre",
    transform(source, id) {
      if (/.vue$/.test(id)) {
        if (source.includes("simplehtmllayout")) {
          needReloadFile.add(id);
        } else {
          needReloadFile.delete(id);
        }
        return {
          code: viteTemplateTransform(source),
          map: null, // 如果可行将提供 source map
        };
      }
    },
    // async handleHotUpdate(ctx) {
    //   //todo
    //   //transform后文件内容正确
    //   //热更新中的css模块未更新
    //   const { server, file } = ctx;
    //   //使用full-reload也会出现未更新的情况
    //   // server.ws.send({ type: "full-reload", path: "*" });
    //   // 未找到原因，目前只能通过重启服务解决
    //   if (needReloadFile.has(file)) {
    //     try {
    //       await server.restart();
    //     } catch (e) {}
    //   }
    // },
  };
}
