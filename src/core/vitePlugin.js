import {
  transformWidthAndHeight,
  addWidthAndHeightClass,
} from "./widthAndHeight/index.js";
import {
  transformPositionLayout,
  addPositionClass,
} from "./positionLayout/index.js";
import {
  transformMarginpaddingLayout,
  addMarginAndPaddingClass,
} from "./marginpaddingLayout/index.js";
import { initCssUnit } from "./common.js";

const CSSSTORE = {};

const VUEFILEREG = /.vue$/;
const CSSFILEREG = /\.(css|less|scss|stylus|styl)/;
const VUEREG = /.vue/;

export const vitePlugin = options => {
  initCssUnit(options);
  return [pluginPre(), pluginPost()];
};
const pluginPre = () => {
  return {
    name: "simplehtmllayoutVuePre",
    enforce: "pre",
    transform(source, id) {
      if (VUEFILEREG.test(id)) {
        let str = source;
        if (source.includes("simplehtmllayout")) {
          const obj = {};
          str = viteTemplateTransform(str, obj);
          CSSSTORE[id] = obj;
        } else {
          delete CSSSTORE[id];
        }
        return {
          code: str,
          map: null, // 如果可行将提供 source map
        };
      }
    },
    async handleHotUpdate(ctx) {
      const { file, server, modules, read } = ctx;
      //   if (VUEFILEREG.test(file)) {
      //     server.ws.send({
      //       type: "full-reload",
      //       path: "*",
      //     });
      //   }
    },
  };
};
const pluginPost = () => {
  return {
    name: "simplehtmllayoutCssPre",
    enforce: "pre",
    //todo
    //强加css也无效，感觉哪个地方读了缓存  
    transform(source, id) {
      if (CSSFILEREG.test(id) && VUEREG.test(id)) {
        let str = source,
          obj = null,
          arr = Object.keys(CSSSTORE);
        for (let i = 0; i < arr.length; i++) {
          if (id.includes(arr[i])) {
            obj = CSSSTORE[arr[i]];
            break;
          }
        }
        if (obj) {
          str = getCssTransform(str, obj);
          return {
            code: str,
            map: null, // 如果可行将提供 source map
          };
        }
      }
    },
  };
};
const viteTemplateTransform = (source, midParams = {}) => {
  let res = transformWidthAndHeight(source, midParams);
  res = transformPositionLayout(res, midParams);
  res = transformMarginpaddingLayout(res, midParams);
  return res;
};
const getCssTransform = (str, midParams = {}) => {
  let res = addWidthAndHeightClass(str, midParams);
  res = addPositionClass(res, midParams);
  res = addMarginAndPaddingClass(res, midParams);
  return res;
};
