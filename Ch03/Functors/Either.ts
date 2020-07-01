
export abstract class Either<TL, TR> {
    abstract matchWith<TR1>(pattern: {
        left: (v: TL) => TR1;
        right: (v: TR) => TR1;
    }): TR1;
    abstract map<TR1>(f: (v: TR) => TR1): Either<TL, TR1>;
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

var d = new Left<string, number>("invalid operation")
    .map(x => x + 1)
    .matchWith({
        left: v => "error :" + v,
        right: v => v.toString()
    });

 

var d = new Right<string, number>(4)
    .map(x => x + 1)
    .matchWith({
        left: v => "error :" + v,
        right: v => v.toString()
    });

 