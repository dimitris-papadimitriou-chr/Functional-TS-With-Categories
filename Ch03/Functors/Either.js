"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Left = exports.Right = exports.Either = void 0;
class Either {
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
var d = new Left("invalid operation")
    .map(x => x + 1)
    .matchWith({
    left: v => "error :" + v,
    right: v => v.toString()
});
var d = new Right(4)
    .map(x => x + 1)
    .matchWith({
    left: v => "error :" + v,
    right: v => v.toString()
});
//# sourceMappingURL=Either.js.map