import { Id } from "../../Ch03/Functors/Id"
import { monoid, IMonoidAcc, SumAcc, Sum } from "../../Ch01/monoid"

export function demo() {

    type TreePatternAlg<T, T1> = { leaf: (v: T) => T1, node: (left: T1, v: T, right: T1) => T1 };

    interface Tree<T> {
        //Cata<T1>(algebra: ({ leaf: (v: T) => T1, node: (left: T1, v: T, right: T1) => T1 })): T1;
        Cata<T1>(algebra: TreePatternAlg<T, T1>): T1;
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

        foldMap<TM>(empty: IMonoidAcc<TM>, f: (v: T) => IMonoidAcc<TM>): IMonoidAcc<TM> {
            return this.MatchWith({
                leaf: (v) => f(v),
                node: (l, v, r) => l.foldMap(empty, f).Concat(f(v)).Concat(r.foldMap(empty, f))
            });
        }


        foldMap1<TM>(monoid: { empty: () => TM; concat: (x: TM, y: TM) => TM; }, f: (x: T) => TM): TM {
            return this.MatchWith({
                leaf: (v) => monoid.concat(f(v), monoid.empty()),
                node: (l, v, r) => monoid.concat(monoid.concat(l.foldMap1(monoid, f), f(v)), r.foldMap1(monoid, f))
            });
        }

        foldMap2<TM>(empty: () => TM, reducer: (x: TM, y: T) => TM): TM {
            return this.MatchWith({
                leaf: (v) => reducer(empty(), v),
                node: (l, v, r) => reducer(l.foldMap2(empty, reducer), v)
            });
        }
        All(f: (x: T) => boolean): boolean {
            return this.foldMap1<boolean>(({ empty: () => true, concat: (x, y) => x && y }), f)
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

    Tree.prototype.Cata = function <T, T1>(algebra: TreePatternAlg<T, T1>) {
        return this.MatchWith({
            leaf: (v) => algebra.leaf(v),
            node: (l, v, r) => algebra.node(l.Cata(algebra), v, r.Cata(algebra))
        });
    }

    var algSumInt: TreePatternAlg<number, number> = ({
        leaf: v => v,
        node: (l, v, r) => l + v + r
    });

    var algProductInt: TreePatternAlg<number, number> = ({
        leaf: v => v,
        node: (l, v, r) => l * v * r
    });

    var identityInterpretation: <T>() => TreePatternAlg<T, Tree<T>> =
        () => ({
            leaf: v => new Leaf(v),
            node: (l, v, r) => new Node1(l, v, r)
        });

    var reverseInterpretation: <T>() => TreePatternAlg<T, Tree<T>> =
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



    var foldMapResult = tree.foldMap(new SumAcc(0), x => new SumAcc(x))
    /////FOLD MAP
    //var foldAlgebra: <T>(m: monoid<T>) => TreePatternAlg<T, T> =
    //    (m ) => ({
    //        leaf: (v) => m.Empty(),
    //        node: (l, v, r) => m.Empty()// m.Concat(l, m.Concat(l, v), r)
    //    });


    //var fold = tree.fold({ empty: () => 0, concat:(x,y)=>n })
}