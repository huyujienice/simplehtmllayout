import { transformSFC, initCssUnit } from "./common";
import type { PluginOptions } from "./types";

const NEEDRELOADFILE = new Set();
const VUEFILEREG = /.vue$/;

interface HmrContext {
  file: string;
  read: () => string | Promise<string>;
}

export const vitePlugin = (options: PluginOptions) => {
  initCssUnit(options);
  return [pluginPre()];
};
const pluginPre = () => {
  return {
    name: "vitePluginSimplehtmllayout",
    enforce: "pre",
    transform(source: string, id: string) {
      if (VUEFILEREG.test(id)) {
        let str = source;
        if (source.includes("simplehtmllayout")) {
          str = transformSFC(str);
          NEEDRELOADFILE.add(id);
          return {
            code: str,
            map: null,
          };
        } else {
          NEEDRELOADFILE.delete(id);
        }
      }
    },
    async handleHotUpdate(ctx: HmrContext) {
      const { file, read } = ctx;
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
