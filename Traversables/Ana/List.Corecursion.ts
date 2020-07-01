import { Id } from "../../Ch03/Functors/Id"
import { Maybe, Some, None } from "../../Functors/Maybe";
import { monoid } from "../../Ch01/monoid";

export function demo() {

    class Product<T> {

        Show<T>(): string {
            return `{value${this.Value}, rest :${this.Rest.MatchWith({ none: () => "", some: (v) => v.Show() })}}`
        }

        Value: T
        Rest: Maybe<Product<T>>

        constructor(value: T, rest: Maybe<Product<T>>) {
            this.Rest = rest;
            this.Value = value;
        }
    }

    class ProductF<T, E> {
        Value: T
        Rest: E

        constructor(value: T, rest: E) {
            this.Rest = rest;
            this.Value = value;
        }
    }

    var anaToListBase: (n: number) => Maybe<Product<number>> =
        (n: number) => n == 0 ?
            new None<Product<number>>() :
            new Some<Product<number>>(new Product(n, anaToListBase(n - 1)));

    type coAlgebraInt = (n: number) => Maybe<ProductF<number, number>>;

    var coAlgListBase: coAlgebraInt = (n: number) =>
        n == 0 ?
            new None<ProductF<number, number>>() :
            new Some(new ProductF<number, number>(n - 1, n - 1));

    var ana: (coalgebra: coAlgebraInt) => (oldState: number) => Maybe<Product<number>> =
        (coalgebra: coAlgebraInt) => (oldState: number) =>
            coalgebra(oldState).MatchWith({
                none: () => new None<Product<number>>(),
                some: (product: ProductF<number, number>) =>
                    new Some<Product<number>>(new Product<number>(product.Rest, ana(coalgebra)(product.Value)))
            });


    //var coana: (n: number) => (r: Maybe<Product<number>>) => Maybe<Product<number>>
    //    = n => r => coana(n + 1)(new Some(new Product(n, r)))

    var coana: (n: number, r: Maybe<Product<number>>) => Maybe<Product<number>>
        = (n, r) => coana(n + 1, new Some(new Product(n, r)))


    var stream = coana(0, new None<Product<number>>());

}