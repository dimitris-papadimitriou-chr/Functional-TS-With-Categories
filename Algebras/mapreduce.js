"use strict";
/// <reference path="monoid.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
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
exports.demo = demo;
//# sourceMappingURL=mapreduce.js.map