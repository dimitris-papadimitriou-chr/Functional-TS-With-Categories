import { Either, Right, Left } from "../Functors/Either.Applicative";

//import { Id } from "../Functors/Id"
declare global {
    interface Array<T> {
        MatchWith<T1>(pattern: ({ empty: () => T1, cons: (v: T, rest: Array<T>) => T1 })): T1;
        //Traverse<T1>(f: (v: T) => Promise<T1>): Promise<Array<T1>>;
    }
}

type ListPattern<T> = (v: T) => (rest: Array<T>) => Array<T>;

export function demo() {


    class F {
        public static Show<T>(array: Array<T>) {
            return array.MatchWith({
                empty: () => "Empty",
                cons: (v, r) => `(${v},${this.Show(r)})`
            });
        }

        public static ap<TL, TR, TR1>(_this: Either<TL, (v: TR) => TR1>, p1: Either<TL, TR>): Either<TL, TR1> {
            return p1.apply(_this);
        }
        public static of<TL, TR>(x: TR): Either<TL, TR> {
            return new Right<TL, TR>(x);
        }

        public static Traverse<TL, T, TR1>(array: Array<T>, f: (v: T) => Either<TL, TR1>): Either<TL, Array<TR1>> {
            return array.MatchWith({
                empty: () => new Right<TL, Array<TR1>>([]),
                cons: (v, r) => F.ap(F.ap(F.of<TL, ListPattern<TR1>>((v: TR1) => (u: Array<TR1>) => [v, ...u]),
                    f(v)),
                    this.Traverse(r, f))
            });
        }
    }

    Array.prototype.MatchWith = function <T1>(pattern: ({ empty: () => T1, cons: (v: any, rest: Array<any>) => T1 })) {
        if (this.length == 0) {
            return pattern.empty();
        }
        else {
            return pattern.cons(this[0], this.slice(1));
        }
    }

    class Client {
        constructor(id: number, name: string) {

            this.Id = id;
            this.Name = name;
        }
        Id: number;
        Name: string;
    }


    //var clientValidation: Array<(v: Client) => boolean> = [x => x.Name != null, x => x.Id > 0];
    //clientValidation.Traverse(x => F.of(x));
    //gitUserDetailsPromise.MatchWith({
    //    ok: x => {
    //        console.log(`result: ${x}`)
    //    },
    //    error: x => {
    //        console.log(`error: ${x}`)
    //    },
    //})

}