/*! For license information please see simplehtmllayout.js.LICENSE.txt */
!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.simplehtmllayout=n():t.simplehtmllayout=n()}(this,(()=>(()=>{"use strict";var t={d:(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},n={};t.r(n),t.d(n,{default:()=>P,vitePluginSimplehtmllayout:()=>k});var e=/(?<=<style[\s\S]*>)[\s\S]*(?=<\/style>)/g,r=/(?<=<template[\s\S]*>)[\s\S]*(?=<\/template>)/g,o=null;function a(t){return t.replace(/\./g,"_po_")}function i(t){return t.replace(/_po_/g,".")}function c(t){return t.replace(/--/g,"-_ne_")}function u(t){return t.replace(/_ne_/g,"-")}function l(t,n){var e,r;o=null!==(e=null==n?void 0:n.cssUnit)&&void 0!==e?e:"px",t.cssUnit=null!==(r=null==n?void 0:n.cssUnit)&&void 0!==r?r:"px"}var f=/(?<=["'\s])w-(\d+|(\d+\.\d+))(?=["'\s])/g,s=/(?<=["'\s])h-(\d+|(\d+\.\d+))(?=["'\s])/g;function h(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=p(t,n);return v(e,n)}function p(t,n){var e=t.replace(r,(function(t){var e=function(t,n){return t.replace(f,(function(t){n.hasOwnProperty("widthStyleSet")||(n.widthStyleSet=new Set);var e=a(t);return n.widthStyleSet.add(e),e}))}(t,n);return e=function(t,n){return t.replace(s,(function(t){n.hasOwnProperty("heightStyleSet")||(n.heightStyleSet=new Set);var e=a(t);return n.heightStyleSet.add(e),e}))}(e,n),e}));return e}function v(t,n){return t.replace(e,(function(t){return function(t,n){var e=t;return["widthStyleSet","heightStyleSet"].forEach((function(t){var r;null!==(r=n[t])&&void 0!==r&&r.size&&n[t].forEach((function(t){var n=function(t){var n=t.split("-"),e="width";"h"===n[0]&&(e="height");var r=n[1];return r=i(r),r=parseFloat(r),r="".concat(r).concat(o,";"),".".concat(t," {\n").concat(e,":").concat(r,"\n}")}(t);e="".concat(e,"\n").concat(n,"\n")}))})),e}(t,n)}))}var d=["relative","absolute","fixed","sticky"];function y(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=g(t,n);return m(e,n)}function g(t,n){var e=t.replace(r,(function(t){var e=t;return d.forEach((function(t){var r=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"relative",n="(?<=[\"'\\s])".concat(t,"((-|--)(\\d+|(\\d+.\\d+))){0,5}(?=[\"'\\s])");return new RegExp(n,"g")}(t);e=function(t,n,e){var r=t.replace(n,(function(t){e.hasOwnProperty("positionLayoutSet")||(e.positionLayoutSet=new Set);var n=a(t);return n=c(n),e.positionLayoutSet.add(n),n}));return r}(e,r,n)})),e}));return e}function m(t,n){var r=t.replace(e,(function(t){var e=function(t,n){var e=t;return["positionLayoutSet"].forEach((function(t){var r;null!==(r=n[t])&&void 0!==r&&r.size&&n[t].forEach((function(t){var n=function(t){var n,e=t.split("-");e.length>0&&(n="\nposition:".concat(e[0],";\n"));var r=e[1],o=e[2],a=e[3],c=e[4];if(r&&0!=r&&(n=w(n,"top",r)),o&&0!=o&&(n=w(n,"right",o)),a&&0!=a&&(n=w(n,"bottom",a)),c&&0!=c&&(n=w(n,"left",c)),r&&"0"!=r||a&&"0"!=a||(n=w(n,"top","0")),c&&"0"!=c||o&&"0"!=o||(n=w(n,"left","0")),e.length>5&&0!=e[5]){var l=i(e[5]);l=u(l),n="".concat(n,"z-index:").concat(l,";\n")}return".".concat(t," {").concat(n,"}")}(t);e="".concat(e,"\n").concat(n,"\n")}))})),e}(t,n);return e}));return r}function w(t,n,e){var r=i(e);return r=u(r),"".concat(t).concat(n,":").concat(r).concat(o,";\n")}var b=["margin","padding"];function S(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=x(t,n);return L(e,n)}function x(t,n){var e=t.replace(r,(function(t){var e=t;return b.forEach((function(t){var r=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"margin",n="(?<=[\"'\\s])".concat(t,"((-|--)(\\d+|(\\d+.\\d+))){1,4}(?=[\"'\\s])");return new RegExp(n,"g")}(t);e=function(t,n,e){var r=t.replace(n,(function(t){e.hasOwnProperty("marginpaddingLayout")||(e.marginpaddingLayout=new Set);var n=a(t);return n=c(n),e.marginpaddingLayout.add(n),n}));return r}(e,r,n)})),e}));return e}function L(t,n){var r=t.replace(e,(function(t){var e=function(t,n){var e=t;return["marginpaddingLayout"].forEach((function(t){var r;null!==(r=n[t])&&void 0!==r&&r.size&&n[t].forEach((function(t){var n=function(t){var n,e=function(t){for(var n=[],e=0;e<t.length;e++)if(0===e)n.push(t[e]);else{var r=i(t[e]);r=u(r),n.push(r)}return n}(t.split("-"));switch(e.length){case 2:n="".concat(e[0],":").concat(e[1]).concat(o,";");break;case 3:n="".concat(e[0],":").concat(e[1]).concat(o," ").concat(e[2]).concat(o,";");break;case 4:n="".concat(e[0],":").concat(e[1]).concat(o," ").concat(e[2]).concat(o," ").concat(e[3]).concat(o,";");break;case 5:n="".concat(e[0],":").concat(e[1]).concat(o," ").concat(e[2]).concat(o," ").concat(e[3]).concat(o," ").concat(e[4]).concat(o,";")}return".".concat(t," {\n").concat(n,"\n}")}(t);e="".concat(e,"\n").concat(n,"\n")}))})),e}(t,n);return e}));return r}function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function _(){_=function(){return t};var t={},n=Object.prototype,e=n.hasOwnProperty,r=Object.defineProperty||function(t,n,e){t[n]=e.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,n,e){return Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[n]}try{u({},"")}catch(t){u=function(t,n,e){return t[n]=e}}function l(t,n,e,o){var a=n&&n.prototype instanceof h?n:h,i=Object.create(a.prototype),c=new j(o||[]);return r(i,"_invoke",{value:S(t,e,c)}),i}function f(t,n,e){try{return{type:"normal",arg:t.call(n,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var s={};function h(){}function p(){}function v(){}var d={};u(d,a,(function(){return this}));var y=Object.getPrototypeOf,g=y&&y(y(P([])));g&&g!==n&&e.call(g,a)&&(d=g);var m=v.prototype=h.prototype=Object.create(d);function w(t){["next","throw","return"].forEach((function(n){u(t,n,(function(t){return this._invoke(n,t)}))}))}function b(t,n){function o(r,a,i,c){var u=f(t[r],t,a);if("throw"!==u.type){var l=u.arg,s=l.value;return s&&"object"==E(s)&&e.call(s,"__await")?n.resolve(s.__await).then((function(t){o("next",t,i,c)}),(function(t){o("throw",t,i,c)})):n.resolve(s).then((function(t){l.value=t,i(l)}),(function(t){return o("throw",t,i,c)}))}c(u.arg)}var a;r(this,"_invoke",{value:function(t,e){function r(){return new n((function(n,r){o(t,e,n,r)}))}return a=a?a.then(r,r):r()}})}function S(t,n,e){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return{value:void 0,done:!0}}for(e.method=o,e.arg=a;;){var i=e.delegate;if(i){var c=x(i,e);if(c){if(c===s)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===r)throw r="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);r="executing";var u=f(t,n,e);if("normal"===u.type){if(r=e.done?"completed":"suspendedYield",u.arg===s)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(r="completed",e.method="throw",e.arg=u.arg)}}}function x(t,n){var e=n.method,r=t.iterator[e];if(void 0===r)return n.delegate=null,"throw"===e&&t.iterator.return&&(n.method="return",n.arg=void 0,x(t,n),"throw"===n.method)||"return"!==e&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+e+"' method")),s;var o=f(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,s;var a=o.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=void 0),n.delegate=null,s):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,s)}function L(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function O(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function P(t){if(t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function n(){for(;++r<t.length;)if(e.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=void 0,n.done=!0,n};return o.next=o}}return{next:k}}function k(){return{value:void 0,done:!0}}return p.prototype=v,r(m,"constructor",{value:v,configurable:!0}),r(v,"constructor",{value:p,configurable:!0}),p.displayName=u(v,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===p||"GeneratorFunction"===(n.displayName||n.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,u(t,c,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},w(b.prototype),u(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(n,e,r,o,a){void 0===a&&(a=Promise);var i=new b(l(n,e,r,o),a);return t.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},w(m),u(m,c,"Generator"),u(m,a,(function(){return this})),u(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var n=Object(t),e=[];for(var r in n)e.push(r);return e.reverse(),function t(){for(;e.length;){var r=e.pop();if(r in n)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=P,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var n in this)"t"===n.charAt(0)&&e.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(e,r){return i.type="throw",i.arg=t,n.next=e,r&&(n.method="next",n.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=e.call(a,"catchLoc"),u=e.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,n){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&e.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=n&&n<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=n,a?(this.method="next",this.next=a.finallyLoc,s):this.complete(i)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),s},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),O(e),s}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var o=r.arg;O(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,e){return this.delegate={iterator:P(t),resultName:n,nextLoc:e},"next"===this.method&&(this.arg=void 0),s}},t}function O(t,n,e,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void e(t)}c.done?n(u):Promise.resolve(u).then(r,o)}var j={};function P(t){return t.includes("simplehtmllayout")?(l(j,null==this?void 0:this.query),function(t){var n=h(t,j);return S(n=y(n,j),j)}(t)):t}function k(t){return function(t){var n=new Set;return l(j,t),{name:"simplehtmllayout",enforce:"pre",transform:function(t,e){if(/.vue$/.test(e))return t.includes("simplehtmllayout")?n.add(e):n.delete(e),{code:G(t),map:null}},handleHotUpdate:function(t){return(e=_().mark((function e(){var r,o;return _().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.server,o=t.file,!n.has(o)){e.next=9;break}return e.prev=2,e.next=5,r.restart();case 5:e.next=9;break;case 7:e.prev=7,e.t0=e.catch(2);case 9:case"end":return e.stop()}}),e,null,[[2,7]])})),function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function i(t){O(a,r,o,i,c,"next",t)}function c(t){O(a,r,o,i,c,"throw",t)}i(void 0)}))})();var e}}}(t)}function G(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=h(t,n);return S(e=y(e,n),n)}return n})()));