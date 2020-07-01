import { Left, Right, Either } from "./Either";
import { Some, None, Maybe } from "./Maybe";

export function demo() {

    var d = new Left<string, number>("Error A")
        .map(x => x + 1)
        .bind(x => new Left<string, number>("Error B"))
        .matchWith({
            left: v => "error :" + v,
            right: v => v.toString()
        });


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

        private static ToEither1<TL, TR>(maybe: Maybe<TR>, defaultLeft: TL): Either<TL, TR> {
            return maybe.matchWith<Either<TL, TR>>({
                none: () => new Left<TL, TR>(defaultLeft),
                some: (v: TR) => new Right<TL, TR>(v)
            })
        }

    }

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
        GetById(id: number): Client {
            let clients: Array<Client> =
                [new Client(1, "jim", 1),
                new Client(2, "john", 3)];
            var maybeClient: Client = clients.find(c => c.Id == id);

            if (!maybeClient)
                throw "No client Found";

            return maybeClient;
        }
    }

    class MockEmployeeRepository {
        GetById(id: number): Employee {
            let employees: Array<Employee> =
                [new Employee(1, "jane"),
                new Employee(2, "rick")];

            var maybeEmployee: Employee = employees.find(c => c.Id == id);

            if (!maybeEmployee)
                throw "No Employee Found";

            return maybeEmployee;
        }
    }

    class SearchService {
        getEmployeeNameForClientWithId(clientId: number) {
            let clientRepository = new MockClientRepository();
            let employeeRepository = new MockEmployeeRepository();
            var client = clientRepository.GetById(clientId);
            var employee = employeeRepository.GetById(client.EmployeeId)
            return employee.Name;

        }
    }

    try {
        var employeeName = new SearchService()
            .getEmployeeNameForClientWithId(1)
        console.log("assigned Employee name: " + employeeName)
    } catch (error) {
        console.log("Error " + error)
    }



}