"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Left = exports.Right = exports.Either = void 0;
class Either {
    bind(f) {
        return this.matchWith({
            left: (v) => new Left(v),
            right: (v) => f(v)
        });
    }
}
exports.Either = Either;
class Right extends Either {
    constructor(value) {
        super();
        this.Value = value;
    }
    map(f) {
        return new Right(f(this.Value));
    }
    matchWith(pattern) {
        return pattern.right(this.Value);
    }
}
exports.Right = Right;
class Left extends Either {
    constructor(value) {
        super();
        this.Value = value;
    }
    map(f) {
        return new Left(this.Value);
    }
    matchWith(pattern) {
        return pattern.left(this.Value);
    }
}
exports.Left = Left;
//# sourceMappingURL=Either.js.map