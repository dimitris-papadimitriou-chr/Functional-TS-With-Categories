import { Id } from "../../Ch03/Functors/Id"
import { Maybe, Some, None } from "../../Functors/Maybe";
import { monoid } from "../../Ch01/monoid";

export function demo() {

    class LazyProduct<T> {
        Value: T
        Rest: () => Maybe<LazyProduct<T>>

        constructor(value: T, rest: () => Maybe<LazyProduct<T>>) {
            this.Rest = rest;
            this.Value = value;
        }
    }



    //var coana: (n: number) => (r: Maybe<Product<number>>) => Maybe<Product<number>>
    //    = n => r => coana(n + 1)(new Some(new Product(n, r)))

    var coana:  (n: number, r: Maybe<LazyProduct<number>>) =>() => Maybe<LazyProduct<number>>
        = (n, r) => () => coana(n + 1, new Some(new LazyProduct(n, () => r)))()

    try {
        var stream: Maybe<LazyProduct<number>> = coana(0, new None<LazyProduct<number>>())();
     //   var t = stream.Map<{ v: number }>(x => ({ v: x.Value }));
    } catch (e) {
        console.log(e)
    }

}