"use strict";
/// <reference path="monoid.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const monoid_1 = require("../Ch01/monoid");
function demo() {
    function fold(list, acumulate, concat) {
        list.forEach(item => {
            acumulate = concat(acumulate, item);
        });
        return acumulate;
    }
    function fold1(list, acumulate, concat) {
        for (var i = 0; i < list.length; i++) {
            acumulate = concat(acumulate, list[i]);
        }
        return acumulate;
    }
    var sum = fold([2, 3, 4], monoid_1.Sum.empty, monoid_1.Sum.concat);
    var product = fold([2, 3, 4], 1, (x, y) => x * y);
    var max = fold([2, 3, 4], Number.MIN_SAFE_INTEGER, (x, y) => x > y ? x : y);
}
exports.demo = demo;
//# sourceMappingURL=monoid.examples.js.map