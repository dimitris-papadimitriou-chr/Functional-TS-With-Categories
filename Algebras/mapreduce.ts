/// <reference path="monoid.ts" />

import { monoid } from "../Ch01/monoid";

export function demo() {

    function slice<T>(list: Array<T>, size: number): Array<Array<T>> {
        var accumulation: Array<Array<T>> = [];
        for (var i = 0; i < list.length; i += size) {
            var chunk: (Array<T>) = list.slice(i, i + size);
            accumulation.push(chunk);
        }
        return accumulation;
    }

    function mapReduce<T, T1>(
        list: Array<Array<T>>,
        f: (v: T) => T1,
        m: monoid<T1>): T1 {
        var accumulation: Array<T1> = [];

        for (var i = 0; i < list.length; i++) {
            var chunk = list[i];
            var reduction: T1 = chunk.map(f).reduce(m.concat, m.empty);
            accumulation.push(reduction);
        }

        return accumulation.reduce(m.concat, m.empty);
    }

    var bigList = [...Array(1000)].map((_, i) => i);

    var reduced = mapReduce<number, number>(slice(bigList, 100), x => x + 1, ({ empty: 0, concat: (x, y) => x + y }))
}