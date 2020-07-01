 
export function demo() {

    new Promise<number>((resolve, reject) => { reject(1) })
        .map(x => x + 3)
        .MatchWith({
            ok: x => {
                console.log(`result: ${x}`)
            },
            error: x => {
                console.log(`error: ${x}`)
            },
        })


}






