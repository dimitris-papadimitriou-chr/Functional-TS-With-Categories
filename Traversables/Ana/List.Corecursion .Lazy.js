"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Maybe_1 = require("../../Functors/Maybe");
function demo() {
    class LazyProduct {
        constructor(value, rest) {
            this.Rest = rest;
            this.Value = value;
        }
    }
    //var coana: (n: number) => (r: Maybe<Product<number>>) => Maybe<Product<number>>
    //    = n => r => coana(n + 1)(new Some(new Product(n, r)))
    var coana = (n, r) => coana(n + 1, new Maybe_1.Some(new LazyProduct(n, () => r)));
    var stream = coana(0, new Maybe_1.None());
}
exports.demo = demo;
//# sourceMappingURL=List.Corecursion .Lazy.js.map