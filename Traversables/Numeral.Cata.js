"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            Zero: () => "zero",
            Succ: (r) => `AddOne(${r})`
        });
    };
    var four = new Succ(new Succ(new Succ(new Succ(new Zero()))));
    console.log(four.Cata({
        Zero: () => "zero",
        Succ: (r) => `AddOne(${r})`
    }));
    console.log(four.Cata({
        Zero: () => "0",
        Succ: (r) => `(+(${r}) 1)`
    }));
    console.log(four.Cata({
        Zero: () => 0,
        Succ: (r) => r + 1
    }));
    console.log(four.Cata({
        Zero: () => ({ s: 0, acc: [0] }),
        Succ: (r) => ({ s: r.s + 1, acc: r.acc.concat([r.s + 1]) })
    }));
    console.log(four.Cata({
        Zero: () => new Zero(),
        Succ: (r) => new Succ(r)
    }));
    var algebraInt = ({
        Zero: () => 0,
        Succ: (r) => r + 1
    });
    var algebraString = ({
        Zero: () => "zero",
        Succ: (r) => `AddOne(${r})`
    });
    var justExclamationmarks = ({
        Zero: () => "",
        Succ: (r) => `!(${r})`
    });
}
exports.demo = demo;
//# sourceMappingURL=Numeral.Cata.js.map