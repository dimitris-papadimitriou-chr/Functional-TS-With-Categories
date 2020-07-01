class Numeral {
}
class Succ extends Numeral {
    constructor(rest) {
        super();
        this.Rest = rest;
    }
}
class Zero extends Numeral {
}
var numeral = new Succ(new Succ(new Succ(new Succ(new Zero()))));
class ListBase {
}
class Cons extends ListBase {
    constructor(value, rest) {
        super();
        this.Rest = rest;
        this.Value = value;
    }
}
class Empty extends ListBase {
}
var list = new Cons(2, new Cons(1, new Empty()));
class Tree {
}
class Node1 extends Tree {
    constructor(left, value, right) {
        super();
        this.Left = left;
        this.Value = value;
        this.Right = right;
    }
}
class Leaf extends Tree {
    constructor(value) {
        super();
        this.Value = value;
    }
}
var tree = new Node1(new Leaf(2), 2, new Node1(new Leaf(2), 4, new Leaf(2)));
//# sourceMappingURL=FirstAlgebraicDataStructures.js.map