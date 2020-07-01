export function demo() {

    type VariableStore<T> = { [name: string]: T; };
    interface Context<T> { Accumulation: string; }

    class VariablesContext<T> implements Context<T> {
        Variables: VariableStore<T>
        Accumulation: string; 
        constructor(variables: VariableStore<T>) {
            this.Variables = variables;
        }
    }

    abstract class Expr<T>
    {
        Show(): string {
            if (this instanceof ValExpr)
                return `${(this as ValExpr<T>).Value}`
            if (this instanceof AddExpr)
                return `(${(this as AddExpr<T>).X.Show()},${(this as AddExpr<T>).Y.Show()})`
        }
        abstract Eval(context: Context<T>)
    }

    class ValExpr<T> extends Expr<T> {
        Eval(context: Context<T>) {
            context.Accumulation += `${this.Value}`
        }
        Value: T;
        constructor(value: T) {
            super();
            this.Value = value;
        }
    }

    class AddExpr<T> extends Expr<T> {

        Eval(context: Context<T>) {
            context.Accumulation += `(`
            this.X.Eval(context);
            context.Accumulation += `,`
            this.Y.Eval(context);
            context.Accumulation += `)` 
        }

        X: Expr<T>;
        Y: Expr<T>;
        constructor(x: Expr<T>, y: Expr<T>) {
            super();
            this.X = x;
            this.Y = y;
        }
    }

    {
        var expression = new AddExpr(new ValExpr(5), new AddExpr(new ValExpr(1), new ValExpr(2)));

        var s = expression.Show();
        var context = ({ Accumulation: `` })
        expression.Eval(context)
        //var addition = expression.Cata<number>({ value: v => v, add: (x, y) => x + y })
        //var multiplication = expression.Cata<number>({ value: v => v, add: (x, y) => x * y })

        //var htmlExpression = new AddExpr(new ValExpr("jim"), new AddExpr(new ValExpr("john"), new ValExpr("george>")));
        //var htmlView = htmlExpression.Cata<string>({
        //    value: v => `<span>${v}</span>`,
        //    add: (x, y) => `<ul> <li>${x}</li> <li>${y}</li> </ul>`
        //})
    }

    {

        type VariableStore<T> = { [name: string]: T; };

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

        var expression1: Expr<string> = new AddExpr(new ValExpr("a1"), new AddExpr(new ValExpr("a2"), new ValExpr("a3")));
        // var addition1 = Eval(expression1, variables);
    }


}