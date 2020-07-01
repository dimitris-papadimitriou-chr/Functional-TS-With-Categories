"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Id_1 = require("./Functors/Id");
function demo() {
    // Law 1-identity preserving fmap id = id
    var law1 = new Id_1.Id(5).map(x => x).Value === 5;
    console.log(law1);
    // Law 2-composition of functions is preserved fmap (f . g)== fmap f . fmap g
    var f = x => x * x;
    var g = x => 2 * x;
    var path1 = new Id_1.Id(5).map(x => f(g(x))).Value;
    var path2 = new Id_1.Id(5).map(g).map(f).Value;
    var law2 = path1 === path2;
    console.log(law2);
}
exports.demo = demo;
//# sourceMappingURL=functor.laws.examples.js.map