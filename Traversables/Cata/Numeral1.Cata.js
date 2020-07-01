"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    class Numeral {
    }
    class Succ extends Numeral {
        constructor(rest) {
            super();
            this.Rest = rest;
        }
        MatchWith(pattern) {
            return pattern.Succ(this.Rest);
        }
    }
    class Zero extends Numeral {
        MatchWith(pattern) {
            return pattern.Zero();
        }
    }
    Numeral.prototype.Cata = function (algebra) {
        return this.MatchWith({
            Zero: () => algebra.Zero(),
            Succ: (rest) => algebra.Succ(rest.Cata(algebra))
        });
    };
    Numeral.prototype.Show = function () {
        return this.MatchWith({
            Zero: () => "0",
            Succ: (r) => `(${r.Show()})`
        });
    };
    Numeral.prototype.Show2 = function () {
        return this.Cata({
            Zero: () => "0",
            Succ: (r) => `(${r})`
        });
    };
}
exports.demo = demo;
//# sourceMappingURL=Numeral1.Cata.js.map