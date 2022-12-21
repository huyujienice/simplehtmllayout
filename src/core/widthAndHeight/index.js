import { styleAreaReg, templateAreaReg } from "../common";

const widthIntStyleReg = /(?<=["'\s])w-\d+(?=["'\s])/g;
const widthFloatStyleReg = /(?<=["'\s])w-\d+\.\d+(?=["'\s])/g;
const heightIntStyleReg = /(?<=["'\s])h-\d+(?=["'\s])/g;
const heightFloatStyleReg = /(?<=["'\s])h-\d+\.\d+(?=["'\s])/g;

export function transformWidthAndHeight(str, mid = {}) {
  let r = transformTemplate(str, mid);
  r = transformStyle(r, mid);
  return r;
}

function handleWidthFloatStyle(str, mid) {
  const res = str.replace(widthFloatStyleReg, match => {
    if (!mid.hasOwnProperty("widthFloatStyleSet"))
      mid.widthFloatStyleSet = new Set();
    let r = transformHalfPointClass(match);
    mid.widthFloatStyleSet.add(r);
    return r;
  });
  // console.log(`handleWidthFloatStyle=${res}`);
  return res;
}

function handleWidthIntSyle(str, mid) {
  const res = str.replace(widthIntStyleReg, match => {
    if (!mid.hasOwnProperty("widthIntStyleSet"))
      mid.widthIntStyleSet = new Set();
    mid.widthIntStyleSet.add(match);
    return match;
  });
  // console.log(`handleWidthIntSyle=${res}`);
  return res;
}

function handleHeightFloatStyle(str, mid) {
  const res = str.replace(heightFloatStyleReg, match => {
    if (!mid.hasOwnProperty("heightFloatStyleSet"))
      mid.heightFloatStyleSet = new Set();
    let r = transformHalfPointClass(match);
    mid.heightFloatStyleSet.add(r);
    return r;
  });
  // console.log(`handleHeightFloatStyle=${res}`);
  return res;
}

function handleHeightIntSyle(str, mid) {
  const res = str.replace(heightIntStyleReg, match => {
    if (!mid.hasOwnProperty("heightIntStyleSet"))
      mid.heightIntStyleSet = new Set();
    mid.heightIntStyleSet.add(match);
    return match;
  });
  // console.log(`handleHeightIntSyle=${res}`);
  return res;
}

function transformHalfPointClass(str) {
  let r = str.replace(/\./, "_");
  return r;
}

function getWidthAndHeightClassValues(res) {
  const obj = res.split("-");
  let keys = `width`;
  if (obj[0] === "h") keys = `height`;
  let values = obj[1];
  values = values.replace(/_/, ".");
  values = parseFloat(values);
  values = `${values}px;`;
  const r = `.${res} {\n  ${keys}:${values}\n}`;
  return r;
}

function addWidthAndHeightClass(str, mid) {
  let r = str;
  const arr = [
    "widthFloatStyleSet",
    "widthIntStyleSet",
    "heightFloatStyleSet",
    "heightIntStyleSet",
  ];
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

function transformTemplate(str, mid) {
  const r = str.replace(templateAreaReg, m => {
    let r1 = handleWidthFloatStyle(m, mid);
    r1 = handleWidthIntSyle(r1, mid);
    r1 = handleHeightFloatStyle(r1, mid);
    r1 = handleHeightIntSyle(r1, mid);
    // console.log(`transformTemplate=${r1}`);
    return r1;
  });
  return r;
}

function transformStyle(str, mid) {
  const r = str.replace(styleAreaReg, m => {
    let r1 = addWidthAndHeightClass(m, mid);
    return r1;
  });
  return r;
}
