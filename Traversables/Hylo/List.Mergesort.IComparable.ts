import { Tree, Node1, Leaf } from "../../DataStructures/TreeBinary"
import { F, ListPattern } from "../../DataStructures/List"

//public static List < T > Sort<T>(this Tree < T > @this) where T: IComparable =>
//         @this.MatchWith(algebra: (
//             Leaf: v => v.ToList(),
//             Node: (l, r) => l.Sort().ZipOrdered(r.Sort())
//         ));


export function demo() {

    interface IComparable<T> {
        compareTo(other: T): number;
    }

    function ToTree<T>(array: Array<T>): Tree<T> {
        return array.length == 1 ?
            new Leaf<T>(array[0]) :
            new Node1<T>(ToTree<T>(array.slice(0, array.length / 2)),
                ToTree<T>(array.slice(array.length / 2, array.length)));
    }

    function ZipOrdered<T extends IComparable<T>>(a1: Array<T>, a2: Array<T>)
        : Array<T> {
        return a1.MatchWith({
            empty: () => a2,
            cons: (x, xs) => a2.MatchWith({
                empty: () => xs,
                cons: (y, ys) => x.compareTo(y) > 0 ?
                    [x, ...(ZipOrdered(xs, [y, ...ys]))] :
                    [y, ...(ZipOrdered(ys, [x, ...xs]))]
            }),
        })
    }

    function Sort<T extends IComparable<T>>(tree: Tree<T>)
        : Array<T> {
        return tree.MatchWith({
            leaf: (v) => [v],
            node: (l, r) => ZipOrdered(Sort(l), Sort(r))
        })
    }

    var array: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];

    var t = ToTree(array);
    console.log(t.Show());

   
    //console.log(ZipOrdered([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8]));


}