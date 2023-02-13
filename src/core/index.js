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
  const simplehtmllayoutPluginSet = new Set();
  return {
    name: "simplehtmllayout",
    enforce: "pre",
    transform(code, id) {
      if (/.vue$/.test(id) && code.includes("simplehtmllayout")) {
        code = transformVueFile(code);
        simplehtmllayoutPluginSet.add(id);
        console.log(`id=${id}`);
      }
      return { code };
    },
    handleHotUpdate(ctx) {
      const { file, server, modules } = ctx;
      console.log(`file=${JSON.stringify(file)}`);
      const arr = [...modules];
      if (simplehtmllayoutPluginSet.has(file)) {
        console.log(`-full-reload-`);
        const relationModule = [
          ...server.moduleGraph.getModulesByFile(file),
        ][0];
        arr.push(relationModule);
        server.ws.send({
          type: "update",
          updates: [
            {
              type: "js-update",
              path: relationModule.file,
              acceptedPath: relationModule.file,
              timestamp: new Date().getTime(),
            },
          ],
        });
      }
      return arr;
    },
  };
}
