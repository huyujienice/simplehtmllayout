import {
  styleAreaReg,
  templateAreaReg,
  transformHalfPointClass,
} from "../common";

// const relativeTopStyleReg = /(?<=["'\s])relative-t-(\d+|(\d+\.\d+))(?=["'\s])/g;

const positionLayoutArr = ["relative", "absolute", "fixed", "sticky"];
const positionDirectionArr = ["top", "right", "bottom", "left"];

export function transformPositionLayout(str, mid = {}) {
  let r = transformPositionLayoutTemplate(str, mid);
  r = transformPositionLayoutStyle(r, mid);
  return r;
}

function transformPositionLayoutTemplate(str, mid) {
  const r = str.replace(templateAreaReg, m => {
    let r1 = m;
    positionLayoutArr.forEach(p => {
      positionDirectionArr.forEach(d => {
        const reg = getPositionLayoutReg(p, d);
        r1 = handleMatchRegTemplate(r1, reg, mid);
      });
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
    mid.positionLayoutSet.add(r);
    return r;
  });
  return res;
}

function getPositionClassValues(res) {
  const obj = res.split("-");
  let zero = obj[0],
    one = obj[1],
    two = obj[2];
  one = exchangeDirectionWords(one);
  two = two.replace(/_/, ".");
  two = parseFloat(two);
  let r = `.${res} {\npostion:${zero};\n${one}:${two}px;\nz-index:1;\n}`;
  return r;
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

function exchangeDirectionWords(str) {
  let r = null;
  switch (str) {
    case "t":
      r = "top";
      break;
    case "top":
      r = "t";
      break;
    case "r":
      r = "right";
      break;
    case "right":
      r = "r";
      break;
    case "b":
      r = "bottom";
      break;
    case "bottom":
      r = "b";
      break;
    case "l":
      r = "left";
      break;
    case "left":
      r = "l";
      break;
    default:
      break;
  }
  return r;
}

function getPositionLayoutReg(position = "relative", direction = "top") {
  let one = position,
    two = exchangeDirectionWords(direction);
  const regStr = `(?<=["'\\s])${one}-${two}-(\\d+|(\\d+\.\\d+))(?=["'\\s])`;
  return new RegExp(regStr, "g");
}
