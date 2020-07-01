"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const Id_1 = require("../Ch03/Functors/Id");
function demo() {
    class F {
        static Distribute(array) {
            return array.MatchWith({
                empty: () => new Id_1.Id([]),
                cons: (v, r) => {
                    var a = this.Distribute(r)
                        .apply(new Id_1.Id((u) => (v) => [v, ...u]));
                    var b = v.apply(a);
                    return b;
                }
            });
        }
        static Show(array) {
            return array.MatchWith({
                empty: () => "Empty",
                cons: (v, r) => `(${v},${this.Show(r)})`
            });
        }
    }
    Array.prototype.MatchWith = function (pattern) {
        if (this.length == 0) {
            return pattern.empty();
        }
        else {
            return pattern.cons(this[0], this.slice(1));
        }
    };
    Array.prototype.Traverse = function (f) {
        return this.MatchWith({
            empty: () => new Id_1.Id([]),
            cons: (v, r) => {
                var a = r.Traverse(f)
                    .apply(new Id_1.Id((u) => (v) => [v, ...u]));
                var b = f(v).apply(a);
                return b;
            }
        });
    };
    var add = new Id_1.Id((v) => (u) => v + u);
    var array = [1, 2, 3];
    console.log(F.Show(array));
    var traversed = array.Traverse(x => new Id_1.Id(x + 1));
    var arrayOfId = [new Id_1.Id(1), new Id_1.Id(2), new Id_1.Id(3)];
    var idOfArray = F.Distribute(arrayOfId);
}
exports.demo = demo;
//# sourceMappingURL=List.Traverse.js.map