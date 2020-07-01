import { Id } from "../../Ch03/Functors/Id"

//type ListPatternCurried<T> = (v: T) => (rest: Array<T>) => Array<T>;
type ListPattern<T, T1> = ({ empty: () => T1, cons: (v: T, rest: Array<T>) => T1 });

declare global {
    interface Array<T> {
        MatchWith<T1>(pattern: ({ empty: () => T1, cons: (v: T, rest: Array<T>) => T1 })): T1;
        Cata<T1>(pattern: ListPattern<T, T1>): T1;

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
    }

    Array.prototype.MatchWith = function <T1>(pattern: ListPattern<any, T1>) {
        if (this.length == 0) {
            return pattern.empty();
        }
        else {
            return pattern.cons(this[0], this.slice(1));
        }
    }

    Array.prototype.Cata = function <T1>(pattern: ListPattern<any, T1>): T1 {
        return this.MatchWith({
            empty: () => pattern.empty(),
            cons: (v, r) => pattern.cons(v, r.Cata(pattern))
        });
    }

    var array: Array<number> = [1, 2, 3];

    console.log(F.Show(array));

    var format: ListPattern<number, string> = ({ empty: () => "", cons: (v, r) => `(${v},${r})` });

    console.log(array.Cata(format));
}