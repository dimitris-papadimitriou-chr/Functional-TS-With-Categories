"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    class Expr {
        Cata(algebra) {
            return this.MatchWith({
                value: (v) => algebra.value(v),
                add: (x, y) => algebra.add(x.Cata(algebra), y.Cata(algebra))
            });
        }
        Show() {
            return this.Cata({
                value: (v) => `(${v})`,
                add: (x, y) => `(${x},${y})`
            });
        }
    }
    class ValExpr extends Expr {
        constructor(value) {
            super();
            this.Value = value;
        }
        MatchWith(pattern) {
            return pattern.value(this.Value);
        }
    }
    class AddExpr extends Expr {
        constructor(x, y) {
            super();
            this.X = x;
            this.Y = y;
        }
        MatchWith(pattern) {
            return pattern.add(this.X, this.Y);
        }
    }
    {
        var expression = new AddExpr(new ValExpr(5), new AddExpr(new ValExpr(1), new ValExpr(2)));
        var addition = expression.Cata({ value: v => v, add: (x, y) => x + y });
        var multiplication = expression.Cata({ value: v => v, add: (x, y) => x * y });
        var htmlExpression = new AddExpr(new ValExpr("jim"), new AddExpr(new ValExpr("john"), new ValExpr("george>")));
        var htmlView = htmlExpression.Cata({
            value: v => `<span>${v}</span>`,
            add: (x, y) => `<ul> <li>${x}</li> <li>${y}</li> </ul>`
        });
    }
    {
        var Eval = (expr, environment) => {
            return expr.Cata({
                value: (v) => environment[v],
                add: (x, y) => x + y
            });
        };
        var variables = {};
        variables["a1"] = 1;
        variables["a2"] = 2;
        variables["a3"] = 3;
        var expression1 = new AddExpr(new ValExpr("a1"), new AddExpr(new ValExpr("a2"), new ValExpr("a3")));
        var addition1 = Eval(expression1, variables);
    }
}
exports.demo = demo;
//# sourceMappingURL=Expression.Cata.js.map