"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
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
    var coana = (n, r) => () => coana(n + 1, new Maybe_1.Some(new LazyProduct(n, () => r)))();
    try {
        var stream = coana(0, new Maybe_1.None())();
        //   var t = stream.Map<{ v: number }>(x => ({ v: x.Value }));
    }
    catch (e) {
        console.log(e);
    }
}
exports.demo = demo;
//# sourceMappingURL=List.Corecursion.Lazy.js.map