"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
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
    var array = [1, 2, 3];
    console.log(F.Show(array));
    var format = ({ empty: () => "", cons: (v, r) => `(${v},${r})` });
    console.log(array.Cata(format));
}
exports.demo = demo;
//# sourceMappingURL=List.Cata.js.map