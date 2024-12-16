import * as fs from "fs";

interface State {
    pos: number[];
    dir: string;
    cost: number;
}

class Day15Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];

    private map: string[][] = [];

    constructor() {
        this.inputFilePath = "example-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map((line) => line.replace("\r", ""));

        // console.log(this.inputString);

        // Parse the map until we find an empty line
        let mapFinished = false;
        for (const element of this.inputString) {
            if (element === '') {
                mapFinished = true;
                continue;
            }
            if (!mapFinished) {
                this.map.push(element.split(''));
            } else {
                // We've reached the movement instructions
                break;
            }
        }
    }

    // find shortest path in map, obstacles (#) cannote be passed 
    // reindeer can move in 4 directions, starting at S (startingPoint) and should End at Tile E (endingPoint)
    // every vistied tile should be marked with "<, >, ^, v" depending on the direction of the reindeer
    findShortestPath(): number {
        const start = this.findStartingPoint();
        const end = this.findEndingPoint();

        // Priority queue will store states ordered by cost
        const queue: State[] = [];
        // Track visited states (position + direction)
        const visited = new Set<string>();

        // Start facing east
        queue.push({ pos: start, dir: '>', cost: 0 });

        while (queue.length > 0) {
            // Get state with lowest cost
            queue.sort((a, b) => a.cost - b.cost);
            const current = queue.shift()!; // get and remove first element

            const stateKey = `${current.pos[0]},${current.pos[1]},${current.dir}`; // unique key for state (position + direction)
            if (visited.has(stateKey)) continue;
            visited.add(stateKey);

            // Mark path on map
            if (this.map[current.pos[0]][current.pos[1]] !== 'S' &&
                this.map[current.pos[0]][current.pos[1]] !== 'E') {
                this.map[current.pos[0]][current.pos[1]] = current.dir;
            }

            // Check if we reached the end
            if (current.pos[0] === end[0] && current.pos[1] === end[1]) {
                return current.cost;
            }

            // Try moving forward
            const forward = this.getNextPosition(current.pos, current.dir);
            if (forward && this.map[forward[0]][forward[1]] !== '#') {
                queue.push({
                    pos: forward,
                    dir: current.dir,
                    cost: current.cost + 1
                });
            }

            // Try rotating left and right
            const rotations = this.getRotations(current.dir);
            for (const newDir of rotations) {
                const newPos = this.getNextPosition(current.pos, newDir);
                if (newPos && this.map[newPos[0]][newPos[1]] !== '#') {
                    queue.push({
                        pos: newPos,
                        dir: newDir,
                        cost: current.cost + 1001 // 1000 for rotation + 1 for movement
                    });
                }
            }
        }

        return Infinity; // No path found
    }

    private getNextPosition(pos: number[], dir: string): number[] | null {
        const [row, col] = pos;
        switch (dir) {
            case '^': return row > 0 ? [row - 1, col] : null;
            case 'v': return row < this.map.length - 1 ? [row + 1, col] : null;
            case '<': return col > 0 ? [row, col - 1] : null;
            case '>': return col < this.map[0].length - 1 ? [row, col + 1] : null;
            default: return null;
        }
    }

    private getRotations(dir: string): string[] {
        switch (dir) {
            case '^': return ['<', '>'];
            case 'v': return ['<', '>'];
            case '<': return ['^', 'v'];
            case '>': return ['^', 'v'];
            default: return [];
        }
    }

    private findStartingPoint(): number[] {
        let startingPoint: number[] = [];

        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 'S') {
                    startingPoint = [i, j];
                    break;
                }
            }
        }

        return startingPoint;
    }

    private findEndingPoint(): number[] {
        let endingPoint: number[] = [];

        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 'E') {
                    endingPoint = [i, j];
                    break;
                }
            }
        }

        return endingPoint;
    }

    // print current state of map 
    printMap() {
        for (let i = 0; i < this.map.length; i++) {
            console.log(this.map[i].join(''));
        }
    }
}


function main15() {
    const execution = new Day15Execution();
    let resultCosts = execution.findShortestPath();
    console.log(resultCosts);
    execution.printMap();
}

main15();