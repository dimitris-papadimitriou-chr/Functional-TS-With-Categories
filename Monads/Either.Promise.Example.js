"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Either_1 = require("./Either");
const Maybe_1 = require("./Maybe");
Promise.prototype.bind = function (f) {
    return this.then(f);
};
Promise.prototype.map = function (f) {
    return this.then(f);
};
Promise.prototype.matchWith = function (pattern) {
    this.then(pattern.ok)
        .catch(pattern.error);
};
function demo() {
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
        static ToPromise(defaultReject) {
            return (maybe) => this.ToPromise1(maybe, defaultReject);
        }
        static ToEither1(maybe, defaultLeft) {
            return maybe.matchWith({
                none: () => new Either_1.Left(defaultLeft),
                some: (v) => new Either_1.Right(v)
            });
        }
        static ToPromise1(maybe, defaultReject) {
            return new Promise((resolve, reject) => {
                maybe.matchWith({
                    none: () => {
                        reject(defaultReject);
                    },
                    some: (v) => {
                        resolve(v);
                    }
                });
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
            var maybeClient = F.ToPromise("No client Found")(F.FirstOrNone(clients, c => c.Id == id));
            return maybeClient;
        }
    }
    class MockEmployeeRepository {
        GetById(id) {
            let employees = [new Employee(1, "jane"),
                new Employee(2, "rick")];
            var maybeEmployee = F.ToPromise("No Employee Found")(F.FirstOrNone(employees, c => c.Id == id));
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
        .getEmployeeNameForClientWithId(1)
        .matchWith({
        ok: name => console.log("assigned Employee name: " + name),
        error: error => console.log("Error " + error)
    });
    // .then(name => console.log("assigned Employee name: " + name))
    // .catch(error => console.log("Error " + error))
}
exports.demo = demo;
//# sourceMappingURL=Either.Promise.Example.js.map