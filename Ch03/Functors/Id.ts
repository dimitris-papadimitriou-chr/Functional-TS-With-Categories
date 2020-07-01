

export class Id<T>
{
    Value: T

    constructor(value: T) { this.Value = value; }

    map<T1>(f: (y: T) => T1): Id<T1> { return new Id<T1>(f(this.Value)) };

    apply<T1>(applicative: Id<(v: T) => T1>): Id<T1> { return applicative.map(f => f(this.Value)); };

    public static of<T>(v: T) { return new Id<T>(v); }

    public static ap<T, T1>(applicative: Id<(v: T) => T1>, fa: Id<T>) { return applicative.map(f => f(fa.Value)); }

}