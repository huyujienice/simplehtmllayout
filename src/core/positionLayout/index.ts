import {
  styleAreaReg,
  templateAreaReg,
  transformHalfPointClass,
  transformHalfPointBack,
  transformNegativeClass,
  transformNegativeBack,
  cssUnit,
} from "../common";

import type { MidParams } from "../types";

// const relativeTopStyleReg = /(?<=["'\s])(-(\\d+|(\\d+\.\\d+))){0,5}(?=["'\s])/g;

const positionLayoutArr = ["relative", "absolute", "fixed", "sticky"];

export function transformPositionLayout(
  str: string,
  mid: MidParams = {},
): string {
  let r = transformPositionLayoutTemplate(str, mid);
  r = transformPositionLayoutStyle(r, mid);
  return r;
}

function transformPositionLayoutTemplate(str: string, mid: MidParams): string {
  const r = str.replace(templateAreaReg, m => {
    let r1 = m;
    positionLayoutArr.forEach(p => {
      const reg = getPositionLayoutReg(p);
      r1 = handleMatchRegTemplate(r1, reg, mid);
    });
    return r1;
  });
  return r;
}

function transformPositionLayoutStyle(str: string, mid: MidParams): string {
  const r = str.replace(styleAreaReg, m => {
    let r1 = addPositionClass(m, mid);
    return r1;
  });
  return r;
}

function handleMatchRegTemplate(
  str: string,
  reg: RegExp,
  mid: MidParams,
): string {
  const res = str.replace(reg, match => {
    if (!mid.hasOwnProperty("positionLayoutSet"))
      mid.positionLayoutSet = new Set();
    let r = transformHalfPointClass(match);
    r = transformNegativeClass(r);
    mid.positionLayoutSet?.add(r);
    return r;
  });
  return res;
}

function getPositionClassValues(res: string): string {
  const arr = res.split("-");
  let styles: string = "";
  if (arr.length > 0) styles = `\nposition:${arr[0]};\n`;
  //keep two effective attribute
  const top = arr[1],
    right = arr[2],
    bottom = arr[3],
    left = arr[4];
  if (top && top !== "0") {
    styles = getTransformedStr(styles, "top", top);
  }
  if (right && right !== "0") {
    styles = getTransformedStr(styles, "right", right);
  }
  if (bottom && bottom !== "0") {
    styles = getTransformedStr(styles, "bottom", bottom);
  }
  if (left && left !== "0") {
    styles = getTransformedStr(styles, "left", left);
  }
  if ((!top || top == "0") && (!bottom || bottom == "0")) {
    styles = getTransformedStr(styles, "top", "0");
  }
  if ((!left || left == "0") && (!right || right == "0")) {
    styles = getTransformedStr(styles, "left", "0");
  }

  if (arr.length > 5 && arr[5] !== "0") {
    let r = transformHalfPointBack(arr[5]);
    r = transformNegativeBack(r);
    styles = `${styles}z-index:${r};\n`;
  }
  const r = `.${res} {${styles}}`;
  return r;
}

function getTransformedStr(
  str: string,
  left: string,
  right: number | string,
): string {
  let r = transformHalfPointBack(String(right));
  r = transformNegativeBack(r);
  return `${str}${left}:${r}${cssUnit};\n`;
}

export function addPositionClass(str: string, mid: MidParams): string {
  let r = str;
  const arr = ["positionLayoutSet"];
  arr.forEach(item => {
    const arrItem: Set<string> | undefined = mid[item];
    if (arrItem?.size) {
      arrItem.forEach(it => {
        const res = getPositionClassValues(it);
        r = `${r}\n${res}\n`;
      });
    }
  });
  return r;
}

/**
 * position
 * position-top
 * position-top-right
 * position-top-right-bottom
 * position-top-right-bottom-left
 * position-top-right-bottom-left-zindex
 *
 * @param {string} [position="relative"]
 * @return {RegExp}
 */
function getPositionLayoutReg(position = "relative"): RegExp {
  const regStr = `(?<=["'\\s])${position}((-|--)(\\d+|(\\d+\.\\d+))){0,5}(?=["'\\s])`;
  return new RegExp(regStr, "g");
}
