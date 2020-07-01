import { IO } from "./Functors/IO";
 
export function demo() {

    var io = new IO<number>(() => 3)
        .map(x => x * x)
        .matchWith(console.log);

}