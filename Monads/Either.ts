
export abstract class Either<TL, TR> {
    abstract matchWith<TR1>(pattern: {
        left: (v: TL) => TR1;
        right: (v: TR) => TR1;
    }): TR1;
    abstract map<TR1>(f: (v: TR) => TR1): Either<TL, TR1>;

    bind<TR1>(f: (v: TR) => Either<TL, TR1>): Either<TL, TR1> {
        return this.matchWith({
            left: (v: TL) => new Left<TL, TR1>(v),
            right: (v: TR) => f(v)
        })
    }
}

export class Right<TL, TR> extends Either<TL, TR> {
    Value: TR;
    constructor(value: TR) {
        super();
        this.Value = value;
    }

    map<TR1>(f: (v: TR) => TR1): Either<TL, TR1> {
        return new Right<TL, TR1>(f(this.Value));
    }

    matchWith<TR1>(pattern: {
        left: (v: TL) => TR1;
        right: (v: TR) => TR1;
    }): TR1 {
        return pattern.right(this.Value);
    }
}

export class Left<TL, TR> extends Either<TL, TR> {
    Value: TL;
    constructor(value: TL) {
        super();
        this.Value = value;
    }

    map<TR1>(f: (v: TR) => TR1): Either<TL, TR1> {
        return new Left<TL, TR1>(this.Value);
    }
    matchWith<TR1>(pattern: {
        left: (v: TL) => TR1;
        right: (v: TR) => TR1;
    }): TR1 {
        return pattern.left(this.Value);
    }
}


