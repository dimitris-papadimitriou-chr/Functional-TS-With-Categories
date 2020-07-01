
import { monoid } from "./monoid";

export function demo() {

    //mapReduceDemo();
    dictionaryMonoidDemo();
}


function mapReduceDemo() {


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

    var reduced = mapReduce<number, number>(slice(bigList, 100), x => x + 1,
        ({ empty: 0, concat: (x, y) => x + y }))

}
 
function dictionaryMonoidDemo() {

    type VariableStore<T> = { [name: string]: T; };

    class DictionaryMonoid<TValue> implements monoid<VariableStore<TValue>>
    {
        ValueMonoid: monoid<TValue>;
        constructor(valueMonoid: monoid<TValue>) {
            this.ValueMonoid = valueMonoid;
        }

        empty: { [name: string]: TValue; } = {};
        concat: (u: VariableStore<TValue>, v: VariableStore<TValue>) => VariableStore<TValue>
            = (u, v) => {
                var merge = { ...v };  //copy v
                for (var key in u)
                    if (merge[key])
                        merge[key] = this.ValueMonoid.concat(merge[key], u[key])
                    else
                        merge[key] = u[key]
                return merge;
            };
    }

    var dictionary1: VariableStore<number> = {};
    dictionary1["and"] = 5;
    dictionary1["the"] = 3;

    var dictionary2: VariableStore<number> = {};
    dictionary2["and"] = 7;
    dictionary2["or"] = 4;

    var mergeMonoid = new DictionaryMonoid(({ empty: 0, concat: (x, y) => x + y }));
    
    var mergedWordCount: VariableStore<number> = mergeMonoid.concat(dictionary1, dictionary2);

}