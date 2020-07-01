"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    class VariablesContext {
        constructor(variables) {
            this.Variables = variables;
        }
    }
    class Expr {
        Show() {
            if (this instanceof ValExpr)
                return `${this.Value}`;
            if (this instanceof AddExpr)
                return `(${this.X.Show()},${this.Y.Show()})`;
        }
    }
    class ValExpr extends Expr {
        constructor(value) {
            super();
            this.Value = value;
        }
        Eval(context) {
            context.Accumulation += `${this.Value}`;
        }
    }
    class AddExpr extends Expr {
        constructor(x, y) {
            super();
            this.X = x;
            this.Y = y;
        }
        Eval(context) {
            context.Accumulation += `(`;
            this.X.Eval(context);
            context.Accumulation += `,`;
            this.Y.Eval(context);
            context.Accumulation += `)`;
        }
    }
    {
        var expression = new AddExpr(new ValExpr(5), new AddExpr(new ValExpr(1), new ValExpr(2)));
        var s = expression.Show();
        var context = ({ Accumulation: `` });
        expression.Eval(context);
        //var addition = expression.Cata<number>({ value: v => v, add: (x, y) => x + y })
        //var multiplication = expression.Cata<number>({ value: v => v, add: (x, y) => x * y })
        //var htmlExpression = new AddExpr(new ValExpr("jim"), new AddExpr(new ValExpr("john"), new ValExpr("george>")));
        //var htmlView = htmlExpression.Cata<string>({
        //    value: v => `<span>${v}</span>`,
        //    add: (x, y) => `<ul> <li>${x}</li> <li>${y}</li> </ul>`
        //})
    }
    {
        //var Eval: (expr: Expr<string>, environment: VariableStore<number>) => number =
        //    (expr: Expr<string>, environment: VariableStore<number>) => {
        //        return expr.Cata({
        //            value: (v) => environment[v],
        //            add: (x, y) => x + y
        //        });
        //    }
        //var variables: VariableStore<number> = {};
        //variables["a1"] = 1;
        //variables["a2"] = 2;
        //variables["a3"] = 3;
        var expression1 = new AddExpr(new ValExpr("a1"), new AddExpr(new ValExpr("a2"), new ValExpr("a3")));
        // var addition1 = Eval(expression1, variables);
    }
}
exports.demo = demo;
//# sourceMappingURL=Expression.InterpreterPattern.js.map