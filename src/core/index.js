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
      if (/.vue$/.test(id)) {
        code = transformVueFile(code);
      }
      return { code };
    },
    configureServer(server) {
      //todo 中间件处理HMR
      server.middlewares.use((req, res, next) => {
        // 自定义请求处理...
        console.log(`req.method=${req.method}`);
        console.log(`req.url=${req.url}`);
        console.log(`req.body=${req.body}`);
        next();
      });
    },
    handleHotUpdate(ctx) {
      //todo
      //热更新中的css模块未处理transfrom过后的源文件
      const { file, modules } = ctx;
      console.log(`file=${JSON.stringify(file)}`);
      const arr = [...modules];
      console.log(modules);
      return arr;
    },
  };
}
