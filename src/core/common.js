export const styleAreaReg = /(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g;
export const templateAreaReg = /(?<=<template[\s\S]*>)[\s\S]*(?=<\/template>)/g;

export function transformHalfPointClass(str) {
  return str.replace(/\./g, "_");
}

export function transformHalfPointBack(str) {
  return str.replace(/_/g, ".");
}
