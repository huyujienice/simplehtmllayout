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

const positionLayoutArr = ["margin", "padding"];

export function transformMarginpaddingLayout(
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
    let r1 = addMarginAndPaddingClass(m, mid);
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
    if (!mid.hasOwnProperty("marginpaddingLayout"))
      mid.marginpaddingLayout = new Set();
    let r = transformHalfPointClass(match);
    r = transformNegativeClass(r);
    mid.marginpaddingLayout?.add(r);
    return r;
  });
  return res;
}

function getPositionClassValues(res: string): string {
  const arr = res.split("-");
  const arrs = getTransformedBackArr(arr);
  let styles;
  switch (arrs.length) {
    case 2:
      styles = `${arrs[0]}:${arrs[1]}${cssUnit};`;
      break;
    case 3:
      styles = `${arrs[0]}:${arrs[1]}${cssUnit} ${arrs[2]}${cssUnit};`;
      break;
    case 4:
      styles = `${arrs[0]}:${arrs[1]}${cssUnit} ${arrs[2]}${cssUnit} ${arrs[3]}${cssUnit};`;
      break;
    case 5:
      styles = `${arrs[0]}:${arrs[1]}${cssUnit} ${arrs[2]}${cssUnit} ${arrs[3]}${cssUnit} ${arrs[4]}${cssUnit};`;
      break;
    default:
      break;
  }
  const r = `.${res} {\n${styles}\n}`;
  return r;
}

function getTransformedBackArr(arr: Array<string>): Array<string> {
  const r = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      r.push(arr[i]);
    } else {
      let m = transformHalfPointBack(arr[i]);
      m = transformNegativeBack(m);
      r.push(m);
    }
  }
  return r;
}

export function addMarginAndPaddingClass(str: string, mid: MidParams): string {
  let r = str;
  const arr: Array<string> = ["marginpaddingLayout"];
  arr.forEach(item => {
    if (mid[item]?.size) {
      mid[item].forEach(it => {
        const res = getPositionClassValues(it);
        r = `${r}\n${res}\n`;
      });
    }
  });
  return r;
}

/**
 * margin-all
 * margin-top&bottom-right&left
 * margin-top-right&left-bottom
 * margin-top-right-bottom-left
 *
 * @param {string} [position="margin"]
 * @return {RegExp}
 */
function getPositionLayoutReg(position = "margin"): RegExp {
  const regStr = `(?<=["'\\s])${position}((-|--)(\\d+|(\\d+\.\\d+))){1,4}(?=["'\\s])`;
  return new RegExp(regStr, "g");
}
