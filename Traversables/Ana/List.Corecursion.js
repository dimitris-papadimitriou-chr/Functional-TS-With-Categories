"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Maybe_1 = require("../../Functors/Maybe");
function demo() {
    class Product {
        constructor(value, rest) {
            this.Rest = rest;
            this.Value = value;
        }
        Show() {
            return `{value${this.Value}, rest :${this.Rest.MatchWith({ none: () => "", some: (v) => v.Show() })}}`;
        }
    }
    class ProductF {
        constructor(value, rest) {
            this.Rest = rest;
            this.Value = value;
        }
    }
    var anaToListBase = (n) => n == 0 ?
        new Maybe_1.None() :
        new Maybe_1.Some(new Product(n, anaToListBase(n - 1)));
    var coAlgListBase = (n) => n == 0 ?
        new Maybe_1.None() :
        new Maybe_1.Some(new ProductF(n - 1, n - 1));
    var ana = (coalgebra) => (oldState) => coalgebra(oldState).MatchWith({
        none: () => new Maybe_1.None(),
        some: (product) => new Maybe_1.Some(new Product(product.Rest, ana(coalgebra)(product.Value)))
    });
    //var coana: (n: number) => (r: Maybe<Product<number>>) => Maybe<Product<number>>
    //    = n => r => coana(n + 1)(new Some(new Product(n, r)))
    var coana = (n, r) => coana(n + 1, new Maybe_1.Some(new Product(n, r)));
    var stream = coana(0, new Maybe_1.None());
}
exports.demo = demo;
//# sourceMappingURL=List.Corecursion.js.map