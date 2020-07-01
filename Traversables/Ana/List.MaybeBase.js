"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Maybe_1 = require("../../Functors/Maybe");
function demo() {
    function Fold(list, monoid) {
        return list.MatchWith(({
            none: () => monoid.empty,
            some: (product) => monoid.concat(product.Value, Fold(product.Rest, monoid))
        }));
    }
    function Multiply(list) {
        return list.MatchWith(({
            none: () => 1,
            some: (product) => product.Value * Multiply(product.Rest)
        }));
    }
    class Product {
        constructor(value, rest) {
            this.Rest = rest;
            this.Value = value;
        }
    }
    var list = new Maybe_1.Some(new Product(5, new Maybe_1.Some(new Product(5, new Maybe_1.None()))));
    var product = Fold(list, { empty: 1, concat: (x, y) => x * y });
    function FoldProd(list, monoid) {
        return list.MatchWith(({
            none: () => monoid.empty,
            some: (product) => monoid.concat(product.Value, FoldProd(product.Rest, monoid))
        }));
    }
    var l = ({
        Value: 1,
        Rest: new Maybe_1.Some(({
            Value: 2,
            Rest: new Maybe_1.Some(({
                Value: 3,
                Rest: new Maybe_1.Some(({
                    Value: 4,
                    Rest: new Maybe_1.None()
                }))
            }))
        }))
    });
    class ProductF {
        constructor(value, rest) {
            this.Value = value;
            this.Rest = rest;
        }
    }
    class SomeF {
        constructor(value) {
            this.Value = value;
        }
    }
    var s = new SomeF(new ProductF(1, 1));
    var s1 = new SomeF(new ProductF(2, s));
    var s2 = new SomeF(new ProductF(3, s1));
    class SomeFixed {
        constructor(value) {
            this.Value = value;
        }
    }
    class SomeFix {
        constructor(value) {
            this.Value = value;
        }
    }
}
exports.demo = demo;
//# sourceMappingURL=List.MaybeBase.js.map