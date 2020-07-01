"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const IO_1 = require("./Functors/IO");
function demo() {
    var io = new IO_1.IO(() => 3)
        .map(x => x * x)
        .matchWith(console.log);
}
exports.demo = demo;
//# sourceMappingURL=IO.examples.js.map