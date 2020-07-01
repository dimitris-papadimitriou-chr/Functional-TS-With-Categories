import { Reader } from "./Functors/Reader";


export function demo() {


    class Config {
        constructor(name: string) {
            this.Name = name;
        }
        public Name: string;
    }

    var getName = new Reader<Config, string>((env: Config) => env.Name);

    var mapped: Reader<Config, string> = getName.map(name => `Name:  ${name}`); 
    
    var evaluateWithConfig = mapped.run(new Config("Sql"));

    console.log(evaluateWithConfig)

}