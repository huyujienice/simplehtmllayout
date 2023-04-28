import {
  styleAreaReg,
  templateAreaReg,
  transformHalfPointClass,
  transformHalfPointBack,
  cssUnit,
} from "../common";
import type { MidParams } from "../types";

const widthStyleReg = /(?<=["'\s])w-(\d+|(\d+\.\d+))(?=["'\s])/g;
const heightStyleReg = /(?<=["'\s])h-(\d+|(\d+\.\d+))(?=["'\s])/g;

export function transformWidthAndHeight(
  str: string,
  mid: MidParams = {},
): string {
  let r = transformTemplate(str, mid);
  r = transformStyle(r, mid);
  return r;
}

function hanlleWidthStyle(str: string, mid: MidParams): string {
  const res = str.replace(widthStyleReg, match => {
    if (!mid.hasOwnProperty("widthStyleSet")) mid.widthStyleSet = new Set();
    let r = transformHalfPointClass(match);
    mid.widthStyleSet?.add(r);
    return r;
  });
  // console.log(`hanlleWidthStyle=${res}`);
  return res;
}

function hanlleHeightStyle(str: string, mid: MidParams): string {
  const res = str.replace(heightStyleReg, match => {
    if (!mid.hasOwnProperty("heightStyleSet")) mid.heightStyleSet = new Set();
    let r = transformHalfPointClass(match);
    mid.heightStyleSet?.add(r);
    return r;
  });
  // console.log(`hanlleHeightStyle=${res}`);
  return res;
}

function getWidthAndHeightClassValues(res: string): string {
  const obj: Array<string> = res.split("-");
  let keys = `width`;
  if (obj[0] === "h") keys = `height`;
  let values: string = obj[1];
  values = transformHalfPointBack(values);
  values = String(parseFloat(values));
  values = `${values}${cssUnit};`;
  const r = `.${res} {\n${keys}:${values}\n}`;
  return r;
}

export function addWidthAndHeightClass(str: string, mid: MidParams): string {
  let r = str;
  const arr = ["widthStyleSet", "heightStyleSet"];
  arr.forEach(item => {
    if (mid[item]?.size) {
      mid[item].forEach(it => {
        const res = getWidthAndHeightClassValues(it);
        r = `${r}\n${res}\n`;
      });
    }
  });
  return r;
}

function transformTemplate(str: string, mid: MidParams): string {
  const r = str.replace(templateAreaReg, m => {
    let r1 = hanlleWidthStyle(m, mid);
    r1 = hanlleHeightStyle(r1, mid);
    return r1;
  });
  return r;
}

function transformStyle(str: string, mid: MidParams): string {
  const r = str.replace(styleAreaReg, m => {
    let r1 = addWidthAndHeightClass(m, mid);
    return r1;
  });
  return r;
}
