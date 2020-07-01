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
        // public static ToPromise<TL, TR>(defaultReject: TL): (m: Maybe<TR>) => Promise<TR> {
        //     return (maybe: Maybe<TR>): Promise<TR> => this.ToPromise1(maybe, defaultReject)
        // }
        static ToEither1(maybe, defaultLeft) {
            return maybe.matchWith({
                none: () => new Either_1.Left(defaultLeft),
                some: (v) => new Either_1.Right(v)
            });
        }
        static ToPromise(either) {
            return new Promise((resolve, reject) => {
                either.matchWith({
                    left: (e) => reject(e),
                    right: (v) => resolve(v)
                });
            });
        }
    }
    var prop = name => o => o[name];
    var pipe = (g, f) => x => f(g(x));
    let validate = client => [
        //    { predicate: c => c.age < 30, description: "age restriction" },
        { predicate: c => c.Name.length === 0, description: "name should not be Empty" }
    ]
        .reduce((validationResult, validation) => validationResult.bind(c => validation.predicate(c) ?
        new Either_1.Left(validation.description) :
        new Either_1.Right(c)), new Either_1.Right(client));
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
            let clients = [new Client(1, "", 1),
                new Client(2, "john", 3)];
            var maybeClient = F.ToPromise(F.ToEither("No client Found")(F.FirstOrNone(clients, c => c.Id == id)));
            return maybeClient;
        }
    }
    class MockEmployeeRepository {
        GetById(id) {
            let employees = [new Employee(1, "jane"),
                new Employee(2, "rick")];
            var maybeEmployee = F.ToPromise(F.ToEither("No Employee Found")(F.FirstOrNone(employees, c => c.Id == id)));
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
        getEmployeeNameForClientWithId(clientId) {
            let clientRepository = new MockClientRepository();
            let employeeRepository = new MockEmployeeRepository();
            return clientRepository
                .GetById(clientId)
                .bind(pipe(validate, F.ToPromise))
                .map(prop("EmployeeId"))
                .bind(employeeRepository.GetById)
                .map(prop("Name"));
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
    var t = (c => c.Name.length === 0 ? "4" : "3")({ Name: "" });
}
exports.demo = demo;
//# sourceMappingURL=Either.Promise.Iso.Example.js.map