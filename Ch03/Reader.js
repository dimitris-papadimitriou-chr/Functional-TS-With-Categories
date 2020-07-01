"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reader = void 0;
class Reader {
    constructor(fn) {
        this.Fn = fn;
    }
    map(f) {
        return new Reader((env) => f(this.Fn(env)));
    }
    ;
    matchWith(f) {
        return (env) => f(this.Fn(env));
    }
    ;
    run(env) {
        return this.Fn(env);
    }
    ;
}
exports.Reader = Reader;
//# sourceMappingURL=Reader.js.map