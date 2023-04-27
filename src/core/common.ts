import { transformWidthAndHeight } from "./widthAndHeight/index";
import { transformPositionLayout } from "./positionLayout/index";
import { transformMarginpaddingLayout } from "./marginpaddingLayout/index";
import type { MidParams, PluginOptions } from "./types";

export const styleAreaReg = /(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g;
export const templateAreaReg = /(?<=<template[\s\S]*>)[\s\S]*(?=<\/template>)/g;

export let cssUnit: string = "px";

export function transformHalfPointClass(str: string = ""): string {
  return str.replace(/\./g, "_po_");
}

export function transformHalfPointBack(str: string = ""): string {
  return str.replace(/_po_/g, ".");
}

export function transformNegativeClass(str: string = ""): string {
  return str.replace(/--/g, "-_ne_");
}

export function transformNegativeBack(str: string = ""): string {
  return str.replace(/_ne_/g, "-");
}

export function initCssUnit(options: PluginOptions): void {
  cssUnit = options?.cssUnit ?? "px";
}

export function transformSFC(
  source: string,
  midParams: MidParams = {},
): string {
  let res = transformWidthAndHeight(source, midParams);
  res = transformPositionLayout(res, midParams);
  res = transformMarginpaddingLayout(res, midParams);
  return res;
}
