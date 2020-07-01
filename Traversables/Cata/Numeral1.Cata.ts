export function demo() {

    interface Numeral {
        Show(): string;
        Show2(): string;
        Cata<T1>(algebra: ({ Zero: () => T1, Succ: (rest: Numeral) => T1 })): T1;
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
    Numeral.prototype.Cata = function <T1>(algebra: ({ Zero: () => T1, Succ: (rest: Numeral) => T1 })) {
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
            Zero: () => "0",
            Succ: (r) => `(${r})`
        });
    }

   




}