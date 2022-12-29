import {
  styleAreaReg,
  templateAreaReg,
  transformHalfPointClass,
  transformHalfPointBack,
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
    mid.marginpaddingLayout.add(r);
    return r;
  });
  return res;
}

function getPositionClassValues(res) {
  const arr = res.split("-");
  let styles;
  switch (arr.length) {
    case 2:
      styles = `${arr[0]}:${transformHalfPointBack(arr[1])}px;`;
      break;
    case 3:
      styles = `${arr[0]}:${transformHalfPointBack(
        arr[1],
      )}px ${transformHalfPointBack(arr[2])}px;`;
      break;
    case 4:
      styles = `${arr[0]}:${transformHalfPointBack(
        arr[1],
      )}px ${transformHalfPointBack(arr[2])}px ${transformHalfPointBack(
        arr[3],
      )}px;`;
      break;
    case 5:
      styles = `${arr[0]}:${transformHalfPointBack(
        arr[1],
      )}px ${transformHalfPointBack(arr[2])}px ${transformHalfPointBack(
        arr[3],
      )}px ${transformHalfPointBack(arr[4])}px;`;
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
  const regStr = `(?<=["'\\s])${position}(-(\\d+|(\\d+\.\\d+))){1,4}(?=["'\\s])`;
  return new RegExp(regStr, "g");
}
