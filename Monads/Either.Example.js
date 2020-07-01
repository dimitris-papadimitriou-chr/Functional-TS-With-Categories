"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Either_1 = require("./Either");
const Maybe_1 = require("./Maybe");
function demo() {
    var d = new Either_1.Left("Error A")
        .map(x => x + 1)
        .bind(x => new Either_1.Left("Error B"))
        .matchWith({
        left: v => "error :" + v,
        right: v => v.toString()
    });
    class F {
        static Show(array) {
            return array.MatchWith({
                empty: () => "Empty",
                cons: (v, r) => `(${v},${this.Show(r)})`
            });
        }
        static MatchWith(array, pattern) {
            return (array.length == 0) ?
                pattern.empty() :
                pattern.cons(array[0], array.slice(1));
        }
        static FirstOrNone(array, predicate) {
            return F.MatchWith(array, {
                empty: () => new Maybe_1.None(),
                cons: (v, r) => predicate(v) ?
                    new Maybe_1.Some(v) :
                    this.FirstOrNone(r, predicate)
            });
        }
        static ToEither(defualtLeft) {
            return (maybe) => this.ToEither1(maybe, defualtLeft);
        }
        static ToEither1(maybe, defaultLeft) {
            return maybe.matchWith({
                none: () => new Either_1.Left(defaultLeft),
                some: (v) => new Either_1.Right(v)
            });
        }
    }
    class Client {
        constructor(id, name, employeeId) {
            this.Id = id;
            this.Name = name;
            this.EmployeeId = employeeId;
        }
    }
    class Employee {
        constructor(id, name) {
            this.Id = id;
            this.Name = name;
        }
    }
    class MockClientRepository {
        GetById(id) {
            let clients = [new Client(1, "jim", 1),
                new Client(2, "john", 3)];
            var maybeClient = F.ToEither("No client Found")(F.FirstOrNone(clients, c => c.Id == id));
            return maybeClient;
        }
    }
    class MockEmployeeRepository {
        GetById(id) {
            let employees = [new Employee(1, "jane"),
                new Employee(2, "rick")];
            var maybeEmployee = F.ToEither("No Employee Found")(F.FirstOrNone(employees, c => c.Id == id));
            return maybeEmployee;
        }
    }
    class SearchService {
        getEmployeeNameForClientWithId(clientId) {
            let clientRepository = new MockClientRepository();
            let employeeRepository = new MockEmployeeRepository();
            return clientRepository
                .GetById(clientId)
                .bind(client => employeeRepository.GetById(client.EmployeeId))
                .map(e => e.Name);
        }
    }
    new SearchService()
        .getEmployeeNameForClientWithId(2)
        .matchWith({
        right: name => console.log("assigned Employee name: " + name),
        left: error => console.log("Error " + error)
    });
}
exports.demo = demo;
//# sourceMappingURL=Either.Example.js.map