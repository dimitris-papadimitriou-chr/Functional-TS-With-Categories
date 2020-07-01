/// <reference path="monoid.ts" />

import { monoid, IMonoidAcc } from "../Ch01/monoid";

export function demo() {

    class DictionaryMonoid<TValue> implements monoid<VariableStore<TValue>>
    {
        ValueMonoid: monoid<TValue>;
        constructor(valueMonoid: monoid<TValue>) {
            this.ValueMonoid = valueMonoid;
        }

        empty: { [name: string]: TValue; } = {};
        concat: (u: VariableStore<TValue>, v: VariableStore<TValue>) => VariableStore<TValue> =
            (u, v) => {
                var merge = { ...v };  //copy v
                for (var key in u)
                    if (merge[key])
                        merge[key] = this.ValueMonoid.concat(merge[key], u[key])
                    else
                        merge[key] = u[key]
                return merge;
            };
    }

    type VariableStore<T> = { [name: string]: T; };

    var dictionary1: VariableStore<number> = {};
    dictionary1["and"] = 5;
    dictionary1["the"] = 3;

    var dictionary2: VariableStore<number> = {};
    dictionary2["and"] = 7;
    dictionary2["or"] = 4;

    var mergeMonoid = new DictionaryMonoid(({ empty: 0, concat: (x, y) => x + y }))
    var mergedWordCount: VariableStore<number> = mergeMonoid.concat(dictionary1, dictionary2);
}
