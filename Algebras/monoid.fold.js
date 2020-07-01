"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    new Promise((resolve, reject) => { reject(1); })
        .map(x => x + 3)
        .MatchWith({
        ok: x => {
            console.log(`result: ${x}`);
        },
        error: x => {
            console.log(`error: ${x}`);
        },
    });
}
exports.demo = demo;
//# sourceMappingURL=monoid.fold.js.map