"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    class Client {
        constructor(id, name) {
            this.Id = id;
            this.Name = name;
        }
    }
    class MockClientRepository {
        GetById(id) {
            let clients = [new Client(1, "jim"), new Client(2, "john")];
            var client = clients.find(c => c.Id === id);
            return new Promise((resolve, reject) => {
                if (!client)
                    reject("no client found");
                else
                    resolve(client);
            });
        }
    }
    //This is only for display reasons
    //this is a custom implementation of map. 
    //The Promise.then is behaving like a valid map method.
    Promise.prototype.map = function (f) {
        return new Promise((resolve, reject) => {
            this.then(x => resolve(f(x))).catch(reject);
        });
    };
    new MockClientRepository()
        .GetById(1)
        .map(x => x.Name) //this is the same with .then(x => x.Name)  
        .then(x => console.log(`client Name: ${x}`))
        .catch(x => console.log(`error : ${x}`));
}
exports.demo = demo;
//# sourceMappingURL=promise.examples.js.map