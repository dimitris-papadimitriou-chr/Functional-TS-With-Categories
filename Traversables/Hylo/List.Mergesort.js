"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const TreeBinary_1 = require("../../DataStructures/TreeBinary");
//Array.prototype.MatchWith = function <T1>(pattern: ListPattern<any, T1>) {
//    if (this.length == 0) {
//        return pattern.empty();
//    }
//    else {
//        return pattern.cons(this[0], this.slice(1));
//    }
//}
function demo() {
    function ToTree(array) {
        return array.length == 1 ?
            new TreeBinary_1.Leaf(array[0]) :
            new TreeBinary_1.Node1(ToTree(array.slice(0, array.length / 2)), ToTree(array.slice(array.length / 2, array.length)));
    }
    function ZipOrdered(a1, a2) {
        return a1.MatchWith({
            empty: () => a2,
            cons: (x, xs) => a2.MatchWith({
                empty: () => xs,
                cons: (y, ys) => x > y ?
                    [x, ...(ZipOrdered(xs, [y, ...ys]))] :
                    [y, ...(ZipOrdered(ys, [x, ...xs]))]
            }),
        });
    }
    function Sort(tree) {
        return tree.MatchWith({
            leaf: (v) => [v],
            node: (l, r) => ZipOrdered(Sort(l), Sort(r))
        });
    }
    var array = [1, 2, 3, 4, 5, 6, 7, 8];
    var t = ToTree(array);
    console.log(t.Show()); //((((1) ,(2)) ,((3) ,(4))) ,(((5) ,(6)) ,((7) ,(8))))
    try {
        // console.log(ZipOrdered([8, 7, 3, 1], [20, 10, 5, 2]));
        console.log(Sort(ToTree([8, 2, 6, 7, 15, 20, 3, 1])));
    }
    catch (e) {
        console.log(e);
    }
}
exports.demo = demo;
//# sourceMappingURL=List.Mergesort.js.map