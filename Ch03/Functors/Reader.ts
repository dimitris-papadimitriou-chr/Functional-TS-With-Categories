

export class Reader<Env, T>
{
    Fn: (e: Env) => T;
    constructor(fn: (e: Env) => T) {
        this.Fn = fn;
    }
    map<T1>(f: (y: T) => T1): Reader<Env, T1> {
        return new Reader<Env, T1>((env) => f(this.Fn(env)))
    };
    matchWith<T1>(f: (y: T) => T1): (env: Env) => T1 {
        return (env: Env) => f(this.Fn(env));
    };
    run<T1>(env: Env): T {
        return this.Fn(env);
    };
}

