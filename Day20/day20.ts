import * as fs from "fs";

class Day20Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];
    private readonly mapRacetrack: string[][] = [];

    private readonly startPosition: number[] = [];
    private readonly endPosition: number[] = [];

    private distStart: number[][] = [];
    private distEnd: number[][] = [];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");

        // Parse input
        this.inputString = this.data
            .split("\n")
            .map((line) => line.replace("\r", ""));

        // Convert each line to a row of characters
        for (const element of this.inputString) {
            const line = element.trim();
            if (line.length > 0) {
                this.mapRacetrack.push(line.split(""));
            }
        }
        console.log(this.mapRacetrack);

        // Find start/end
        for (let i = 0; i < this.mapRacetrack.length; i++) {
            for (let j = 0; j < this.mapRacetrack[i].length; j++) {
                if (this.mapRacetrack[i][j] === "S") {
                    this.startPosition.push(i, j);
                }
                if (this.mapRacetrack[i][j] === "E") {
                    this.endPosition.push(i, j);
                }
            }
        }

        // Precompute distances from start and from end
        this.distStart = this.buildDistanceMap(this.startPosition[0], this.startPosition[1]); 
        this.distEnd = this.buildDistanceMap(this.endPosition[0], this.endPosition[1]); 
    }

    private buildDistanceMap(rowStart: number, colStart: number): number[][] {
        const rows = this.mapRacetrack.length;
        const cols = this.mapRacetrack[0].length;
        const distMap = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
        const queue: [number, number, number][] = [[rowStart, colStart, 0]];
        distMap[rowStart][colStart] = 0;

        while (queue.length > 0) {
            const [row, col, steps] = queue.shift()!;
            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

            for (const [dx, dy] of directions) {
                const newRow = row + dx;
                const newCol = col + dy;
                if (this.isValidMove(newRow, newCol) && distMap[newRow][newCol] > steps + 1) {
                    distMap[newRow][newCol] = steps + 1;
                    queue.push([newRow, newCol, steps + 1]);
                }
            }
        }
        return distMap;
    }

    private findCheatingPaths(): Map<number, number> {
        const savings = new Map<number, number>();
        const normalTime = this.distStart[this.endPosition[0]][this.endPosition[1]];

        // Loop through every possible cheat start
        for (let startRow = 0; startRow < this.mapRacetrack.length; startRow++) {
            for (let startCol = 0; startCol < this.mapRacetrack[0].length; startCol++) {
                if (this.mapRacetrack[startRow][startCol] === "#") continue;

                // Check every possible cheat end within 2 steps
                for (let endRow = startRow - 2; endRow <= startRow + 2; endRow++) {
                    for (let endCol = startCol - 2; endCol <= startCol + 2; endCol++) {
                        if (!this.isInBounds(endRow, endCol)) continue;
                        if (this.mapRacetrack[endRow][endCol] === "#") continue;

                        const cheatDist = Math.abs(endRow - startRow) + Math.abs(endCol - startCol);
                        if (cheatDist > 2) continue;

                        const timeToCheatStart = this.distStart[startRow][startCol];
                        const timeFromCheatEnd = this.distEnd[endRow][endCol];

                        // If the path from start → cheatStart or cheatEnd → end is unreachable, skip
                        if (timeToCheatStart === Infinity || timeFromCheatEnd === Infinity) continue;

                        // Calculate time with cheat
                        const timeWithCheat = timeToCheatStart + cheatDist + timeFromCheatEnd;
                        if (timeWithCheat < normalTime) {
                            const saved = normalTime - timeWithCheat;
                            savings.set(saved, (savings.get(saved) || 0) + 1);
                        }
                    }
                }
            }
        }
        return savings;
    }

    private isValidMove(row: number, col: number): boolean {
        return this.isInBounds(row, col) && this.mapRacetrack[row][col] !== "#";
    }

    private isInBounds(row: number, col: number): boolean {
        return (
            row >= 0 &&
            row < this.mapRacetrack.length &&
            col >= 0 &&
            col < this.mapRacetrack[0].length
        );
    }

    public solve(): number {
        const savings = this.findCheatingPaths();
        let count = 0;
        savings.forEach((value, key) => {
            if (key >= 100) count += value;
        });
        return count;
    }
}

function main20() {
    const execution = new Day20Execution();
    console.log(`Cheats saving ≥100 picoseconds: ${execution.solve()}`);
}

main20();