"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const TreeBinary_1 = require("../../DataStructures/TreeBinary");
//public static List < T > Sort<T>(this Tree < T > @this) where T: IComparable =>
//         @this.MatchWith(algebra: (
//             Leaf: v => v.ToList(),
//             Node: (l, r) => l.Sort().ZipOrdered(r.Sort())
//         ));
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
                cons: (y, ys) => x.compareTo(y) > 0 ?
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
    console.log(t.Show());
    //console.log(ZipOrdered([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8]));
}
exports.demo = demo;
//# sourceMappingURL=List.Mergesort.IComparable.js.map