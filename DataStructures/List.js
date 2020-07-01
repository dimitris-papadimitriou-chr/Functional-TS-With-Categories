"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.F = void 0;
//export interface Array<T> {
//    MatchWith<T1>(pattern: ({ empty: () => T1, cons: (v: T, rest: Array<T>) => T1 })): T1;
//    Cata<T1>(pattern: ListPattern<T, T1>): T1;
//}
class F {
    static Show(array) {
        return array.MatchWith({
            empty: () => "Empty",
            cons: (v, r) => `(${v},${this.Show(r)})`
        });
    }
    //    public static Maybe<T> FirstOrNone<T>(this List<T> @this, Func < T, bool > predicate) =>
    //@this.MatchWith<T, Maybe<T>>(algebra: (
    //    Empty: () => new None<T>(),
    //    Cons: (v, r) => predicate(v) ?
    //        new Some<T>(v) :
    //        r.FirstOrNone(predicate)
    static Zip(a1, a2) {
        return a1.MatchWith({
            empty: () => a2,
            cons: (x, xs) => a2.MatchWith({
                empty: () => a1,
                cons: (y, ys) => [x, y].concat(F.Zip(xs, ys))
            })
        });
    }
    static ZipMap(a1, a2, f) {
        return a1.MatchWith({
            empty: () => a2.map(x => f(null, x)),
            cons: (x, xs) => a2.MatchWith({
                empty: () => a1.map(x => f(x, null)),
                cons: (y, ys) => [f(x, y)].concat(F.ZipMap(xs, ys, f))
            })
        });
    }
}
exports.F = F;
Array.prototype.MatchWith = function (pattern) {
    if (this.length == 0) {
        return pattern.empty();
    }
    else {
        return pattern.cons(this[0], this.slice(1));
    }
};
Array.prototype.Cata = function (pattern) {
    return this.MatchWith({
        empty: () => pattern.empty(),
        cons: (v, r) => pattern.cons(v, r.Cata(pattern))
    });
};
//# sourceMappingURL=List.js.map