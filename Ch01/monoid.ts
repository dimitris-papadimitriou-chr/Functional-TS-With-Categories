//1.2	Monoids

export interface monoid<T> {
    empty: T;
    concat: (u: T, v: T) => T
}
 
export const Sum: monoid<number> = ({
    empty: 0,
    concat: (u: number, v: number) => u + v
})

  
export interface IMonoidAcc<T> {
    Identity: T;
    Concat: (v: IMonoidAcc<T>) => IMonoidAcc<T>
}

export class SumAcc implements IMonoidAcc<number> {

    Concat(v: IMonoidAcc<number>): IMonoidAcc<number> {
        return new SumAcc(v.Identity + this.Identity);
    }

    constructor(value: number) {
        this.Identity = value;
    }
    Identity: number = 0;
 }
 