export const styleAreaReg = /(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g;
export const templateAreaReg = /(?<=<template[\s\S]*>)[\s\S]*(?=<\/template>)/g;

export function transformHalfPointClass(str) {
  let r = str.replace(/\./, "_");
  return r;
}
