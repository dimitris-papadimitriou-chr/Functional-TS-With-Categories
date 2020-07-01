abstract class Numeral { }

class Succ extends Numeral {
    Rest: Numeral
    constructor(rest: Numeral) {
        super();
        this.Rest = rest;
    }
}

class Zero extends Numeral { }

var numeral = new Succ(new Succ(new Succ(new Succ(new Zero()))))

abstract class ListBase<T>    { }

class Cons<T> extends ListBase<T> {
    Rest: ListBase<T>
    Value: T
    constructor(value: T, rest: ListBase<T>) {
        super();
        this.Rest = rest;
        this.Value = value;
    }
}

class Empty<T> extends ListBase<T> { }
var list = new Cons(2, new Cons(1, new Empty()))

abstract class Tree<T>{ }
class Node1<T> extends Tree<T> {
    Left: Tree<T>;
    Value: T;
    Right: Tree<T>;
    constructor(left: Tree<T>, value: T, right: Tree<T>) {
        super();
        this.Left = left;
        this.Value = value;
        this.Right = right;
    }
}

class Leaf<T> extends Tree<T> {
    Value: T;
    constructor(value: T) {
        super();
        this.Value = value;
    }
}

var tree: Tree<number> = new Node1(new Leaf(2), 2, new Node1(new Leaf(2), 4, new Leaf(2)))