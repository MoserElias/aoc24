const fs4 = require("fs");

class Day4Execution {

    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly lines: string[];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs4.readFileSync(this.inputFilePath, "utf8");
        this.lines = this.data.trim().split("\n");
    }


    // search obvious pattern "xmas" (horizontally)
    simpleSearchForwad(inputLines: string[]): number {
        let count = 0;
        inputLines.forEach(line => {
            for (let i = 0; i < line.length - 3; i++) {
                if (line[i] === "X" && line[i + 1] === "M" && line[i + 2] === "A" && line[i + 3] === "S") {
                    count++;
                }
            }
        });
        console.log("count simpleSearchForwad " + count);
        return count;
    }

    // search backwards for "xmas" pattern (horizontally)
    simpleSearchBackward(inputLines: string[]): number {
        let count = 0;
        inputLines.forEach(line => {
            for (let i = 0; i < line.length - 3; i++) {
                if (line[i] === "S" && line[i + 1] === "A" && line[i + 2] === "M" && line[i + 3] === "X") {
                    count++;
                }
            }
        });
        console.log("count simpleSearchBackward " + count);
        return count;
    }

    // search forward for "xmas" pattern (vertically) 
    searchVertical(inputLines: string[]): number {
        let count = 0;
        for (let i = 0; i < inputLines[0].length; i++) {
            for (let j = 0; j < inputLines.length - 3; j++) {
                if (inputLines[j][i] === "X" && inputLines[j + 1][i] === "M" && inputLines[j + 2][i] === "A" && inputLines[j + 3][i] === "S") {
                    count++;
                }
            }
        }
        console.log("count searchVertical " + count);
        return count;
    }

    // search backwards for "xmas" pattern (vertically)
    searchVerticalBackwards(inputLines: string[]): number {
        let count = 0;
        for (let i = 0; i < inputLines[0].length; i++) {
            for (let j = 0; j < inputLines.length - 3; j++) {
                if (inputLines[j][i] === "S" && inputLines[j + 1][i] === "A" && inputLines[j + 2][i] === "M" && inputLines[j + 3][i] === "X") {
                    count++;
                }
            }
        }
        console.log("count searchVerticalBackwards " + count);
        return count;
    }

    // search diagonal forward for "xmas" pattern
    searchDiagonal(inputLines: string[]): number {
        let count = 0;
        for (let i = 0; i < inputLines.length - 3; i++) {
            for (let j = 0; j < inputLines[0].length - 3; j++) {
                if (inputLines[i][j] === "X" && inputLines[i + 1][j + 1] === "M" && inputLines[i + 2][j + 2] === "A" && inputLines[i + 3][j + 3] === "S") {
                    count++;
                }
            }
        }
        console.log("count searchDiagonal " + count);
        return count;
    }

    // search diagonal backwards for "xmas" pattern
    searchDiagonalBackwards(inputLines: string[]): number {
        let count = 0;
        for (let i = 0; i < inputLines.length - 3; i++) {
            for (let j = 0; j < inputLines[0].length - 3; j++) {
                if (inputLines[i][j] === "S" && inputLines[i + 1][j + 1] === "A" && inputLines[i + 2][j + 2] === "M" && inputLines[i + 3][j + 3] === "X") {
                    count++;
                }
            }
        }
        console.log("count searchDiagonalBackwards " + count);
        return count;
    }


    // Additional method to search anti-diagonally forward
    searchAntiDiagonal(inputLines: string[]): number {
        let count = 0;
        const numRows = inputLines.length;
        const numCols = inputLines[0].length;
        for (let row = 0; row <= numRows - 4; row++) {
            for (let col = 3; col < numCols; col++) {
                if (inputLines[row][col] === "X" && inputLines[row + 1][col - 1] === "M" && inputLines[row + 2][col - 2] === "A" && inputLines[row + 3][col - 3] === "S") {
                    count++;
                }
            }
        }
        console.log("count searchAntiDiagonal " + count);
        return count;
    }

    // Additional method to search anti-diagonally backward
    searchAntiDiagonalBackward(inputLines: string[]): number {
        let count = 0;
        const numRows = inputLines.length;
        const numCols = inputLines[0].length;
        for (let row = 0; row <= numRows - 4; row++) {
            for (let col = 3; col < numCols; col++) {
                if (inputLines[row][col] === "S" && inputLines[row + 1][col - 1] === "A" && inputLines[row + 2][col - 2] === "M" && inputLines[row + 3][col - 3] === "X") {
                    count++;
                }
            }
        }
        console.log("count searchAntiDiagonalBackward " + count);
        return count;
    }


    getLines(): string[] {
        return this.lines;
    }

}

function main4() {
    const execution = new Day4Execution();
    const result = execution.simpleSearchForwad(execution.getLines()) + execution.simpleSearchBackward(execution.getLines())
        + execution.searchVertical(execution.getLines()) + execution.searchVerticalBackwards(execution.getLines())
        + execution.searchDiagonal(execution.getLines()) + execution.searchDiagonalBackwards(execution.getLines()) 
        + execution.searchAntiDiagonal(execution.getLines()) + execution.searchAntiDiagonalBackward(execution.getLines());
    console.log(result);
}

main4();