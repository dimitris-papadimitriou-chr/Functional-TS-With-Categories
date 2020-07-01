import { P, ListPattern } from "../Functors/Promise";
const fetch = require('node-fetch');
//import { Id } from "../Functors/Id"
declare global {
    interface Array<T> {
        MatchWith<T1>(pattern: ({ empty: () => T1, cons: (v: T, rest: Array<T>) => T1 })): T1;
        //Traverse<T1>(f: (v: T) => Promise<T1>): Promise<Array<T1>>;
    }
}

export function demo() {


    class F {


        public static Show<T>(array: Array<T>) {
            return array.MatchWith({
                empty: () => "Empty",
                cons: (v, r) => `(${v},${this.Show(r)})`
            });
        }

        public static Zip<T>(_this: Array<T>, a2: Array<T>): Array<T> {
            return _this.MatchWith({
                empty: () => a2,
                cons: (x, xs) => _this.MatchWith({
                    empty: () => xs,
                    cons: (y, ys) =>
                        [x, y].concat(this.Zip(xs, ys))
                })
            });

        }
    }

    Array.prototype.MatchWith = function <T1>(pattern: ({ empty: () => T1, cons: (v: any, rest: Array<any>) => T1 })) {
        if (this.length == 0) {
            return pattern.empty();
        }
        else {
            return pattern.cons(this[0], this.slice(1));
        }
    }

    var add = new Promise<(v: number) => number>(r => r((v: number) => v + 1));

    try {

        var t = P.ap(add, new Promise<number>(r => r(1)));

        t.MatchWith({
            ok: x => {
                console.log(`result: ${x}`)
            },
            error: x => {
                console.log(`error: ${x}`)
            },
        })
    } catch (e) {
        console.log(e);
    }

    var arrayOfPromises: Array<Promise<number>> = [P.of(1), P.of(5), P.of(6)];

    var PromiseOfArray: Promise<Array<number>> = P.Distribute(arrayOfPromises);
    PromiseOfArray.MatchWith({
        ok: x => {
            console.log(`result: ${x}`)
        },
        error: x => {
            console.log(`error: ${x}`)
        },
    })


    var array: Array<number> = [1, 2, 3, 4];

    var traverseResult: Promise<Array<number>> = P.Traverse(array, x => P.of(x + 1));
    traverseResult.MatchWith({
        ok: x => {
            console.log(`result: ${x}`)
        },
        error: x => {
            console.log(`error: ${x}`)
        },
    })


    fetch('https://api.github.com/users/mojombo')
        .then(res => res.text())
        .MatchWith({
            ok: x => {
                console.log(`result: ${x}`)
            },
            error: x => {
                console.log(`error: ${x}`)
            },
        })


    var userUris: Array<string> = ["https://api.github.com/users/mojombo", "https://api.github.com/users/defunkt"];

    var gitUserDetailsPromise: Promise<Array<string>> = P.Traverse(userUris, uri => fetch(uri).then(res => res.text()));

    gitUserDetailsPromise.MatchWith({
        ok: x => {
            console.log(`result: ${x}`)
        },
        error: x => {
            console.log(`error: ${x}`)
        },
    })

}