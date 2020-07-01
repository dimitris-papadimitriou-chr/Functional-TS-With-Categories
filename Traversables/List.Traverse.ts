import { Id } from "../Ch03/Functors/Id"
declare global {
    interface Array<T> {
        MatchWith<T1>(pattern: ({ empty: () => T1, cons: (v: T, rest: Array<T>) => T1 })): T1;
        Traverse<T1>(f: (v: T) => Id<T1>): Id<Array<T1>>;

    }
}

export function demo() {

    class F {
        public static Distribute<T>(array: Array<Id<T>>) {
            return array.MatchWith({
                empty: () => new Id<Array<any>>([]),
                cons: (v, r) => {
                    var a =
                        this.Distribute(r)
                            .apply(new Id<(rest: Array<any>) => (v: any) => Array<any>>((u: Array<any>) => (v: any) => [v, ...u]))
                    var b = v.apply(a);
                    return b;
                }
            });
        }

        public static Show<T>(array: Array<T>) {
            return array.MatchWith({
                empty: () => "Empty",
                cons: (v, r) => `(${v},${this.Show(r)})`
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

    Array.prototype.Traverse = function <T1>(f: (v: any) => Id<T1>) {
        return this.MatchWith({
            empty: () => new Id<Array<any>>([]),
            cons: (v, r) => {
                var a =
                    r.Traverse(f)
                        .apply(new Id<(rest: Array<any>) => (v: any) => Array<any>>((u: Array<any>) => (v: any) => [v, ...u]))
                var b = f(v).apply(a);
                return b;
            }
        });
    }

    var add = new Id<(v: number) => (u: number) => number>((v: number) => (u: number) => v + u);
    
    var array: Array<number> = [1, 2, 3];

    console.log(F.Show(array));

    var traversed: Id<Array<number>> = array.Traverse<number>(x => new Id<number>(x + 1));

    var arrayOfId: Array<Id<number>> = [new Id<number>(1), new Id<number>(2), new Id<number>(3)];

    var idOfArray: Id<Array<number>> = F.Distribute(arrayOfId);

}