export const styleAreaReg = /(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g;
export const templateAreaReg = /(?<=<template[\s\S]*>)[\s\S]*(?=<\/template>)/g;

export let cssUnit = null;

export function transformHalfPointClass(str) {
  return str.replace(/\./g, "po");
}

export function transformHalfPointBack(str) {
  return str.replace(/po/g, ".");
}

export function transformNegativeClass(str) {
  return str.replace(/--/g, "-ne");
}

export function transformNegativeBack(str) {
  return str.replace(/ne/g, "-");
}

export function getPassInOptions(mid, query) {
  cssUnit = query?.cssUnit ?? "px";
  mid["cssUnit"] = query?.cssUnit ?? "px";
}
