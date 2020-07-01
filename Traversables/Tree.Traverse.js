"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Id_1 = require("../Ch03/Functors/Id");
function demo() {
    class Tree {
        Traverse(f) {
            return this.matchWith({
                leaf: (v) => new Id_1.Id(new Leaf(v)),
                node: (l, v, r) => {
                    return Id_1.Id.ap(Id_1.Id.ap(Id_1.Id.ap(Id_1.Id.of((left) => (v) => (right) => new Node1(left, v, right)), l.Traverse(f)), f(v)), r.Traverse(f));
                }
            });
        }
        Show() {
            return this.matchWith({
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
        matchWith(pattern) {
            return pattern.node(this.Left, this.Value, this.Right);
        }
    }
    class Leaf extends Tree {
        constructor(value) {
            super();
            this.Value = value;
        }
        matchWith(pattern) {
            return pattern.leaf(this.Value);
        }
    }
    Tree.prototype.Cata = function (algebra) {
        return this.matchWith({
            leaf: (v) => algebra.leaf(v),
            node: (l, v, r) => algebra.node(l.Cata(algebra), v, r.Cata(algebra))
        });
    };
    const tree = new Node1(new Node1(new Leaf(1), 2, new Leaf(3)), 4, new Node1(new Leaf(5), 6, new Leaf(7)));
    var t = new Id_1.Id((left) => (v) => (right) => new Node1(left, v, right));
    var rt = Id_1.Id.of(1);
    var product = Id_1.Id.ap(Id_1.Id.ap(Id_1.Id.ap(Id_1.Id.of((left) => (v) => (right) => new Node1(left, v, right)), Id_1.Id.of(new Leaf(1))), Id_1.Id.of(1)), Id_1.Id.of(new Leaf(1)));
    function Distribute(tree) {
        return tree.matchWith({
            leaf: (v) => Id_1.Id.ap(Id_1.Id.of(x => new Leaf(x)), v),
            node: (l, v, r) => {
                return Id_1.Id.ap(Id_1.Id.ap(Id_1.Id.ap(Id_1.Id.of((left) => (v) => (right) => new Node1(left, v, right)), Distribute(l)), v), Distribute(r));
            }
        });
    }
    //var a =
    //    new Id<number>(1)
    //        .apply()
    const treeOfIds = new Node1(new Node1(new Leaf(new Id_1.Id(1)), new Id_1.Id(2), new Leaf(new Id_1.Id(3))), new Id_1.Id(4), new Node1(new Leaf(new Id_1.Id(5)), new Id_1.Id(6), new Leaf(new Id_1.Id(7))));
    var distribute = Distribute(treeOfIds);
    console.log(tree.Show());
}
exports.demo = demo;
//# sourceMappingURL=Tree.Traverse.js.map