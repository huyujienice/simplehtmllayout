!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.simplehtmllayout=e():t.simplehtmllayout=e()}(this,(()=>(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>d});var n=/(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g,r=/(?<=<template[\s\S]*>)[\s\S]*(?=<\/template>)/g,o=/(?<=["'\s])w-\d+(?=["'\s])/g,a=/(?<=["'\s])w-\d+\.\d+(?=["'\s])/g,l=/(?<=["'\s])h-\d+(?=["'\s])/g,i=/(?<=["'\s])h-\d+\.\d+(?=["'\s])/g;function c(t){return t.replace(/\./,"_")}function u(t,e){var n=t.replace(r,(function(t){var n=function(t,e){return t.replace(a,(function(t){e.hasOwnProperty("widthFloatStyleSet")||(e.widthFloatStyleSet=new Set);var n=c(t);return e.widthFloatStyleSet.add(n),n}))}(t,e);return n=function(t,e){return t.replace(o,(function(t){return e.hasOwnProperty("widthIntStyleSet")||(e.widthIntStyleSet=new Set),e.widthIntStyleSet.add(t),t}))}(n,e),n=function(t,e){return t.replace(i,(function(t){e.hasOwnProperty("heightFloatStyleSet")||(e.heightFloatStyleSet=new Set);var n=c(t);return e.heightFloatStyleSet.add(n),n}))}(n,e),n=function(t,e){return t.replace(l,(function(t){return e.hasOwnProperty("heightIntStyleSet")||(e.heightIntStyleSet=new Set),e.heightIntStyleSet.add(t),t}))}(n,e),n}));return n}function S(t,e){return t.replace(n,(function(t){return function(t,e){var n=t;return["widthFloatStyleSet","widthIntStyleSet","heightFloatStyleSet","heightIntStyleSet"].forEach((function(t){var r;null!==(r=e[t])&&void 0!==r&&r.size&&e[t].forEach((function(t){var e=function(t){var e=t.split("-"),n="width";"h"===e[0]&&(n="height");var r=e[1];return r=r.replace(/_/,"."),r=parseFloat(r),r="".concat(r,"px;"),".".concat(t," {\n  ").concat(n,":").concat(r,"\n}")}(t);n="".concat(n,"\n").concat(e,"\n")}))})),n}(t,e)}))}function d(t){var e=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=u(t,e);return S(n,e)}(t,{});return e}return e})()));