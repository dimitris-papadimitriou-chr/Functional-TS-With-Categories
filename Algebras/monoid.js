"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SumAcc = exports.Sum = void 0;
exports.Sum = ({
    Empty: 0,
    Concat: (u, v) => u + v
});
{
    //var total:number = Sum.Concat(Sum.Empty, Sum.Concat(3, 4));
    var total = [1, 3, 4, 5].reduce(exports.Sum.Concat, exports.Sum.Empty);
}
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
var sum = new SumAcc(0).Concat(new SumAcc(1)).Concat(new SumAcc(2)).Concat(new SumAcc(3));
//# sourceMappingURL=monoid.js.map