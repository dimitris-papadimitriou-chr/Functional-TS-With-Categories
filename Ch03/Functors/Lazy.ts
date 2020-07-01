

export class Lazy<T>
{
    private Value?: T;
    get value(): T {
        if (!this.Value) {
            this.Value = this.Fn();
        }
        return this.Value;
    }

    private Fn: () => T;
    constructor(fn: () => T) {
        this.Fn = fn;
    }

    map<T1>(f: (y: T) => T1): Lazy<T1> {
        return new Lazy<T1>(() => f(this.Fn()))
    };

}

