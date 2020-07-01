/// <reference path="../DataStructures/List.ts" />

import { F } from "../DataStructures/List"

export function demo() {

    console.log(F.Show(F.Zip([1, 2, 3], [6, 7, 8, 7,9,10,11])));//[1,6,2,7,3,8,9,10,11]
    console.log(F.Show(F.Zip([6, 7, 8, 7, 9, 10, 11],[1, 2, 3] )));
    console.log(F.Show(F.Zip([ ], [1, 2, 3])));
    console.log(F.Show(F.ZipMap([1, 2, 3], [6, 7, 8, 7, 9, 10, 11],(a,b)=>[a,b])));
}