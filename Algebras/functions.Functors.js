"use strict";
/// <reference path="monoid.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    function Map(u, f) {
        return x => f(u(x));
    }
    function Compose(u, f) {
        return x => f(u(x));
    }
    var Map1 = (u, f) => x => f(u(x));
}
exports.demo = demo;
//# sourceMappingURL=functions.Functors.js.map