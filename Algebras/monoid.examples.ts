/// <reference path="monoid.ts" />

import { Sum } from "../Ch01/monoid";


export function demo() {

    function fold<T>(list: Array<T>, acumulate: T, concat: (u: T, v: T) => T): T {
        list.forEach(item => {
            acumulate = concat(acumulate, item);
        })
        return acumulate;
    }


    function fold1<T>(list: Array<T>, acumulate: T, concat: (u: T, v: T) => T): T {
        for (var i = 0; i < list.length; i++) {
            acumulate = concat(acumulate, list[i]);
        }
        return acumulate;
    }


    var sum = fold([2, 3, 4], Sum.empty, Sum.concat);
    var product = fold([2, 3, 4], 1, (x, y) => x * y);
    var max = fold([2, 3, 4], Number.MIN_SAFE_INTEGER, (x, y) => x > y ? x : y);
}






