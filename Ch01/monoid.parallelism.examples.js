"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    //mapReduceDemo();
    dictionaryMonoidDemo();
}
exports.demo = demo;
function mapReduceDemo() {
    function slice(list, size) {
        var accumulation = [];
        for (var i = 0; i < list.length; i += size) {
            var chunk = list.slice(i, i + size);
            accumulation.push(chunk);
        }
        return accumulation;
    }
    function mapReduce(list, f, m) {
        var accumulation = [];
        for (var i = 0; i < list.length; i++) {
            var chunk = list[i];
            var reduction = chunk.map(f).reduce(m.concat, m.empty);
            accumulation.push(reduction);
        }
        return accumulation.reduce(m.concat, m.empty);
    }
    var bigList = [...Array(1000)].map((_, i) => i);
    var reduced = mapReduce(slice(bigList, 100), x => x + 1, ({ empty: 0, concat: (x, y) => x + y }));
}
function dictionaryMonoidDemo() {
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
//# sourceMappingURL=monoid.parallelism.examples.js.map