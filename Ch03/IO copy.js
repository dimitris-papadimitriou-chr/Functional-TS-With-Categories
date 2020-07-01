"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IO = void 0;
class IO {
    constructor(fn) {
        this.Fn = fn;
    }
    map(f) {
        return new IO(() => f(this.Fn()));
    }
    ;
    matchWith(f) {
        return f(this.Fn());
    }
    ;
    run() {
        return this.Fn();
    }
    ;
}
exports.IO = IO;
//# sourceMappingURL=IO copy.js.map