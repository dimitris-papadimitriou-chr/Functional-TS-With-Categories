"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const monoid_1 = require("../../Ch01/monoid");
function demo() {
    class Tree {
        fold(monoid) {
            return this.MatchWith({
                leaf: (v) => monoid.concat(v, monoid.empty()),
                node: (l, v, r) => monoid.concat(monoid.concat(l.fold(monoid), v), r.fold(monoid))
            });
        }
        Show() {
            return this.MatchWith({
                leaf: (v) => `(${v})`,
                node: (l, v, r) => `(${l.Show()},${v},${r.Show()})`
            });
        }
        foldMap(empty, f) {
            return this.MatchWith({
                leaf: (v) => f(v),
                node: (l, v, r) => l.foldMap(empty, f).Concat(f(v)).Concat(r.foldMap(empty, f))
            });
        }
        foldMap1(monoid, f) {
            return this.MatchWith({
                leaf: (v) => monoid.concat(f(v), monoid.empty()),
                node: (l, v, r) => monoid.concat(monoid.concat(l.foldMap1(monoid, f), f(v)), r.foldMap1(monoid, f))
            });
        }
        foldMap2(empty, reducer) {
            return this.MatchWith({
                leaf: (v) => reducer(empty(), v),
                node: (l, v, r) => reducer(l.foldMap2(empty, reducer), v)
            });
        }
        All(f) {
            return this.foldMap1(({ empty: () => true, concat: (x, y) => x && y }), f);
        }
    }
    class Node1 extends Tree {
        constructor(left, value, right) {
            super();
            this.Left = left;
            this.Value = value;
            this.Right = right;
        }
        MatchWith(pattern) {
            return pattern.node(this.Left, this.Value, this.Right);
        }
    }
    class Leaf extends Tree {
        constructor(value) {
            super();
            this.Value = value;
        }
        MatchWith(pattern) {
            return pattern.leaf(this.Value);
        }
    }
    Tree.prototype.Cata = function (algebra) {
        return this.MatchWith({
            leaf: (v) => algebra.leaf(v),
            node: (l, v, r) => algebra.node(l.Cata(algebra), v, r.Cata(algebra))
        });
    };
    var algSumInt = ({
        leaf: v => v,
        node: (l, v, r) => l + v + r
    });
    var algProductInt = ({
        leaf: v => v,
        node: (l, v, r) => l * v * r
    });
    var identityInterpretation = () => ({
        leaf: v => new Leaf(v),
        node: (l, v, r) => new Node1(l, v, r)
    });
    var reverseInterpretation = () => ({
        leaf: v => new Leaf(v),
        node: (l, v, r) => new Node1(r, v, l)
    });
    const tree = new Node1(new Node1(new Leaf(1), 2, new Leaf(3)), 4, new Node1(new Leaf(5), 6, new Leaf(7)));
    var sum = tree.Cata(algSumInt);
    var product = tree.Cata(algProductInt);
    var identity = tree.Cata(identityInterpretation());
    var reverse = tree.Cata(reverseInterpretation());
    console.log(reverse.Show());
    var foldMapResult = tree.foldMap(new monoid_1.SumAcc(0), x => new monoid_1.SumAcc(x));
    /////FOLD MAP
    //var foldAlgebra: <T>(m: monoid<T>) => TreePatternAlg<T, T> =
    //    (m ) => ({
    //        leaf: (v) => m.Empty(),
    //        node: (l, v, r) => m.Empty()// m.Concat(l, m.Concat(l, v), r)
    //    });
    //var fold = tree.fold({ empty: () => 0, concat:(x,y)=>n })
}
exports.demo = demo;
//# sourceMappingURL=Tree.Fold.js.map