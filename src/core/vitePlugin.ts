import { transformSFC,initCssUnit } from "./common";

const NEEDRELOADFILE = new Set();
const VUEFILEREG = /.vue$/;

export const vitePlugin = options => {
  initCssUnit(options);
  return [pluginPre()];
};
const pluginPre = () => {
  return {
    name: "vitePluginSimplehtmllayout",
    enforce: "pre",
    transform(source, id) {
      if (VUEFILEREG.test(id)) {
        let str = source;
        if (source.includes("simplehtmllayout")) {
          str = transformSFC(str);
          NEEDRELOADFILE.add(id);
          return {
            code: str,
            map: null, // 如果可行将提供 source map
          };
        } else {
          NEEDRELOADFILE.delete(id);
        }
      }
    },
    async handleHotUpdate(ctx) {
      const { file, server, modules, read } = ctx;
      //! hmr core
      if (NEEDRELOADFILE.has(file)) {
        ctx.read = async () => {
          const code = await read();
          return (await transformSFC(code)) || code;
        };
      }
    },
  };
};