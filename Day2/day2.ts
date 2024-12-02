const fs2 = require('fs');

class Day2Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly lines: string[];

    constructor() {
        this.inputFilePath = "example-input.txt";
        this.data = fs2.readFileSync(this.inputFilePath, 'utf8');
        this.lines = this.data.trim().split('\n'); 
        console.log(this.lines);
    }

    // Add methods to process the lines if needed
}

function main2() {
    const execution = new Day2Execution();
    // Call methods on execution if needed
}

main2();