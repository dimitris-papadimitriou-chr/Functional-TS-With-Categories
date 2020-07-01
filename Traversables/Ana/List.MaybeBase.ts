import { Id } from "../../Ch03/Functors/Id"
import { Maybe, Some, None } from "../../Functors/Maybe";
import { monoid } from "../../Ch01/monoid";

//type ListPatternCurried<T> = (v: T) => (rest: Array<T>) => Array<T>;
type ListPattern<T, T1> = ({ empty: () => T1, cons: (v: T, rest: Array<T>) => T1 });


export function demo() {

    function Fold<T>(list: Maybe<Product<T>>, monoid: monoid<T>): T {
        return list.MatchWith(({
            none: () => monoid.empty,
            some: (product: Product<T>) => monoid.concat(product.Value, Fold(product.Rest, monoid))
        }))
    }

    function Multiply(list: Maybe<Product<number>>): number {
        return list.MatchWith(({
            none: () => 1,
            some: (product: Product<number>) => product.Value * Multiply(product.Rest)
        }))
    }


    class Product<T> {
        Value: T
        Rest: Maybe<Product<T>>

        constructor(value: T, rest: Maybe<Product<T>>) {
            this.Rest = rest;
            this.Value = value;
        }
    }
    var list = new Some<Product<number>>(new Product<number>(5, new Some<Product<number>>(new Product<number>(5, new None()))));

    var product = Fold(list, { empty: 1, concat: (x, y) => x * y })

    interface IProduct<T> {
        Value: T
        Rest: Maybe<IProduct<T>>
    }
    function FoldProd<T>(list: Maybe<IProduct<T>>, monoid: monoid<T>): T {
        return list.MatchWith(({
            none: () => monoid.empty,
            some: (product: IProduct<T>) => monoid.concat(product.Value, FoldProd(product.Rest, monoid))
        }))
    }

    var l: IProduct<number> = ({
        Value: 1, Rest: new Some<IProduct<number>>(
            ({
                Value: 2, Rest: new Some<IProduct<number>>(
                    ({
                        Value: 3, Rest: new Some<IProduct<number>>(
                            ({
                                Value: 4,
                                Rest: new None<IProduct<number>>()
                            }))
                    })
                )
            })
        )
    });

    class ProductF<T, E>
    {
        Value: T
        Rest: E
        constructor(value: T, rest: E) {
            this.Value = value;
            this.Rest = rest;
        }
    }

    class SomeF<T, E>
    {
        Value: ProductF<T, E>;
        constructor(value: ProductF<T, E>) {
            this.Value = value;
        }
    }

    var s: SomeF<number, number> = new SomeF<number, number>(new ProductF<number, number>(1, 1));

    var s1: SomeF<number, SomeF<number, number>> =
        new SomeF<number, SomeF<number, number>>(new ProductF<number, SomeF<number, number>>(2, s));

    var s2: SomeF<number, SomeF<number, SomeF<number, number>>> =
        new SomeF<number, SomeF<number, SomeF<number, number>>>(
            new ProductF<number, SomeF<number, SomeF<number, number>>>(3, s1));

    class SomeFixed<T, E extends SomeFixed<T, E>>
    {
        Value: ProductF<T, E>;
        constructor(value: ProductF<T, E>) {
            this.Value = value;
        }
    }
    class SomeFix<T>
    {
        Value: ProductF<T, SomeFix<T>>;
        constructor(value: ProductF<T, SomeFix<T>>) {
            this.Value = value;
        }
    }
}