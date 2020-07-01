import { Some, None, Maybe } from "./Maybe";

export function demo() {

    var result = new Some(5).bind(x => new None())

    result.matchWith({
        none: () => console.log("none"),
        some: (v) => console.log(`${v}`)
    })

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
        GetById(id: number): Maybe<Client> {
            let clients: Array<Client> =
                [new Client(1, "jim", 1),
                new Client(2, "john", 1)];
            var maybeClient: Maybe<Client> = F.FirstOrNone(clients, c => c.Id == id);
            return maybeClient;
        }
    }

    class MockEmployeeRepository {
        GetById(id: number): Maybe<Employee> {
            let employees: Array<Employee> =
                [new Employee(1, "jane"),
                new Employee(2, "rick")];
            var maybeEmployee: Maybe<Employee> = F.FirstOrNone(employees, c => c.Id == id);
            return maybeEmployee;
        }
    }

    class SearchService {
        getEmployeeNameForClientWithId(clientId: number) {
            let clientRepository = new MockClientRepository();
            let employeeRepository = new MockEmployeeRepository();
            return clientRepository
                .GetById(clientId)
                .bind(client => employeeRepository.GetById(client.EmployeeId))
                .map(e => e.Name)

        }
    }

    new SearchService()
        .getEmployeeNameForClientWithId(2)
        .matchWith({
            some: name => console.log("assigned Employee name: " + name),
            none: () => console.log("client is not assigned or there was no client ")
        });


}