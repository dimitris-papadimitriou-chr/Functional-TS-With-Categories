"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    class Id {
        constructor(value) { this.Value = value; }
        map(f) { return new Id(f(this.Value)); }
        ;
        bind(f) { return f(this.Value); }
        ;
        static of(v) { return new Id(v); }
        matchWith(alg) { alg(this.Value); }
        ;
    }
    let r = new Id(5).bind(x => new Id(x + 1)); //=== Id(6)
    r.matchWith(console.log);
}
exports.demo = demo;
//# sourceMappingURL=Id.js.map