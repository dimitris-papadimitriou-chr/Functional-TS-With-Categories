import { Maybe, None, Some } from "./Functors/Maybe"

declare global {
    interface Promise<T> {
        map: <T1>(f: (v: T) => T1) => Promise<T1>;
        MatchWith(pattern: { ok: (v: T) => void; error: (v: any) => void }): void;
    }
}

export function demo() {
    type ListPattern<T, T1> = {
        empty: () => T1;
        cons: (v: T, rest: Array<T>) => T1;
    };


    class F {
        public static MatchWith<T, T1>(array: Array<T>, pattern: ListPattern<T, T1>) {
            return array.length == 0
                ? pattern.empty()
                : pattern.cons(array[0], array.slice(1));
        }

        public static FirstOrNone<T>(
            array: Array<T>,
            predicate: (v: T) => boolean
        ): Maybe<T> {
            return F.MatchWith(array, {
                empty: () => new None<T>(),
                cons: (v, r) =>
                    predicate(v) ? new Some<T>(v) : this.FirstOrNone(r, predicate)
            });
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

    class MockClientRepository {
        GetById(id: number): Promise<Maybe<Client>> {
            return new Promise<Maybe<Client>>((resolve, reject) => {
                let clients: Array<Client> = [
                    new Client(1, "jim"),
                    new Client(2, "john")
                ];

                var maybeClient: Maybe<Client> = F.FirstOrNone(clients, c => c.Id == id);
                resolve(maybeClient);
            });
        }
    }

    Promise.prototype.map = function <T1>(f: (v: any) => T1) {
        return new Promise<T1>((resolve, reject) => {
            this.then(x => resolve(f(x))).catch(reject);
        });
    };

    Promise.prototype.MatchWith = function (pattern: {
        ok: (v: any) => void;
        error: (v: any) => void;
    }) {
        this.then(pattern.ok).catch(pattern.error);
    };

    new MockClientRepository()
        .GetById(2)
        .map(x =>                                // this is too ugly and we will refactor
            x.matchWith({                        // it when we talk about monad transformers. 
                none: () => "no client found",
                some: client => client.Name
            })
        )
        .then(x => {
            console.log(`client Name: ${x}`);
        });

}