import { Id } from "../Ch03/Functors/Id"
export function demo() {

    type TreePattern<T, T1> = { leaf: (v: T) => T1, node: (left: T1, v: T, right: T1) => T1 };

    type NodePatternCurried<T, T1> = (left: Tree<T>) => (v: T) => (right: Tree<T>) => Tree<T1>;

    abstract class Tree<T>
    {
        abstract matchWith<T1>(pattern: ({ leaf: (v: T) => T1, node: (left: Tree<T>, v: T, right: Tree<T>) => T1 })): T1;

        Traverse<T1>(f: (v: any) => Id<T1>): Id<Tree<T1>> {
            return this.matchWith({
                leaf: (v) => new Id<Leaf<any>>(new Leaf(v)),
                node: (l, v, r) => {
                    return Id.ap(Id.ap(Id.ap(
                        Id.of((left: Tree<any>) => (v: any) => (right: Tree<any>) => new Node1(left, v, right)),
                        l.Traverse(f)),
                        f(v)),
                        r.Traverse(f)
                    )
                }
            });
        }

        Show(): string {
            return this.matchWith({
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

        matchWith<T1>(pattern: { leaf: (v: T) => T1; node: (left: Tree<T>, v: T, right: Tree<T>) => T1; }): T1 {
            return pattern.node(this.Left, this.Value, this.Right);
        }

    }

    class Leaf<T> extends Tree<T> {
        Value: T;
        constructor(value: T) {
            super();
            this.Value = value;
        }
        matchWith<T1>(pattern: { leaf: (v: T) => T1; node: (left: Tree<T>, v: T, right: Tree<T>) => T1; }): T1 {
            return pattern.leaf(this.Value);
        }
    }

    interface Tree<T> {
        Cata<T1>(algebra: TreePattern<T, T1>): T1;
    }

    Tree.prototype.Cata = function <T, T1>(algebra: TreePattern<T, T1>) {
        return this.matchWith({
            leaf: (v) => algebra.leaf(v),
            node: (l, v, r) => algebra.node(l.Cata(algebra), v, r.Cata(algebra))
        });
    }


    const tree = new Node1(new Node1(new Leaf(1), 2, new Leaf(3)), 4, new Node1(new Leaf(5), 6, new Leaf(7)));

    var t = new Id<NodePatternCurried<number, number>>(
        (left: Tree<number>) => (v: number) => (right: Tree<number>) => new Node1(left, v, right));

    var rt = Id.of<number>(1)

    var product =
        Id.ap(
            Id.ap(
                Id.ap(Id.of((left: Tree<number>) => (v: number) => (right: Tree<number>) => new Node1(left, v, right)),
                    Id.of<Leaf<number>>(new Leaf<number>(1))),
                Id.of<number>(1)),
            Id.of<Leaf<number>>(new Leaf<number>(1))
        );


    function Distribute<T>(tree: Tree<Id<T>>): Id<Tree<T>> {
        return tree.matchWith({
            leaf: (v) => Id.ap(Id.of(x => new Leaf<T>(x)), v),
            node: (l, v, r) => {
                return Id.ap(Id.ap(Id.ap(
                    Id.of((left: Tree<T>) => (v: T) => (right: Tree<T>) => new Node1(left, v, right)),
                    Distribute(l)),
                    v),
                    Distribute(r)
                )
            }
        });
    }


    //var a =
    //    new Id<number>(1)
    //        .apply()

    const treeOfIds: Tree<Id<number>> = new Node1(new Node1(new Leaf(new Id(1)), new Id(2), new Leaf(new Id(3))),
        new Id(4), new Node1(new Leaf(new Id(5)), new Id(6), new Leaf(new Id(7))));

    var distribute = Distribute(treeOfIds);

    console.log(tree.Show());

}