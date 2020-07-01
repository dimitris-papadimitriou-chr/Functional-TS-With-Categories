"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function demo() {
    class Tree {
        Show() {
            return this.MatchWith({
                leaf: (v) => `(${v})`,
                node: (l, v, r) => `(${l.Show()},${v},${r.Show()})`
            });
        }
        Reverse() {
            return this.MatchWith({
                leaf: (v) => new Leaf(v),
                node: (l, v, r) => new Node1(r.Reverse(), v, l.Reverse())
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
}
exports.demo = demo;
//# sourceMappingURL=Tree.Cata.js.map