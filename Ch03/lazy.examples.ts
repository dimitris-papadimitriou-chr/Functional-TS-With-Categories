import { Lazy } from "./Functors/Lazy";


export function demo() {

    var lazy = new Lazy(() => 3);
    console.log(lazy.value)  //if we use value then the calculation is performed and cached 
    console.log(lazy.value) //we use the cached result or memoized as usualy called in FP 

    var lazy = new Lazy(() => 3).map(x => x * x);
    console.log(lazy.value)
 
}