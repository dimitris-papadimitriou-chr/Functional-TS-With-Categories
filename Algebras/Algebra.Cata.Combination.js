"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    class Product {
        constructor(x, y) {
            this.X = x;
            this.Y = y;
        }
        MatchWith(pattern) {
            return pattern(this.X, this.Y);
        }
    }
    class CoProduct {
        MatchWith(pattern) { return null; }
        ;
    }
    class Left extends CoProduct {
        constructor(value) {
            super();
            this.Value = value;
        }
        MatchWith(pattern) {
            return pattern.left(this.Value);
        }
    }
    class Right extends CoProduct {
        constructor(value) {
            super();
            this.Value = value;
        }
        MatchWith(pattern) {
            return pattern.right(this.Value);
        }
    }
    var p = new Product(1, 2);
    var t = p.MatchWith((x, y) => x + y);
    class Expression extends CoProduct {
        MatchWith(pattern) {
            return super.MatchWith({
                left: (v) => pattern.left(v),
                right: (p) => pattern.right(p)
            });
        }
    }
    var g = new Left(2);
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
exports.demo = demo;
//# sourceMappingURL=Algebra.Cata.Combination.js.map