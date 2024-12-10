import * as fs from "fs";

class Day11Execution {

    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");

        this.inputString = this.data.split("\n");
        // remove \r elements 
        this.inputString = this.inputString.map((line) => line.replace("\r", ""));

        console.log(this.inputString);
    }
}

function main11() {
    let execution = new Day11Execution();
}

main11();