"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = void 0;
class Id {
    constructor(value) { this.Value = value; }
    map(f) { return new Id(f(this.Value)); }
    ;
    apply(applicative) { return applicative.map(f => f(this.Value)); }
    ;
    static of(v) { return new Id(v); }
    static ap(applicative, fa) { return applicative.map(f => f(fa.Value)); }
}
exports.Id = Id;
//# sourceMappingURL=Id copy.js.map