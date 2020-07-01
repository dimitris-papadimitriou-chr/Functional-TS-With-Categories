"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lazy = void 0;
class Lazy {
    constructor(fn) {
        this.Fn = fn;
    }
    get value() {
        if (!this.Value) {
            this.Value = this.Fn();
        }
        return this.Value;
    }
    map(f) {
        return new Lazy(() => f(this.Fn()));
    }
    ;
}
exports.Lazy = Lazy;
//# sourceMappingURL=Lazy.js.map