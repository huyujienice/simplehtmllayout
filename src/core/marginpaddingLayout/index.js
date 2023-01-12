import {
  styleAreaReg,
  templateAreaReg,
  transformHalfPointClass,
  transformHalfPointBack,
  transformNegativeClass,
  transformNegativeBack,
  cssUnit,
} from "../common";

const positionLayoutArr = ["margin", "padding"];

export function transformMarginpaddingLayout(str, mid = {}) {
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
    if (!mid.hasOwnProperty("marginpaddingLayout"))
      mid.marginpaddingLayout = new Set();
    let r = transformHalfPointClass(match);
    r = transformNegativeClass(r);
    mid.marginpaddingLayout.add(r);
    return r;
  });
  return res;
}

function getPositionClassValues(res) {
  const arr = res.split("-");
  let styles, a1, a2, a3, a4;
  switch (arr.length) {
    case 2:
      a1 = transformHalfPointBack(arr[1]);
      a1 = transformNegativeBack(a1);
      styles = `${arr[0]}:${a1}${cssUnit};`;
      break;
    case 3:
      a1 = transformHalfPointBack(arr[1]);
      a1 = transformNegativeBack(a1);
      a2 = transformHalfPointBack(arr[2]);
      a2 = transformNegativeBack(a2);
      styles = `${arr[0]}:${a1}${cssUnit} ${a2}${cssUnit};`;
      break;
    case 4:
      a1 = transformHalfPointBack(arr[1]);
      a1 = transformNegativeBack(a1);
      a2 = transformHalfPointBack(arr[2]);
      a2 = transformNegativeBack(a2);
      a3 = transformHalfPointBack(arr[3]);
      a3 = transformNegativeBack(a3);
      styles = `${arr[0]}:${a1}${cssUnit} ${a2}${cssUnit} ${a3}${cssUnit};`;
      break;
    case 5:
      a1 = transformHalfPointBack(arr[1]);
      a1 = transformNegativeBack(a1);
      a2 = transformHalfPointBack(arr[2]);
      a2 = transformNegativeBack(a2);
      a3 = transformHalfPointBack(arr[3]);
      a3 = transformNegativeBack(a3);
      a4 = transformHalfPointBack(arr[4]);
      a4 = transformNegativeBack(a4);
      styles = `${arr[0]}:${a1}${cssUnit} ${a2}${cssUnit} ${a3}${cssUnit} ${a4}${cssUnit};`;
      break;
    default:
      break;
  }
  const r = `.${res} {\n${styles}\n}`;
  return r;
}

function addPositionClass(str, mid) {
  let r = str;
  const arr = ["marginpaddingLayout"];
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
function getPositionLayoutReg(position = "margin") {
  const regStr = `(?<=["'\\s])${position}((-|--)(\\d+|(\\d+\.\\d+))){1,4}(?=["'\\s])`;
  return new RegExp(regStr, "g");
}
