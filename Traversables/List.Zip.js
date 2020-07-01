"use strict";
/// <reference path="../DataStructures/List.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const List_1 = require("../DataStructures/List");
function demo() {
    console.log(List_1.F.Show(List_1.F.Zip([1, 2, 3], [6, 7, 8, 7, 9, 10, 11]))); //[1,6,2,7,3,8,9,10,11]
    console.log(List_1.F.Show(List_1.F.Zip([6, 7, 8, 7, 9, 10, 11], [1, 2, 3])));
    console.log(List_1.F.Show(List_1.F.Zip([], [1, 2, 3])));
    console.log(List_1.F.Show(List_1.F.ZipMap([1, 2, 3], [6, 7, 8, 7, 9, 10, 11], (a, b) => [a, b])));
}
exports.demo = demo;
//# sourceMappingURL=List.Zip.js.map