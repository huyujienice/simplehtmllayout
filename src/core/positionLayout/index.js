import {
  styleAreaReg,
  templateAreaReg,
  transformHalfPointClass,
  transformHalfPointBack,
  transformNegativeClass,
  transformNegativeBack,
  cssUnit,
} from "../common";

// const relativeTopStyleReg = /(?<=["'\s])(-(\\d+|(\\d+\.\\d+))){0,5}(?=["'\s])/g;

const positionLayoutArr = ["relative", "absolute", "fixed", "sticky"];

export function transformPositionLayout(str, mid = {}) {
  let r = transformPositionLayoutTemplate(str, mid);
  r = transformPositionLayoutStyle(r, mid);
  return r;
}

function transformPositionLayoutTemplate(str, mid) {
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

function transformPositionLayoutStyle(str, mid) {
  const r = str.replace(styleAreaReg, m => {
    let r1 = addPositionClass(m, mid);
    return r1;
  });
  return r;
}

function handleMatchRegTemplate(str, reg, mid) {
  const res = str.replace(reg, match => {
    if (!mid.hasOwnProperty("positionLayoutSet"))
      mid.positionLayoutSet = new Set();
    let r = transformHalfPointClass(match);
    r = transformNegativeClass(r);
    mid.positionLayoutSet.add(r);
    return r;
  });
  return res;
}

function getPositionClassValues(res) {
  const arr = res.split("-");
  let styles;
  if (arr.length > 0) styles = `\nposition:${arr[0]};\n`;
  if (arr.length > 1 && arr[1] != 0)
    styles = getTransformedStr(styles, "top", arr[1]);
  if (arr.length > 2 && arr[2] != 0)
    styles = getTransformedStr(styles, "right", arr[2]);
  if (arr.length > 3 && arr[3] != 0)
    styles = getTransformedStr(styles, "bottom", arr[3]);
  if (arr.length > 4 && arr[4] != 0)
    styles = getTransformedStr(styles, "left", arr[4]);
  if (arr.length > 5 && arr[5] != 0)
    styles = getTransformedStr(styles, "z-index", arr[5]);
  const r = `.${res} {${styles}}`;
  return r;
}

function getTransformedStr(str, left, right) {
  let r = transformHalfPointBack(right);
  r = transformNegativeBack(r);
  return `${str}${left}:${r}${cssUnit};;\n`;
}

function addPositionClass(str, mid) {
  let r = str;
  const arr = ["positionLayoutSet"];
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
function getPositionLayoutReg(position = "relative") {
  const regStr = `(?<=["'\\s])${position}((-||--)(\\d+|(\\d+\.\\d+))){0,5}(?=["'\\s])`;
  return new RegExp(regStr, "g");
}
