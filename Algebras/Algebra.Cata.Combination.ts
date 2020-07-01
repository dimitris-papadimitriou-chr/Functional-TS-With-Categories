

export function demo() {

    type CoProductPattern<L, R, T1> = ({ left: (v: L) => T1, right: (x: R) => T1 });

    type ProductPattern<L, R, T1> = (v: L, x: R) => T1;

    class Product<L, R>
    {
        MatchWith<T1>(pattern: ProductPattern<L, R, T1>): T1 {
            return pattern(this.X, this.Y);
        }

        X: L;
        Y: R;
        constructor(x: L, y: R) {
            this.X = x;
            this.Y = y;
        }
    }

    class CoProduct<L, R>
    {
        MatchWith<T1>(pattern: CoProductPattern<L, R, T1>): T1 { return null; };
    }

    class Left<L, R> extends CoProduct<L, R> {
        MatchWith<T1>(pattern: { left: (v: L) => T1; right: (x: R) => T1; }): T1 {
            return pattern.left(this.Value);
        }

        Value: L;
        constructor(value: L) {
            super();
            this.Value = value;
        }
    }

    class Right<L, R> extends CoProduct<L, R> {
        MatchWith<T1>(pattern: { left: (v: L) => T1; right: (x: R) => T1; }): T1 {
            return pattern.right(this.Value);
        }
        Value: R;
        constructor(value: R) {
            super();
            this.Value = value;
        }
    }

    var p = new Product<number, number>(1, 2);
    var t = p.MatchWith((x, y) => x + y);

    class Expression<T> extends CoProduct<T, Product<Expression<T>, Expression<T>>>{
        MatchWith<T1>(pattern: { left: (v: T) => T1; right: (x: Product<Expression<T>, Expression<T>>) => T1; }): T1 {
            return super.MatchWith({
                left: (v: T) => pattern.left(v),
                right: (p: Product<Expression<T>, Expression<T>>) =>pattern.right(p)
            });
        }
    }
    var g: Expression<number> = new Left<number, Product<Expression<number>, Expression<number>>>(2);
    //var y = g.MatchWith()
    //var expression = new ex(new ValExpr(5), new AddExpr(new ValExpr(1), new ValExpr(2)));
    //var addition = expression.Cata<number>({ value: v => v, add: (x, y) => x + y })
    //var multiplication = expression.Cata<number>({ value: v => v, add: (x, y) => x * y })

    //var htmlExpression = new AddExpr(new ValExpr("jim"), new AddExpr(new ValExpr("john"), new ValExpr("george>")));
    //var htmlView = htmlExpression.Cata<string>({
    //    value: v => `<span>${v}</span>`,
    //    add: (x, y) => `<ul> <li>${x}</li> <li>${y}</li> </ul>`
    //})
}