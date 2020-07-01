/// <reference path="monoid.ts" />

import { Sum } from "../Ch01/monoid";


export function demo() {
     
    type Func<T, T1> = (v: T) => T1;

    function Map<T, T1, T2>(u: Func<T, T1>, f: (v: T1) => T2): Func<T, T2> {
        return x => f(u(x));
    }

    function Compose<T, T1, T2>(u: Func<T, T1>, f: Func<T1, T2>): Func<T, T2> {
        return x => f(u(x));
    }

    var Map1 = <T, T1, T2>(u: Func<T, T1>, f: (v: T1) => T2): Func<T, T2> => x => f(u(x));
     
}






