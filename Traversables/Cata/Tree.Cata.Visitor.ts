export function demo() {

    interface Visitor<T, T1> {
        VisitLeaf(leaf: Leaf<T>): T1;
        VisitNode(node: Node1<T>): T1;
    }

    type TreePattern<T, T1> = { leaf: (v: T) => T1, node: (left: T1, v: T, right: T1) => T1 };

    //interface Tree<T> {
    //    Cata<T1>(algebra: TreePattern<T, T1>): T1;
    //}

    abstract class Tree<T>
    {
        // abstract MatchWith<T1>(pattern: ({ leaf: (v: T) => T1, node: (left: Tree<T>, v: T, right: Tree<T>) => T1 })): T1;
        abstract Accept<T1>(visitor: Visitor<T, T1>): T1


        Show(): string {

            var visitor: Visitor<T, string> = ({
                VisitLeaf: l => `(${l.Value})`,
                VisitNode: n => `(${n.Left.Accept(visitor)},${ n.Value}, ${n.Right.Accept(visitor)})`
            }); 
            return this.Accept(visitor);
        }

    }



    class Node1<T> extends Tree<T> {
        Accept<T1>(visitor: Visitor<T, T1>): T1 {
            return visitor.VisitNode(this);
        }

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

        Accept<T1>(visitor: Visitor<T, T1>): T1 {
            return visitor.VisitLeaf(this);
        }
    }

    //Tree.prototype.Cata = function <T, T1>(visitor: Visitor<T>) {

    //    this.Accept(visitor)
    //    visitor.VisitNode()
    //    //leaf: (v) => visitor.leaf(v),
    //    //    node: (l, v, r) => algebra.node(l.Cata(algebra), v, r.Cata(algebra))

    //}

    var algSumInt: TreePattern<number, number> = ({
        leaf: v => v,
        node: (l, v, r) => l + v + r
    });

    var algProductInt: TreePattern<number, number> = ({
        leaf: v => v,
        node: (l, v, r) => l * v * r
    });

    var identityInterpretation: <T>() => TreePattern<T, Tree<T>> = () => ({
        leaf: v => new Leaf(v),
        node: (l, v, r) => new Node1(l, v, r)
    });

    var reverseInterpretation: <T>() => TreePattern<T, Tree<T>> = () => ({
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