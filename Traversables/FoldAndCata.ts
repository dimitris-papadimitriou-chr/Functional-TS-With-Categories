export function demo() {


    class Id<T>
    {
        private Value: T

        constructor(value: T) { this.Value = value; }

        map<T1>(f: (y: T) => T1): Id<T1> { return new Id<T1>(f(this.Value)) };

        public static of<T>(v: T) { return new Id<T>(v); }

        cata(alg: (y: T) => void): void { alg(this.Value) };
        //cata<T1>(alg: (y: T) => T1): T1 { return alg(this.Value) };
        fold<TM>(acc: TM, reducer: (v: T, acc: TM) => TM) { return reducer(this.Value, acc); }
    }
    //fold: (accumulator, reducer) => reducer(reducer(accumulator, a), b)
    
    var Pair =<T> (a:T, b:T) => ({ 
        fold<TM>(acc: TM, reducer: (v: T, acc: TM) => TM) { return reducer(b,reducer(a, acc)); }
    });
    
    
    var result  = new Id(3).fold(0,(acc,v)=>acc+v );

    //console.log(new Id(3).Value)    // Instead of this 


}


