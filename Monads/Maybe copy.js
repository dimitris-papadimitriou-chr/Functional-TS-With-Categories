"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.None = exports.Some = exports.Maybe = void 0;
class Maybe {
    bind(f) {
        return this.matchWith({
            none: () => new None(),
            some: (v) => f(v)
        });
    }
}
exports.Maybe = Maybe;
class Some extends Maybe {
    constructor(value) {
        super();
        this.Value = value;
    }
    bind(f) {
        return f(this.Value);
    }
    map(f) {
        return new Some(f(this.Value));
    }
    matchWith(pattern) {
        return pattern.some(this.Value);
    }
}
exports.Some = Some;
class None extends Maybe {
    map(f) {
        return new None();
    }
    matchWith(pattern) {
        return pattern.none();
    }
}
exports.None = None;
//# sourceMappingURL=Maybe copy.js.map