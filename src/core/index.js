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

function sleepWhile(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, num);
  });
}

export function vitePluginSimplehtmllayout() {
  return {
    name: "simplehtmllayout",
    enforce: "pre",
    transform(src, id) {
      if (/.vue$/.test(id)) {
        console.log(`transform id=${id}`);
        src = transformVueFile(src);
        return {
          code: src,
          map: null, // 如果可行将提供 source map
        };
      }
    },
    async handleHotUpdate(ctx) {
      //todo
      //热更新中的css模块未处理transfrom过后的源文件
      //使用full-reload也会出现未响应的情况
      const { modules, server, file, read } = ctx;
      console.log(`handleHotUpdate file=${file}`);
      await read();
      server.ws.send({ type: "full-reload" });
      return modules;
    },
  };
}
