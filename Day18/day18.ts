import * as fs from "fs";

class Day18Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];

    private visualMemorySpace: string[][] = [];
    private readonly byteSize: number = 70;

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data
            .split("\n")
            .map((line) => line.replace("\r", ""))
            .filter((line) => line.length > 0); // Filter out empty lines
        console.log(this.inputString);

        this.visualMemorySpace = Array.from({ length: this.byteSize + 1 }, () => Array.from({ length: this.byteSize + 1 }, () => "."));
        // console.log(this.visualMemorySpace);    
    }

    // save bytes are marked with . and unsafe bytes are marked with #
    markCorruptedByesInMemorySpace(): string[][] {
        const unsafeBytePos = this.inputString;

        for (const pos of unsafeBytePos) {
            const [xStr, yStr] = pos.split(",");
            const x = parseInt(xStr);
            const y = parseInt(yStr);
            if (!isNaN(x) && !isNaN(y)) { // Check if x and y are valid numbers
                this.visualMemorySpace[y][x] = "#";
            }
        }

        // printing the visual memory space 
        for (const row of this.visualMemorySpace) {
            console.log(row.join(''));
        }

        return this.visualMemorySpace;
    }

    // searches the shortest path to the exit, which is (byteSize, byteSize)   
    // allowed moves are up, down, left, right 
    // obstacles are marked with #, cannot cannot be passed 
    searchShortesPathToExit(): number {
        const queue: { x: number; y: number; steps: number }[] = [];
        const visited: boolean[][] = Array.from({ length: this.byteSize + 1 }, () => Array(this.byteSize + 1).fill(false));

        // Check if starting or exit positions are blocked
        if (this.visualMemorySpace[0][0] === '#' || this.visualMemorySpace[this.byteSize][this.byteSize] === '#') {
            return -1;
        }

        // Starting position
        queue.push({ x: 0, y: 0, steps: 0 });
        visited[0][0] = true;

        const directions = [
            { dx: 0, dy: -1 }, // Up
            { dx: 0, dy: 1 },  // Down
            { dx: -1, dy: 0 }, // Left
            { dx: 1, dy: 0 }   // Right
        ];

        while (queue.length > 0) {
            const { x, y, steps } = queue.shift()!;

            // Check if we've reached the exit
            if (x === this.byteSize && y === this.byteSize) {
                return steps;
            }

            for (const { dx, dy } of directions) {
                const newX = x + dx;
                const newY = y + dy;

                // Check boundaries
                if (newX >= 0 && newX <= this.byteSize && newY >= 0 && newY <= this.byteSize) {
                    // Check if the cell is not visited and not an obstacle
                    if (!visited[newY][newX] && this.visualMemorySpace[newY][newX] !== '#') {
                        visited[newY][newX] = true;
                        queue.push({ x: newX, y: newY, steps: steps + 1 });
                    }
                }
            }
        }

        // If no path is found
        return -1;
    }
}

function main18() {
    const execution = new Day18Execution();
    execution.markCorruptedByesInMemorySpace();
    let result = execution.searchShortesPathToExit();
    console.log(result);
}

main18();