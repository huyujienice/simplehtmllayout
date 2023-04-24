export const styleAreaReg = /(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g;
export const templateAreaReg = /(?<=<template[\s\S]*>)[\s\S]*(?=<\/template>)/g;

export let cssUnit = null;

export function transformHalfPointClass(str) {
  return str.replace(/\./g, "_po_");
}

export function transformHalfPointBack(str) {
  return str.replace(/_po_/g, ".");
}

export function transformNegativeClass(str) {
  return str.replace(/--/g, "-_ne_");
}

export function transformNegativeBack(str) {
  return str.replace(/_ne_/g, "-");
}

export function getPassInOptions(mid, query) {
  cssUnit = query?.cssUnit ?? "px";
  mid["cssUnit"] = query?.cssUnit ?? "px";
}

export function initCssUnit(options) {
  cssUnit = options?.cssUnit ?? "px";
}
