"use strict";
/// <reference path="../../Ch01/monoid.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const monoid_1 = require("../../Ch01/monoid");
function demo() {
    class F {
        static Show(array) {
            return array.MatchWith({
                empty: () => "Empty",
                cons: (v, r) => `(${v},${this.Show(r)})`
            });
        }
    }
    Array.prototype.MatchWith = function (pattern) {
        if (this.length == 0) {
            return pattern.empty();
        }
        else {
            return pattern.cons(this[0], this.slice(1));
        }
    };
    Array.prototype.Cata = function (pattern) {
        return this.MatchWith({
            empty: () => pattern.empty(),
            cons: (v, r) => pattern.cons(v, r.Cata(pattern))
        });
    };
    function FoldAlgebra(monoid) {
        return ({
            empty: () => monoid.empty,
            cons: (v, r) => monoid.concat(v, r)
        });
    }
    function FoldMapAlgebra(empty, f) {
        return ({
            empty: () => empty,
            cons: (v, r) => f(v).Concat(f(r))
        });
    }
    var array = [1, 2, 3];
    console.log(F.Show(array));
    var format = ({ empty: () => "", cons: (v, r) => `(${v},${r})` });
    console.log(array.Cata(format));
    console.log(array.Cata(FoldAlgebra(monoid_1.Sum)));
    console.log(array.Cata(FoldMapAlgebra(new monoid_1.SumAcc(0), v => new monoid_1.SumAcc(v))).Identity);
}
exports.demo = demo;
//# sourceMappingURL=List.Fold.js.map