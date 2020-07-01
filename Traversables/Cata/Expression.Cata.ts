export function demo() {

    type ExprPattern<T, T1> = ({ value: (v: T) => T1, add: (x: Expr<T>, y: Expr<T>) => T1 });
    type ExprAlgebra<T, T1> = ({ value: (v: T) => T1, add: (x: T1, y: T1) => T1 });

    abstract class Expr<T>
    {
        abstract MatchWith<T1>(pattern: ExprPattern<T, T1>): T1;

        Cata<T1>(algebra: ExprAlgebra<T, T1>): T1 {
            return this.MatchWith({
                value: (v) => algebra.value(v),
                add: (x, y) => algebra.add(x.Cata(algebra), y.Cata(algebra))
            });
        }

        Show(): string {
            return this.Cata({
                value: (v) => `(${v})`,
                add: (x, y) => `(${x},${y})`
            });
        }
    }

    class ValExpr<T> extends Expr<T> {
        MatchWith<T1>(pattern: { value: (v: T) => T1; add: (x: Expr<T>, y: Expr<T>) => T1; }): T1 {
            return pattern.value(this.Value);
        }
        Value: T;
        constructor(value: T) {
            super();
            this.Value = value;
        }

    }

    class AddExpr<T> extends Expr<T> {
        X: Expr<T>;
        Y: Expr<T>;
        constructor(x: Expr<T>, y: Expr<T>) {
            super();
            this.X = x;
            this.Y = y;
        }
        MatchWith<T1>(pattern: { value: (v: T) => T1; add: (x: Expr<T>, y: Expr<T>) => T1; }): T1 {
            return pattern.add(this.X, this.Y);
        }
    }

    {
        var expression = new AddExpr(new ValExpr(5), new AddExpr(new ValExpr(1), new ValExpr(2)));
        var addition = expression.Cata<number>({ value: v => v, add: (x, y) => x + y })
        var multiplication = expression.Cata<number>({ value: v => v, add: (x, y) => x * y })

        var htmlExpression = new AddExpr(new ValExpr("jim"), new AddExpr(new ValExpr("john"), new ValExpr("george>")));
        var htmlView = htmlExpression.Cata<string>({
            value: v => `<span>${v}</span>`,
            add: (x, y) => `<ul> <li>${x}</li> <li>${y}</li> </ul>`
        })
    }

    {

        type VariableStore<T> = { [name: string]: T; };
         
        var Eval: (expr: Expr<string>, environment: VariableStore<number>) => number =
            (expr: Expr<string>, environment: VariableStore<number>) => {
                return expr.Cata({
                    value: (v) => environment[v],
                    add: (x, y) => x + y
                });
            }

        var variables: VariableStore<number> = {};

        variables["a1"] = 1;
        variables["a2"] = 2;
        variables["a3"] = 3;

        var expression1: Expr<string> = new AddExpr(new ValExpr("a1"), new AddExpr(new ValExpr("a2"), new ValExpr("a3")));
        var addition1 = Eval(expression1, variables);
    }


}