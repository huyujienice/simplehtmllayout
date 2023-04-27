import { txt1 } from "./testtxt";
import { default as transformVueFile } from "./core/index";
const r = transformVueFile(txt1);
console.log(r);
