"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Either_Applicative_1 = require("../Functors/Either.Applicative");
function demo() {
    class F {
        static Show(array) {
            return array.MatchWith({
                empty: () => "Empty",
                cons: (v, r) => `(${v},${this.Show(r)})`
            });
        }
        static ap(_this, p1) {
            return p1.apply(_this);
        }
        static of(x) {
            return new Either_Applicative_1.Right(x);
        }
        static Traverse(array, f) {
            return array.MatchWith({
                empty: () => new Either_Applicative_1.Right([]),
                cons: (v, r) => F.ap(F.ap(F.of((v) => (u) => [v, ...u]), f(v)), this.Traverse(r, f))
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
    class Client {
        constructor(id, name) {
            this.Id = id;
            this.Name = name;
        }
    }
    //var clientValidation: Array<(v: Client) => boolean> = [x => x.Name != null, x => x.Id > 0];
    //clientValidation.Traverse(x => F.of(x));
    //gitUserDetailsPromise.MatchWith({
    //    ok: x => {
    //        console.log(`result: ${x}`)
    //    },
    //    error: x => {
    //        console.log(`error: ${x}`)
    //    },
    //})
}
exports.demo = demo;
//# sourceMappingURL=List.Traverse.Either.js.map