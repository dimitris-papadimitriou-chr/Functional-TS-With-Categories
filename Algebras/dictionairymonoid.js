"use strict";
/// <reference path="monoid.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    class DictionaryMonoid {
        constructor(valueMonoid) {
            this.empty = {};
            this.concat = (u, v) => {
                var merge = Object.assign({}, v); //copy v
                for (var key in u)
                    if (merge[key])
                        merge[key] = this.ValueMonoid.concat(merge[key], u[key]);
                    else
                        merge[key] = u[key];
                return merge;
            };
            this.ValueMonoid = valueMonoid;
        }
    }
    var dictionary1 = {};
    dictionary1["and"] = 5;
    dictionary1["the"] = 3;
    var dictionary2 = {};
    dictionary2["and"] = 7;
    dictionary2["or"] = 4;
    var mergeMonoid = new DictionaryMonoid(({ empty: 0, concat: (x, y) => x + y }));
    var mergedWordCount = mergeMonoid.concat(dictionary1, dictionary2);
}
exports.demo = demo;
//# sourceMappingURL=dictionairymonoid.js.map