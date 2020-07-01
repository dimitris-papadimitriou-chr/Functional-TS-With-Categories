
import { monoid, IMonoidAcc, Sum, SumAcc } from "./monoid";


export function demo() {


    var total1:number = Sum.concat(Sum.empty, Sum.concat(3, 4));

    //reduce example
    var total: number = [1, 3, 4, 5].reduce(Sum.concat, Sum.empty);
 

    var sum: IMonoidAcc<number> = new SumAcc(0)
        .Concat(new SumAcc(1))
        .Concat(new SumAcc(2))
        .Concat(new SumAcc(3));
}