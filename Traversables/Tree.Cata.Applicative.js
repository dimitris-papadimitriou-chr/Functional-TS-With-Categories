"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Id_1 = require("../Functors/Id");
function demo() {
    class Tree {
        Traverse(f) {
            return this.MatchWith({
                leaf: (v) => Id_1.Id.ap(Id_1.Id.of(x => new Leaf(x)), f(v)),
                node: (l, v, r) => {
                    return Id_1.Id.ap(Id_1.Id.ap(Id_1.Id.ap(Id_1.Id.of((left) => (v) => (right) => new Node1(left, v, right)), l.Traverse(f)), f(v)), r.Traverse(f));
                }
            });
        }
        Show() {
            return this.MatchWith({
                leaf: (v) => `(${v})`,
                node: (l, v, r) => `(${l.Show()},${v},${r.Show()})`
            });
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
    const tree = new Node1(new Node1(new Leaf(1), 2, new Leaf(3)), 4, new Node1(new Leaf(5), 6, new Leaf(7)));
    console.log(tree.Show());
    function TraverseAlgebra(f) {
        return ({
            leaf: v => Id_1.Id.ap(Id_1.Id.of(x => new Leaf(x)), f(v)),
            node: (l, v, r) => Id_1.Id.ap(Id_1.Id.ap(Id_1.Id.ap(Id_1.Id.of((left) => (v) => (right) => new Node1(left, v, right)), l), f(v)), r)
        });
    }
    //var traverseTransformation = TraverseAlgebra<number, number>(x => Id.of(x + 1))
    var traversedTree = tree.Cata(TraverseAlgebra(x => Id_1.Id.of(x + 1)));
    console.log(traversedTree.Value.Show());
}
exports.demo = demo;
//# sourceMappingURL=Tree.Cata.Applicative.js.map