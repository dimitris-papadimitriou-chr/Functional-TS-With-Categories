"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function demo() {
    //interface Tree<T> {
    //    Cata<T1>(algebra: TreePattern<T, T1>): T1;
    //}
    class Tree {
        Show() {
            var visitor = ({
                VisitLeaf: l => `(${l.Value})`,
                VisitNode: n => `(${n.Left.Accept(visitor)},${n.Value}, ${n.Right.Accept(visitor)})`
            });
            return this.Accept(visitor);
        }
    }
    class Node1 extends Tree {
        constructor(left, value, right) {
            super();
            this.Left = left;
            this.Value = value;
            this.Right = right;
        }
        Accept(visitor) {
            return visitor.VisitNode(this);
        }
    }
    class Leaf extends Tree {
        constructor(value) {
            super();
            this.Value = value;
        }
        Accept(visitor) {
            return visitor.VisitLeaf(this);
        }
    }
    //Tree.prototype.Cata = function <T, T1>(visitor: Visitor<T>) {
    //    this.Accept(visitor)
    //    visitor.VisitNode()
    //    //leaf: (v) => visitor.leaf(v),
    //    //    node: (l, v, r) => algebra.node(l.Cata(algebra), v, r.Cata(algebra))
    //}
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
    //var sum: number = tree.Cata<number>(algSumInt);
    //var product: number = tree.Cata<number>(algProductInt);
    //var identity: Tree<number> = tree.Cata(identityInterpretation());
    //var reverse: Tree<number> = tree.Cata(reverseInterpretation());
    console.log(tree.Show());
}
exports.demo = demo;
//# sourceMappingURL=Tree.Cata.Visitor.js.map