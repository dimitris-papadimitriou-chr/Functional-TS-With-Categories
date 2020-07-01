export function demo() {

    interface Numeral {
        Show(): string;
        Show2(): string;
        Cata<T1>(algebra: ({ Zero: () => T1, Succ: (rest: T1) => T1 })): T1;
    }

    abstract class Numeral {
        abstract MatchWith<T1>(pattern: ({ Zero: () => T1, Succ: (rest: Numeral) => T1 })): T1;
    }

    class Succ<T> extends Numeral {
        MatchWith<T1>(pattern: { Zero: () => T1; Succ: (rest: Numeral) => T1; }): T1 {
            return pattern.Succ(this.Rest);
        }

        Rest: Numeral
        constructor(rest: Numeral) {
            super();
            this.Rest = rest;
        }
    }

    class Zero<T> extends Numeral {
        MatchWith<T1>(pattern: { Zero: () => T1; Succ: (rest: Numeral) => T1; }): T1 {
            return pattern.Zero();
        }

    }
    Numeral.prototype.Cata = function <T, T1>(algebra: ({ Zero: () => T1, Succ: (rest: T) => T1 })) {
        return this.MatchWith({
            Zero: () => algebra.Zero(),
            Succ: (rest) => algebra.Succ(rest.Cata(algebra))
        });
    }

    Numeral.prototype.Show = function () {
        return this.MatchWith({
            Zero: () => "0",
            Succ: (r) => `(${r.Show()})`
        });
    }
    Numeral.prototype.Show2 = function () {
        return this.Cata({
            Zero: () => "zero",
            Succ: (r) => `AddOne(${r})`
        });
    }

    var four: Numeral = new Succ(new Succ(new Succ(new Succ(new Zero()))));


    console.log(four.Cata<string>({
        Zero: () => "zero",
        Succ: (r) => `AddOne(${r})`
    }));

    console.log(four.Cata<string>({
        Zero: () => "0",
        Succ: (r) => `(+(${r}) 1)`
    }));

    console.log(four.Cata<number>({
        Zero: () => 0,
        Succ: (r) => r + 1
    }));

    console.log(four.Cata<({ s: number, acc: Array<number> })>({
        Zero: () => ({ s: 0, acc: [0] }),
        Succ: (r) => ({ s: r.s + 1, acc: r.acc.concat([r.s + 1]) })
    }));

    console.log(four.Cata<Numeral>({
        Zero: () => new Zero(),
        Succ: (r) => new Succ(r)
    }));


    var algebraInt: ({ Zero: () => number, Succ: (rest: number) => number }) = ({
        Zero: () => 0,
        Succ: (r) => r + 1
    });

    var algebraString: ({ Zero: () => string, Succ: (rest: string) => string }) = ({
        Zero: () => "zero",
        Succ: (r) => `AddOne(${r})`
    });


    var justExclamationmarks: ({ Zero: () => string, Succ: (rest: string) => string }) = ({
        Zero: () => "",
        Succ: (r) => `!(${r})`
    });


}