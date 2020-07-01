import { Left, Right, Either } from "./Either";
import { Some, None, Maybe } from "./Maybe";

declare global {
    interface Promise<T> {
        map: <T1> (f: (v: T) => T1) => Promise<T1>;
        bind: <T1> (f: (v: T) => Promise<T1>) => Promise<T1>;
        matchWith(pattern: ({
            ok: (v: T) => void,
            error: (v: any) => void
        })): void;

    }
}

Promise.prototype.bind = function <T, T1>(f: (v: T) => Promise<T1>): Promise<T1> {
    return this.then(f)
}

Promise.prototype.map = function <T, T1>(f: (v: T) => T1): Promise<T1> {
    return this.then(f)
}

Promise.prototype.matchWith = function (pattern: ({
    ok: (v: any) => void,
    error: (v: any) => void
})) {
    this.then(pattern.ok)
        .catch(pattern.error);
};

export function demo() {

    type ListPattern<T, T1> = ({
        empty: () => T1,
        cons: (v: T, rest: Array<T>) => T1
    });

    class F {
        public static Show<T>(array: Array<T>) {
            return array.MatchWith({
                empty: () => "Empty",
                cons: (v, r) => `(${v},${this.Show(r)})`
            });
        }

        public static MatchWith<T, T1>(array: Array<T>, pattern: ListPattern<T, T1>) {
            return (array.length == 0) ?
                pattern.empty() :
                pattern.cons(array[0], array.slice(1));
        }

        public static FirstOrNone<T>(array: Array<T>, predicate: (v: T) => boolean): Maybe<T> {
            return F.MatchWith(
                array,
                {
                    empty: () => new None<T>(),
                    cons: (v, r) => predicate(v) ?
                        new Some<T>(v) :
                        this.FirstOrNone(r, predicate)
                });
        }

        public static ToEither<TL, TR>(defualtLeft: TL): (m: Maybe<TR>) => Either<TL, TR> {
            return (maybe: Maybe<TR>): Either<TL, TR> => this.ToEither1(maybe, defualtLeft)
        }
        // public static ToPromise<TL, TR>(defaultReject: TL): (m: Maybe<TR>) => Promise<TR> {
        //     return (maybe: Maybe<TR>): Promise<TR> => this.ToPromise1(maybe, defaultReject)
        // }
        private static ToEither1<TL, TR>(maybe: Maybe<TR>, defaultLeft: TL): Either<TL, TR> {
            return maybe.matchWith<Either<TL, TR>>({
                none: () => new Left<TL, TR>(defaultLeft),
                some: (v: TR) => new Right<TL, TR>(v)
            })
        }

        static ToPromise<TL, TR>(either: Either<TL, TR>): Promise<TR> {
            return new Promise((resolve, reject) => {
                either.matchWith({
                    left: (e) => reject(e),
                    right: (v: TR) => resolve(v)
                })
            })
        }


    }


    var prop = name => o => o[name];
    var pipe = (g, f) => x => f(g(x))

    let validate = client =>
        [
            //    { predicate: c => c.age < 30, description: "age restriction" },
            { predicate: c => c.Name.length === 0, description: "name should not be Empty" }]

            .reduce((validationResult, validation) =>
                validationResult.bind(c =>
                    validation.predicate(c) ?
                        new Left(validation.description) :
                        new Right(c)),
                new Right(client))


    class Client {
        constructor(id: number, name: string, employeeId: number) {
            this.Id = id;
            this.Name = name;
            this.EmployeeId = employeeId;
        }
        Id: number;
        Name: string;
        EmployeeId: number;
    }

    class Employee {
        constructor(id: number, name: string) {
            this.Id = id;
            this.Name = name;
        }
        Id: number;
        Name: string;
    }



    class MockClientRepository {
        GetById(id: number): Promise<Client> {
            let clients: Array<Client> =
                [new Client(1, "", 1),
                new Client(2, "john", 3)];

            var maybeClient: Promise<Client> =
                F.ToPromise<string, Client>(
                    F.ToEither<string, Client>("No client Found")
                        (F.FirstOrNone(clients, c => c.Id == id)));

            return maybeClient;
        }
    }

    class MockEmployeeRepository {
        GetById(id: number): Promise<Employee> {
            let employees: Array<Employee> =
                [new Employee(1, "jane"),
                new Employee(2, "rick")];

            var maybeEmployee: Promise<Employee> =
                F.ToPromise<string, Employee>(
                    F.ToEither<string, Employee>("No Employee Found")
                        (F.FirstOrNone(employees, c => c.Id == id)));

            return maybeEmployee;
        }
    }

    // mockClientRepository
    // .getById(1)
    // .bind(pipe(validate, toPromise))
    // .map(prop("employeeId"))
    // .bind(mockEmployeeRepository.getById)
    // .map(prop("name"))
    // .matchWith({
    //   left: (error) => {
    //     console.log("error:" + error)
    //   },
    //   right: (employee) => {
    //     console.log("employee name:" + employee)
    //   }
    // })

    class SearchService {
        getEmployeeNameForClientWithId(clientId: number) {
            let clientRepository = new MockClientRepository();
            let employeeRepository = new MockEmployeeRepository();
            return clientRepository
                .GetById(clientId)
                .bind(pipe(validate, F.ToPromise))
                .map(prop("EmployeeId"))
                .bind(employeeRepository.GetById)
                .map(prop("Name"))
        }
    }

    // new SearchService()
    //     .getEmployeeNameForClientWithId(1)
    //     .matchWith({
    //         ok: name => console.log("assigned Employee name: " + name),
    //         error: error => console.log("Error " + error)
    //     });
    // .then(name => console.log("assigned Employee name: " + name))
    // .catch(error => console.log("Error " + error))

    validate(new Client(1, "", 1))
        .matchWith({
            right: name => console.log("assigned Employee name: " + name),
            left: error => console.log("Error " + error)
        });

        validate(new Client(1, "r", 1))
        .matchWith({
            right: name => console.log("assigned Employee name: " + name),
            left: error => console.log("Error " + error)
        });

        var t = (c => c.Name.length === 0?"4":"3")({Name:""})

}