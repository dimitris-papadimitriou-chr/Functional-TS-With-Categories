"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Maybe_1 = require("./Functors/Maybe");
function demo() {
    class F {
        static MatchWith(array, pattern) {
            return array.length == 0
                ? pattern.empty()
                : pattern.cons(array[0], array.slice(1));
        }
        static FirstOrNone(array, predicate) {
            return F.MatchWith(array, {
                empty: () => new Maybe_1.None(),
                cons: (v, r) => predicate(v) ? new Maybe_1.Some(v) : this.FirstOrNone(r, predicate)
            });
        }
    }
    class Client {
        constructor(id, name) {
            this.Id = id;
            this.Name = name;
        }
    }
    class MockClientRepository {
        GetById(id) {
            return new Promise((resolve, reject) => {
                let clients = [
                    new Client(1, "jim"),
                    new Client(2, "john")
                ];
                var maybeClient = F.FirstOrNone(clients, c => c.Id == id);
                resolve(maybeClient);
            });
        }
    }
    Promise.prototype.map = function (f) {
        return new Promise((resolve, reject) => {
            this.then(x => resolve(f(x))).catch(reject);
        });
    };
    Promise.prototype.MatchWith = function (pattern) {
        this.then(pattern.ok).catch(pattern.error);
    };
    new MockClientRepository()
        .GetById(2)
        .map(x => // this is too ugly and we will refactor
     x.matchWith({
        none: () => "no client found",
        some: client => client.Name
    }))
        .then(x => {
        console.log(`client Name: ${x}`);
    });
}
exports.demo = demo;
//# sourceMappingURL=maybe.example.js.map