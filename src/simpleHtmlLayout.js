const styleAreaReg = /(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g;
const templateAreaReg = /(?<=<template>)[\s\S]*(?=<\/template>)/g;
const widthIntStyleReg = /(?<=["'\s])w-\d+(?=["'\s])/g;
const widthFloatStyleReg = /(?<=["'\s])w-\d+\.\d+(?=["'\s])/g;
const heightIntStyleReg = /(?<=["'\s])h-\d+(?=["'\s])/g;
const heightFloatStyleReg = /(?<=["'\s])h-\d+\.\d+(?=["'\s])/g;

export function transformVueFile(source) {
  const midParams = {};
  let res = transformTemplate(source, midParams);
  res = transformStyle(res, midParams);
  return res;
}

function handleWidthFloatStyle(str, mid) {
  const res = str.replace(widthFloatStyleReg, (match) => {
    if (!mid.hasOwnProperty("widthFloatStyleArr")) mid.widthFloatStyleArr = [];
    mid.widthFloatStyleArr.push(match);
    return transformHalfPointClass(match);
  });
  return res;
}
function handleWidthIntSyle(str, mid) {
  const res = str.replace(widthIntStyleReg, (match) => {
    if (!mid.hasOwnProperty("widthIntStyleArr")) mid.widthIntStyleArr = [];
    mid.widthIntStyleArr.push(match);
    return match;
  });
  return res;
}

function transformHalfPointClass(str) {
  let r = str.replace(/\./, "p");
  return r;
}

function transformTemplate(str, mid) {
  const r = str.replace(templateAreaReg, (m) => {
    let r1 = handleWidthFloatStyle(m, mid);
    r1 = handleWidthIntSyle(r1, mid);
    return r1;
  });
  return r;
}

function transformStyle(str, mid) {
  console.log(mid);
  return str;
}
