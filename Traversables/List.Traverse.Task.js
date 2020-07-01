"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Promise_1 = require("../Functors/Promise");
const fetch = require('node-fetch');
function demo() {
    class F {
        static Show(array) {
            return array.MatchWith({
                empty: () => "Empty",
                cons: (v, r) => `(${v},${this.Show(r)})`
            });
        }
        static Zip(_this, a2) {
            return _this.MatchWith({
                empty: () => a2,
                cons: (x, xs) => _this.MatchWith({
                    empty: () => xs,
                    cons: (y, ys) => [x, y].concat(this.Zip(xs, ys))
                })
            });
        }
    }
    Array.prototype.MatchWith = function (pattern) {
        if (this.length == 0) {
            return pattern.empty();
        }
        else {
            return pattern.cons(this[0], this.slice(1));
        }
    };
    var add = new Promise(r => r((v) => v + 1));
    try {
        var t = Promise_1.P.ap(add, new Promise(r => r(1)));
        t.MatchWith({
            ok: x => {
                console.log(`result: ${x}`);
            },
            error: x => {
                console.log(`error: ${x}`);
            },
        });
    }
    catch (e) {
        console.log(e);
    }
    var arrayOfPromises = [Promise_1.P.of(1), Promise_1.P.of(5), Promise_1.P.of(6)];
    var PromiseOfArray = Promise_1.P.Distribute(arrayOfPromises);
    PromiseOfArray.MatchWith({
        ok: x => {
            console.log(`result: ${x}`);
        },
        error: x => {
            console.log(`error: ${x}`);
        },
    });
    var array = [1, 2, 3, 4];
    var traverseResult = Promise_1.P.Traverse(array, x => Promise_1.P.of(x + 1));
    traverseResult.MatchWith({
        ok: x => {
            console.log(`result: ${x}`);
        },
        error: x => {
            console.log(`error: ${x}`);
        },
    });
    fetch('https://api.github.com/users/mojombo')
        .then(res => res.text())
        .MatchWith({
        ok: x => {
            console.log(`result: ${x}`);
        },
        error: x => {
            console.log(`error: ${x}`);
        },
    });
    var userUris = ["https://api.github.com/users/mojombo", "https://api.github.com/users/defunkt"];
    var gitUserDetailsPromise = Promise_1.P.Traverse(userUris, uri => fetch(uri).then(res => res.text()));
    gitUserDetailsPromise.MatchWith({
        ok: x => {
            console.log(`result: ${x}`);
        },
        error: x => {
            console.log(`error: ${x}`);
        },
    });
}
exports.demo = demo;
//# sourceMappingURL=List.Traverse.Task.js.map