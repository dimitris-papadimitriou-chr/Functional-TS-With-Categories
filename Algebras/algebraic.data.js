"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
function demo() {
    class Coproduct {
    }
    class A extends Coproduct {
        constructor() {
            super();
        }
    }
    class B extends Coproduct {
        constructor() {
            super();
        }
    }
    var AorB = new A();
    var AorB = new B();
    //type Union<TA, TB> = { A: TA, B: TB }
    class Product {
    }
    function f(p) { }
    // var t = f({ A: 1, B: 1, C: 3 });
    //interface Union<TA, TB> { A: TA, B: TB }
    //function f<TA, TB, TC>(p: { A: TA, B: TB }) { }
    //var t = f({ A: 1, B: 2, C: 4 });
    //class Product<TA, TB> {
    //    A: TA
    //    B: TB
    //    constructor(a: TA, b: TB) {
    //        this.A = a;
    //        this.B = b;
    //    }
    //}
    //{
    //    var productClass: <TA, TB>  (A: TA, B: TB) => Product<TA, TB> = (A, B) => new Product(A, B);
    //    var first: <TA, TB>  (p: Product<TA, TB>) => TA = (product) => product.A;
    //    var second: <TA, TB>  (p: Product<TA, TB>) => TB = (product) => product.B;
    //    var t = first<number, number>({ A: 1, B: 2 })
    //}
    //{
    //    var productLiteral: <TA, TB>  (A: TA, B: TB) => ({ A: TA, B: TB }) = (A, B) => ({ A, B });
    //    var first: <TA, TB>  (p: { A: TA, B: TB }) => TA = (product) => product.A;
    //    var second: <TA, TB>  (p: { A: TA, B: TB }) => TB = (product) => product.B;
    //}
    //{
    //    var productTuples: <TA, TB>  (A: TA, B: TB) => [TA, TB] = (A, B) => [A, B];
    //    var first: <TA, TB>  (p: [TA, TB]) => TA = (product) => product[0];
    //    var second: <TA, TB>  (p: [TA, TB]) => TB = (product) => product[1];
    //}
    ////function f1<TA, TB>(A: TA, B: TB) { }
    ////function f2<TA, TB>(product: Product<TA, TB>) { }
    ////function f3<TA, TB>(product: { A: TA, B: TB }) { }
    ////function f4<TA, TB>(product: [TA, TB]) { }
    //function f2<TA, TB>(product: Product<TA, TB>) { }
    //f2<number, number>(new Product<number, number>(1, 2))
    //f2({ A: 1, B: 2 })// no error by the compiler . then naming of the properties must agree
    //f2({ A: 1, C: 2 })
    ////function f<TA, TB>(product: { A: TA, B: TB }) { }
    ////f(new Product<number, number>(1, 2)) 
    ////function f1<TA, TB>(A: TA, B: TB) { }
}
exports.demo = demo;
//# sourceMappingURL=algebraic.data.js.map