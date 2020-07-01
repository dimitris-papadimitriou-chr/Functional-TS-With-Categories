declare global {
    interface Promise<T> {
        map: <T1>(f: (v: T) => T1) => Promise<T1>;
    }
}

export function demo() {

    class Client {
        constructor(id: number, name: string) {
            this.Id = id;
            this.Name = name;
        }
        Id: number;
        Name: string;
    }

    class MockClientRepository {
        GetById(id: number): Promise<Client> {
            let clients: Array<Client> = [new Client(1, "jim"), new Client(2, "john")];

            var client = clients.find(c => c.Id === id);
            return new Promise<Client>((resolve, reject) => {
                if (!client) reject("no client found");
                else resolve(client);
            });
        }
    }

    //This is only for display reasons
    //this is a custom implementation of map. 
    //The Promise.then is behaving like a valid map method.

    Promise.prototype.map = function <T1>(f: (v: any) => T1) {
        return new Promise<T1>((resolve, reject) => {
            this.then(x => resolve(f(x))).catch(reject);
        });
    };

    new MockClientRepository()
        .GetById(1)
        .map(x => x.Name)    //this is the same with .then(x => x.Name)  
        .then(x => console.log(`client Name: ${x}`))
        .catch(x => console.log(`error : ${x}`));


}