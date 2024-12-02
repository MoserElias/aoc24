const fs1 = require('fs');

class Day1Execution {

    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly lines: string[];

    constructor() { 
        this.inputFilePath = "real-input.txt";
        this.data = fs1.readFileSync(this.inputFilePath, 'utf8');
        this.lines = this.data.trim().split('\n');
    }

    
    parseLines(inputLines: string[]): { leftSide: number[], rightSide: number[] } {
        const leftSide: number[] = [];
        const rightSide: number[] = [];

        inputLines.forEach(line => { // Use this.stringLines instead of lines
            const [left, right] = line.split(/\s+/).map(Number);
            leftSide.push(left);
            rightSide.push(right);
        });

        console.log(leftSide);
        console.log(rightSide);

        return { leftSide, rightSide };
    }

    // sort arrays and build pairs
    sortLeftRight(leftSide: number[], rightSide: number[]): { leftSide: number[], rightSide: number[] } {
        leftSide.sort((a, b) => a - b);
        rightSide.sort((a, b) => a - b);

        return { leftSide, rightSide };
    }

    // calculate the distance between each pair 
    calculateDistance(leftSide: number[], rightSide: number[]): number {
        let distance = 0;

        for (let i = 0; i < leftSide.length; i++) { 
            distance += Math.abs(leftSide[i] - rightSide[i]);
        }

        return distance;
    } 
    
    get getLines(): string[] {
        return this.lines;
    }
}

function main1() {
    const execution = new Day1Execution();
    const { leftSide, rightSide } = execution.parseLines(execution.getLines);
    const sorted = execution.sortLeftRight(leftSide, rightSide); 
    console.log(sorted);

    const distance = execution.calculateDistance(sorted.leftSide, sorted.rightSide);
    console.log('the calculated distance is: ', distance);
}

main1();