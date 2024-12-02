const fs = require('fs');

class Day2Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly lines: string[]; 

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, 'utf8');
        this.lines = this.data.trim().split('\n'); 
    }

    buildDifferenceArray(inputLines: string[]): number[][] {
        let differenceArray: number[][] = [];
        inputLines.forEach(line => {
            let lineNumberArray = this.convertInputLine(line);
            let lineDifferenceArray: number[] = [];

            // calculate the difference between each next num and push to lineDifferenceArray
            for (let index = 0; index < lineNumberArray.length - 1; index++) {
                let num = lineNumberArray[index];
                let num1 = lineNumberArray[index + 1];
                let difference = num1 - num; // Use actual difference to detect increasing or decreasing
                lineDifferenceArray.push(difference);
            }

            differenceArray.push(lineDifferenceArray);
        });
        return differenceArray;
    }

    checkReports(differenceArray: number[][]): number {
        let safeReports = 0;
        for (const differences of differenceArray) {
            let foundUnsafe = false;
            let isIncreasing: boolean | null = null;

            for (const element of differences) {
                let diff = element;

                // Check if difference is between -3 and -1 (decreasing) or 1 and 3 (increasing)
                if (diff >= -3 && diff <= -1) { // decreasing 
                    if (isIncreasing === null) {
                        isIncreasing = false;
                    } else if (isIncreasing) {
                        foundUnsafe = true;
                        break;
                    }
                } else if (diff >= 1 && diff <= 3) { // increasing
                    if (isIncreasing === null) {
                        isIncreasing = true;
                    } else if (!isIncreasing) {
                        foundUnsafe = true;
                        break;
                    }
                } else {
                    foundUnsafe = true;
                    break;
                }
            }
            if (!foundUnsafe) {
                safeReports++;
            }
        }
        return safeReports;
    }

    convertInputLine(inputLine: string): number[] {
        return inputLine.split(' ').map(Number);
    }

    get getLines(): string[] {
        return this.lines;
    }
}

function main2() {
    const execution = new Day2Execution();
    const differenceArray = execution.buildDifferenceArray(execution.getLines);
    const safeReportCount = execution.checkReports(differenceArray);
    console.log("Number of safe reports:", safeReportCount);
}

main2();