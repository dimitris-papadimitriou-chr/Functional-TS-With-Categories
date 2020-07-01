import { Tree, Node1, Leaf } from "../../DataStructures/TreeBinary"
import { F, ListPattern } from "../../DataStructures/List"

//Array.prototype.MatchWith = function <T1>(pattern: ListPattern<any, T1>) {
//    if (this.length == 0) {
//        return pattern.empty();
//    }
//    else {
//        return pattern.cons(this[0], this.slice(1));
//    }
//}

export function demo() {

    function ToTree(array: Array<number>): Tree<number> {
        return array.length == 1 ?
            new Leaf<number>(array[0]) :
            new Node1<number>(ToTree(array.slice(0, array.length / 2)),
                ToTree(array.slice(array.length / 2, array.length)));
    }

    function ZipOrdered(a1: Array<number>, a2: Array<number>)
        : Array<number> {
        return a1.MatchWith({
            empty: () => a2,
            cons: (x, xs) => a2.MatchWith({
                empty: () => xs,
                cons: (y, ys) => x > y ?
                    [x, ...(ZipOrdered(xs, [y, ...ys]))] :
                    [y, ...(ZipOrdered(ys, [x, ...xs]))]
            }),
        })
    }

    function Sort(tree: Tree<number>)
        : Array<number> {
        return tree.MatchWith({
            leaf: (v) => [v],
            node: (l, r) => ZipOrdered(Sort(l), Sort(r))
        })
    }

    var array: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];

    var t = ToTree(array);
    console.log(t.Show());//((((1) ,(2)) ,((3) ,(4))) ,(((5) ,(6)) ,((7) ,(8))))
    try {
       // console.log(ZipOrdered([8, 7, 3, 1], [20, 10, 5, 2]));
    console.log(Sort(ToTree([8, 2, 6, 7, 15, 20, 3, 1])));
    } catch (e) {
        console.log(e);
    }



}