"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Maybe_1 = require("./Maybe");
function demo() {
    var result = new Maybe_1.Some(5).bind(x => new Maybe_1.None());
    result.matchWith({
        none: () => console.log("none"),
        some: (v) => console.log(`${v}`)
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
                new Client(2, "john", 1)];
            var maybeClient = F.FirstOrNone(clients, c => c.Id == id);
            return maybeClient;
        }
    }
    class MockEmployeeRepository {
        GetById(id) {
            let employees = [new Employee(1, "jane"),
                new Employee(2, "rick")];
            var maybeEmployee = F.FirstOrNone(employees, c => c.Id == id);
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
        some: name => console.log("assigned Employee name: " + name),
        none: () => console.log("client is not assigned or there was no client ")
    });
}
exports.demo = demo;
//# sourceMappingURL=Maybe.Example.js.map