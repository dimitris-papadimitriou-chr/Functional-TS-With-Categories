"use strict";
//1.2	Monoids
Object.defineProperty(exports, "__esModule", { value: true });
exports.SumAcc = exports.Sum = void 0;
exports.Sum = ({
    empty: 0,
    concat: (u, v) => u + v
});
class SumAcc {
    constructor(value) {
        this.Identity = 0;
        this.Identity = value;
    }
    Concat(v) {
        return new SumAcc(v.Identity + this.Identity);
    }
}
exports.SumAcc = SumAcc;
//# sourceMappingURL=monoid.js.map