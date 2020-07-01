import { Id } from "../../Ch03/Functors/Id"
export function demo() {

    type TreePattern<T, T1> = { leaf: (v: T) => T1, node: (left: T1, v: T, right: T1) => T1 };

    type NodePatternCurried<T, T1> = (left: Tree<T>) => (v: T) => (right: Tree<T>) => Tree<T1>;

    abstract class Tree<T>
    {
        abstract MatchWith<T1>(pattern: ({ leaf: (v: T) => T1, node: (left: Tree<T>, v: T, right: Tree<T>) => T1 })): T1;

        Traverse<T1>(f: (v: any) => Id<T1>): Id<Tree<T1>> {
            return this.MatchWith({
                leaf: (v) => Id.ap(Id.of(x => new Leaf<T1>(x)), f(v)),
                node: (l, v, r) => {
                    return Id.ap(Id.ap(Id.ap(
                        Id.of((left: Tree<T1>) => (v: T1) => (right: Tree<T1>) => new Node1(left, v, right)),
                        l.Traverse(f)),
                        f(v)),
                        r.Traverse(f)
                    )
                }
            });
        }

        Show(): string {
            return this.MatchWith({
                leaf: (v) => `(${v})`,
                node: (l, v, r) => `(${l.Show()},${v},${r.Show()})`
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

    interface Tree<T> {
        Cata<T1>(algebra: TreePattern<T, T1>): T1;
    }

    Tree.prototype.Cata = function <T, T1>(algebra: TreePattern<T, T1>) {
        return this.MatchWith({
            leaf: (v) => algebra.leaf(v),
            node: (l, v, r) => algebra.node(l.Cata(algebra), v, r.Cata(algebra))
        });
    }

    const tree = new Node1(new Node1(new Leaf(1), 2, new Leaf(3)), 4, new Node1(new Leaf(5), 6, new Leaf(7)));

    console.log(tree.Show());

    function TraverseAlgebra<T, T1>(f: (v: any) => Id<T1>): TreePattern<T, Id<Tree<T1>>> {
        return ({
            leaf: v => Id.ap(Id.of(x => new Leaf<T1>(x)), f(v)),
            node: (l, v, r) =>
                Id.ap(Id.ap(Id.ap(
                    Id.of((left: Tree<T1>) => (v: T1) => (right: Tree<T1>) => new Node1(left, v, right)),
                    l),
                    f(v)),
                    r)
        });
    }

   

    function ReverseAlgebra<T>(): TreePattern<T, Tree<T>> {
        return ({
            leaf: v => new Leaf(v),
            node: (l, v, r) => new Node1(r, v, l)
        });
    }

    var traversedTree = tree.Cata(TraverseAlgebra<number, number>(x => Id.of(x + 1)));

    console.log(traversedTree.Value.Show());

}