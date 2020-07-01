"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaf = exports.Node1 = exports.Tree = void 0;
class Tree {
    Show() {
        return this.MatchWith({
            leaf: (v) => `(${v})`,
            node: (l, v, r) => `(${l.Show()},${v},${r.Show()})`
        });
    }
}
exports.Tree = Tree;
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
exports.Node1 = Node1;
class Leaf extends Tree {
    constructor(value) {
        super();
        this.Value = value;
    }
    MatchWith(pattern) {
        return pattern.leaf(this.Value);
    }
}
exports.Leaf = Leaf;
Tree.prototype.Cata = function (algebra) {
    return this.MatchWith({
        leaf: (v) => algebra.leaf(v),
        node: (l, v, r) => algebra.node(l.Cata(algebra), v, r.Cata(algebra))
    });
};
//# sourceMappingURL=Tree.js.map