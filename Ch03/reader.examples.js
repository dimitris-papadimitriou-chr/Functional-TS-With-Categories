"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Reader_1 = require("./Functors/Reader");
function demo() {
    class Config {
        constructor(name) {
            this.Name = name;
        }
    }
    var getName = new Reader_1.Reader((env) => env.Name);
    var mapped = getName.map(name => `Name:  ${name}`);
    var evaluateWithConfig = mapped.run(new Config("Sql"));
    console.log(evaluateWithConfig);
}
exports.demo = demo;
//# sourceMappingURL=reader.examples.js.map