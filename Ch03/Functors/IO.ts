

export class IO<T>
{
    Fn: () => T;
    constructor(fn: () => T) {
        this.Fn = fn;
    }
    map<T1>(f: (y: T) => T1): IO<T1> {
        return new IO<T1>(() => f(this.Fn()))
    };
    matchWith<T1>(f: (y: T) => T1): T1 {
        return f(this.Fn());
    };
    run<T1>(): T {
        return this.Fn();
    };
}

