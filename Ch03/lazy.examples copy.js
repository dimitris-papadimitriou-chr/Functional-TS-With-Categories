"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Lazy_1 = require("./Lazy");
function demo() {
    var lazy = new Lazy_1.Lazy(() => 3);
    console.log(lazy.value); //if we use value then the calculation is performed and cached 
    console.log(lazy.value); //we use the cached result or memoized as usualy called in FP 
    var lazy = new Lazy_1.Lazy(() => 3).map(x => x * x);
    console.log(lazy.value);
}
exports.demo = demo;
//# sourceMappingURL=lazy.examples copy.js.map