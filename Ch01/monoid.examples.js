"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const monoid_1 = require("./monoid");
function demo() {
    var total1 = monoid_1.Sum.concat(monoid_1.Sum.empty, monoid_1.Sum.concat(3, 4));
    //reduce example
    var total = [1, 3, 4, 5].reduce(monoid_1.Sum.concat, monoid_1.Sum.empty);
    var sum = new monoid_1.SumAcc(0)
        .Concat(new monoid_1.SumAcc(1))
        .Concat(new monoid_1.SumAcc(2))
        .Concat(new monoid_1.SumAcc(3));
}
exports.demo = demo;
//# sourceMappingURL=monoid.examples.js.map