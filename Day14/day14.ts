import * as fs from "fs";

class Day14Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];

    private readonly maximumX = 100; // 11 tiles wide (0-10)
    private readonly maximumY = 102;  // 7 tiles tall (0-6)

    private currentPositionsRobots: Set<[[number, number], [number, number]]> = new Set();

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.trim().split("\n");

        for (const line of this.inputString) {
            const values = line.split(" ");
            const p = values[0].split("=")[1].split(",");
            const v = values[1].split("=")[1].split(",");

            const pInt: [number, number] = [parseInt(p[0]), parseInt(p[1])];
            const vInt: [number, number] = [parseInt(v[0]), parseInt(v[1])];

            this.currentPositionsRobots.add([pInt, vInt]);
        }
    }

    moveRobots(positionRobots: Set<[[number, number], [number, number]]>): Set<[[number, number], [number, number]]> {
        const newPositionsRobots: Set<[[number, number], [number, number]]> = new Set();

        positionRobots.forEach(([currentPos, velocity]) => {
            let newX = currentPos[0] + velocity[0];
            let newY = currentPos[1] + velocity[1];

            newX = (newX + this.maximumX + 1) % (this.maximumX + 1);
            newY = (newY + this.maximumY + 1) % (this.maximumY + 1);

            newPositionsRobots.add([[newX, newY], velocity]);
        });
        return newPositionsRobots;
    }

    buildRobotsField(currentPositionsRobots: Set<[[number, number], [number, number]]>): string[][] {
        const field: string[][] = Array.from({ length: this.maximumY + 1 }, () =>
            new Array(this.maximumX + 1).fill(".")
        );

        currentPositionsRobots.forEach(([position]) => {
            const [x, y] = position;
            if (x >= 0 && x <= this.maximumX && y >= 0 && y <= this.maximumY) {
                field[y][x] = field[y][x] === "." ? "1" : (parseInt(field[y][x]) + 1).toString();
            }
        });

        // for (let y = 0; y <= this.maximumY; y++) {
        //     let line = "";
        //     for (let x = 0; x <= this.maximumX; x++) {
        //         line += field[y][x];
        //     }
        //     console.log(line);
        // }

        return field;
    }

    buildQuadrant(inputField: string[][]): string[][] {
        const quadrant: string[][] = Array.from({ length: this.maximumY + 1 }, () =>
            new Array(this.maximumX + 1).fill(".")
        );

        // at half of maximumY and maximumY remove those lines  
        for (let y = 0; y <= this.maximumY; y++) {
            for (let x = 0; x <= this.maximumX; x++) {
                if (y != this.maximumY / 2 && x != this.maximumX / 2) {
                    quadrant[y][x] = inputField[y][x];
                }
            }
        }

        // print quadrant
        for (let y = 0; y <= this.maximumY; y++) {
            let line = "";
            for (let x = 0; x <= this.maximumX; x++) {
                line += quadrant[y][x];
            }
            console.log(line);
        }

        return quadrant;
    }

    // multiply robots in quadrant and return sum 
    multiplyRobots(quadrant: string[][]): number {
        let sum = 0;

        let numberOfRobots1Qudrant = 0 as number;
        let numberOfRobots2Qudrant = 0 as number;
        let numberOfRobots3Qudrant = 0 as number;
        let numberOfRobots4Qudrant = 0 as number;

        for (let y = 0; y <= this.maximumY; y++) {
            for (let x = 0; x <= this.maximumX; x++) {
                const value = quadrant[y][x] === '.' ? 0 : parseInt(quadrant[y][x]);
                if (y <= this.maximumY / 2 && x <= this.maximumX / 2) {
                    numberOfRobots1Qudrant += value;
                } else if (y <= this.maximumY / 2 && x > this.maximumX / 2) {
                    numberOfRobots2Qudrant += value;
                } else if (y > this.maximumY / 2 && x <= this.maximumX / 2) {
                    numberOfRobots3Qudrant += value;
                } else if (y > this.maximumY / 2 && x > this.maximumX / 2) {
                    numberOfRobots4Qudrant += value;
                }
            }
        }

        console.log("1st quadrant: " + numberOfRobots1Qudrant);
        console.log("2nd quadrant: " + numberOfRobots2Qudrant);
        console.log("3rd quadrant: " + numberOfRobots3Qudrant);
        console.log("4th quadrant: " + numberOfRobots4Qudrant);

        sum = numberOfRobots1Qudrant * numberOfRobots2Qudrant * numberOfRobots3Qudrant * numberOfRobots4Qudrant;
        return sum;
    }

    getRobots() {
        return this.currentPositionsRobots;
    }
}

function main14() {
    const execution = new Day14Execution();

    let currentPositionRobots = execution.getRobots();
    for (let i = 0; i < 100; i++) {
        currentPositionRobots = execution.moveRobots(currentPositionRobots);
    }

    const quadrant = execution.buildQuadrant(execution.buildRobotsField(currentPositionRobots));

    const result = execution.multiplyRobots(quadrant);
    console.log(result);
}

main14();