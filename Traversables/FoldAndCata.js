"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    class Id {
        constructor(value) { this.Value = value; }
        map(f) { return new Id(f(this.Value)); }
        ;
        static of(v) { return new Id(v); }
        cata(alg) { alg(this.Value); }
        ;
        //cata<T1>(alg: (y: T) => T1): T1 { return alg(this.Value) };
        fold(acc, reducer) { return reducer(this.Value, acc); }
    }
    //fold: (accumulator, reducer) => reducer(reducer(accumulator, a), b)
    var Pair = (a, b) => ({
        fold(acc, reducer) { return reducer(b, reducer(a, acc)); }
    });
    var result = new Id(3).fold(0, (acc, v) => acc + v);
    //console.log(new Id(3).Value)    // Instead of this 
}
exports.demo = demo;
//# sourceMappingURL=FoldAndCata.js.map