

export abstract class Maybe<T>
{
    abstract matchWith<T1>(pattern: ({ none: () => T1, some: (v: T) => T1 })): T1;
    abstract map<T1>(f: (v: T) => T1): Maybe<T1>;
 
}

export class Some<T> extends Maybe<T> {
    Value: T
    constructor(value: T) {
        super();
        this.Value = value;
    }

    map<T1>(f: (v: T) => T1): Maybe<T1> {
        return new Some<T1>(f(this.Value));
    }

    matchWith<T1>(pattern: ({ none: () => T1, some: (v: T) => T1 })): T1 {
        return pattern.some(this.Value);
    }
}

export class None<T> extends Maybe<T> {
    map<T1>(f: (v: T) => T1): Maybe<T1> {
        return new None<T1>();
    }
    matchWith<T1>(pattern: ({ none: () => T1, some: (v: T) => T1 })): T1 {
        return pattern.none();
    } 
}

