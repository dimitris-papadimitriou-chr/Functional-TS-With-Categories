

export type TreePattern<T, T1> = { leaf: (v: T) => T1, node: (left: T1, right: T1) => T1 };

export interface Tree<T> {
    Cata<T1>(algebra: TreePattern<T, T1>): T1;
}

export abstract class Tree<T>
{
    abstract MatchWith<T1>(pattern: ({ leaf: (v: T) => T1, node: (left: Tree<T>, right: Tree<T>) => T1 })): T1;

    Show(): string {
        return this.MatchWith({
            leaf: (v) => `(${v})`,
            node: (l, r) => `(${l.Show()} ,${r.Show()})`
        });
    }
}

export class Node1<T> extends Tree<T> {
    Left: Tree<T>;
    Value: T;
    Right: Tree<T>;
    constructor(left: Tree<T>, right: Tree<T>) {
        super();
        this.Left = left;
        this.Right = right;
    }

    MatchWith<T1>(pattern: { leaf: (v: T) => T1; node: (left: Tree<T>, right: Tree<T>) => T1; }): T1 {
        return pattern.node(this.Left, this.Right);
    }

}

export class Leaf<T> extends Tree<T> {
    Value: T;
    constructor(value: T) {
        super();
        this.Value = value;
    }
    MatchWith<T1>(pattern: { leaf: (v: T) => T1; node: (left: Tree<T>, right: Tree<T>) => T1; }): T1 {
        return pattern.leaf(this.Value);
    }
}

Tree.prototype.Cata = function <T, T1>(algebra: TreePattern<T, T1>) {
    return this.MatchWith({
        leaf: (v) => algebra.leaf(v),
        node: (l, r) => algebra.node(l.Cata(algebra), r.Cata(algebra))
    });
}
