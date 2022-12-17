const { txt } = require("./testtxt");

const styleAreaReg = /(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g;
const templateAreaReg = /(?<=<template>)[\s\S]*(?=<\/template>)/g;
const widthIntStyleReg = /(?<=["'\s])w-\d+(?=["'\s])/g;
const widthFloatStyleReg = /(?<=["'\s])w-\d+\.\d+(?=["'\s])/g;
const heightIntStyleReg = /(?<=["'\s])h-\d+(?=["'\s])/g;
const heightFloatStyleReg = /(?<=["'\s])h-\d+\.\d+(?=["'\s])/g;

function getTemplateArea(str) {
  const res = str.match(templateAreaReg);
  return res;
}

function getStyleArea(str) {
  const res = str.match(styleAreaReg);
  return res;
}

function transformTemplate(str) {
  return str;
}

function transformStyle(str) {
  return str;
}

function transformVueFile(source) {
  let res = transformTemplate(source);
  res = transformStyle(res);
  return res;
}

console.log(transformVueFile(txt));
