!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.simplehtmllayout=n():t.simplehtmllayout=n()}(this,(()=>(()=>{"use strict";var t={d:(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},n={};t.r(n),t.d(n,{default:()=>w,vitePluginSimplehtmllayout:()=>O});var e=/(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g,r=/(?<=<template[\s\S]*>)[\s\S]*(?=<\/template>)/g,o=null;function c(t){return t.replace(/\./g,"_po_")}function a(t){return t.replace(/_po_/g,".")}function i(t){return t.replace(/--/g,"-_ne_")}function u(t){return t.replace(/_ne_/g,"-")}var l=/(?<=["'\s])w-(\d+|(\d+\.\d+))(?=["'\s])/g,f=/(?<=["'\s])h-(\d+|(\d+\.\d+))(?=["'\s])/g;function d(t,n){var e=t.replace(r,(function(t){var e=function(t,n){return t.replace(l,(function(t){n.hasOwnProperty("widthStyleSet")||(n.widthStyleSet=new Set);var e=c(t);return n.widthStyleSet.add(e),e}))}(t,n);return e=function(t,n){return t.replace(f,(function(t){n.hasOwnProperty("heightStyleSet")||(n.heightStyleSet=new Set);var e=c(t);return n.heightStyleSet.add(e),e}))}(e,n),e}));return e}function s(t,n){return t.replace(e,(function(t){return function(t,n){var e=t;return["widthStyleSet","heightStyleSet"].forEach((function(t){var r;null!==(r=n[t])&&void 0!==r&&r.size&&n[t].forEach((function(t){var n=function(t){var n=t.split("-"),e="width";"h"===n[0]&&(e="height");var r=n[1];return r=a(r),r=parseFloat(r),r="".concat(r).concat(o,";"),".".concat(t," {\n").concat(e,":").concat(r,"\n}")}(t);e="".concat(e,"\n").concat(n,"\n")}))})),e}(t,n)}))}var v=["relative","absolute","fixed","sticky"];function p(t,n){var e=t.replace(r,(function(t){var e=t;return v.forEach((function(t){var r=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"relative",n="(?<=[\"'\\s])".concat(t,"((-|--)(\\d+|(\\d+.\\d+))){0,5}(?=[\"'\\s])");return new RegExp(n,"g")}(t);e=function(t,n,e){var r=t.replace(n,(function(t){e.hasOwnProperty("positionLayoutSet")||(e.positionLayoutSet=new Set);var n=c(t);return n=i(n),e.positionLayoutSet.add(n),n}));return r}(e,r,n)})),e}));return e}function h(t,n){var r=t.replace(e,(function(t){var e=function(t,n){var e=t;return["positionLayoutSet"].forEach((function(t){var r;null!==(r=n[t])&&void 0!==r&&r.size&&n[t].forEach((function(t){var n=function(t){var n,e=t.split("-");e.length>0&&(n="\nposition:".concat(e[0],";\n"));var r=e[1],o=e[2],c=e[3],i=e[4];if(r&&0!=r&&(n=y(n,"top",r)),o&&0!=o&&(n=y(n,"right",o)),c&&0!=c&&(n=y(n,"bottom",c)),i&&0!=i&&(n=y(n,"left",i)),r&&"0"!=r||c&&"0"!=c||(n=y(n,"top","0")),i&&"0"!=i||o&&"0"!=o||(n=y(n,"left","0")),e.length>5&&0!=e[5]){var l=a(e[5]);l=u(l),n="".concat(n,"z-index:").concat(l,";\n")}return".".concat(t," {").concat(n,"}")}(t);e="".concat(e,"\n").concat(n,"\n")}))})),e}(t,n);return e}));return r}function y(t,n,e){var r=a(e);return r=u(r),"".concat(t).concat(n,":").concat(r).concat(o,";\n")}var g=["margin","padding"];function m(t,n){var e=t.replace(r,(function(t){var e=t;return g.forEach((function(t){var r=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"margin",n="(?<=[\"'\\s])".concat(t,"((-|--)(\\d+|(\\d+.\\d+))){1,4}(?=[\"'\\s])");return new RegExp(n,"g")}(t);e=function(t,n,e){var r=t.replace(n,(function(t){e.hasOwnProperty("marginpaddingLayout")||(e.marginpaddingLayout=new Set);var n=c(t);return n=i(n),e.marginpaddingLayout.add(n),n}));return r}(e,r,n)})),e}));return e}function S(t,n){var r=t.replace(e,(function(t){var e=function(t,n){var e=t;return["marginpaddingLayout"].forEach((function(t){var r;null!==(r=n[t])&&void 0!==r&&r.size&&n[t].forEach((function(t){var n=function(t){var n,e=function(t){for(var n=[],e=0;e<t.length;e++)if(0===e)n.push(t[e]);else{var r=a(t[e]);r=u(r),n.push(r)}return n}(t.split("-"));switch(e.length){case 2:n="".concat(e[0],":").concat(e[1]).concat(o,";");break;case 3:n="".concat(e[0],":").concat(e[1]).concat(o," ").concat(e[2]).concat(o,";");break;case 4:n="".concat(e[0],":").concat(e[1]).concat(o," ").concat(e[2]).concat(o," ").concat(e[3]).concat(o,";");break;case 5:n="".concat(e[0],":").concat(e[1]).concat(o," ").concat(e[2]).concat(o," ").concat(e[3]).concat(o," ").concat(e[4]).concat(o,";")}return".".concat(t," {\n").concat(n,"\n}")}(t);e="".concat(e,"\n").concat(n,"\n")}))})),e}(t,n);return e}));return r}function b(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function w(t){if(!t.includes("simplehtmllayout"))return t;var n,e,r,c,a={};n=a,e=null==this?void 0:this.query,o=null!==(r=null==e?void 0:e.cssUnit)&&void 0!==r?r:"px",n.cssUnit=null!==(c=null==e?void 0:e.cssUnit)&&void 0!==c?c:"px";var i=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=d(t,n);return s(e,n)}(t,a);return i=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=p(t,n);return h(e,n)}(i,a),i=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=m(t,n);return S(e,n)}(i,a),i}function O(){return{name:"simplehtmllayout",enforce:"pre",transform:function(t,n){return/.vue$/.test(n)&&(t=w(t)),{code:t}},configureServer:function(t){t.middlewares.use((function(t,n,e){console.log("req.method=".concat(t.method)),console.log("req.url=".concat(t.url)),console.log("req.body=".concat(t.body)),e()}))},handleHotUpdate:function(t){var n=t.file,e=t.modules;console.log("file=".concat(JSON.stringify(n)));var r=function(t){return function(t){if(Array.isArray(t))return b(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(t){if("string"==typeof t)return b(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?b(t,n):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(e);return console.log(e),r}}}return n})()));