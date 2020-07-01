export function demo() {

    type TreePattern<T, T1> = { leaf: (v: T) => T1, node: (left: T1, v: T, right: T1) => T1 };

    interface Tree<T> {
        //Cata<T1>(algebra: ({ leaf: (v: T) => T1, node: (left: T1, v: T, right: T1) => T1 })): T1;
        Cata<T1>(algebra: TreePattern<T, T1>): T1;
    }

    abstract class Tree<T>
    {
        abstract MatchWith<T1>(pattern: ({ leaf: (v: T) => T1, node: (left: Tree<T>, v: T, right: Tree<T>) => T1 })): T1;

        fold(monoid: { empty: () => T; concat: (x: T, y: T) => T; }): T {
            return this.MatchWith({
                leaf: (v) => monoid.concat(v, monoid.empty()),
                node: (l, v, r) => monoid.concat(monoid.concat(l.fold(monoid), v), r.fold(monoid))
            });
        }

        Show(): string {
            return this.MatchWith({
                leaf: (v) => `(${v})`,
                node: (l, v, r) => `(${l.Show()},${v},${r.Show()})`
            });
        }
        Reverse(): Tree<T> {
            return this.MatchWith({
                leaf: (v) => new Leaf(v),
                node: (l, v, r) => new Node1(r.Reverse(), v, l.Reverse())
            });
        }

    }

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

        MatchWith<T1>(pattern: { leaf: (v: T) => T1; node: (left: Tree<T>, v: T, right: Tree<T>) => T1; }): T1 {
            return pattern.node(this.Left, this.Value, this.Right);
        }

    }

    class Leaf<T> extends Tree<T> {
        Value: T;
        constructor(value: T) {
            super();
            this.Value = value;
        }
        MatchWith<T1>(pattern: { leaf: (v: T) => T1; node: (left: Tree<T>, v: T, right: Tree<T>) => T1; }): T1 {
            return pattern.leaf(this.Value);
        }
    }

    Tree.prototype.Cata = function <T, T1>(algebra: TreePattern<T, T1>) {
        return this.MatchWith({
            leaf: (v) => algebra.leaf(v),
            node: (l, v, r) => algebra.node(l.Cata(algebra), v, r.Cata(algebra))
        });
    }

    var algSumInt: TreePattern<number, number> = ({
        leaf: v => v,
        node: (l, v, r) => l + v + r
    });

    var algProductInt: TreePattern<number, number> = ({
        leaf: v => v,
        node: (l, v, r) => l * v * r
    });

    var identityInterpretation: <T>() => TreePattern<T, Tree<T>> =
        () => ({
            leaf: v => new Leaf(v),
            node: (l, v, r) => new Node1(l, v, r)
        });

    var reverseInterpretation: <T>() => TreePattern<T, Tree<T>> =
        () => ({
            leaf: v => new Leaf(v),
            node: (l, v, r) => new Node1(r, v, l)
        });

    const tree = new Node1(new Node1(new Leaf(1), 2, new Leaf(3)), 4, new Node1(new Leaf(5), 6, new Leaf(7)));

    var sum: number = tree.Cata<number>(algSumInt);

    var product: number = tree.Cata<number>(algProductInt);

    var identity: Tree<number> = tree.Cata(identityInterpretation());

    var reverse: Tree<number> = tree.Cata(reverseInterpretation());
    console.log(reverse.Show());

    //var fold = tree.fold({ empty: () => 0, concat:(x,y)=>n })
}