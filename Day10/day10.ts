import * as fs from "fs";

class Day10Execution {

    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];
    private readonly map: number[][];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");

        this.inputString = this.data.split("\n");
        // remove \r elements 
        this.inputString = this.inputString.map((line) => line.replace("\r", ""));

        // map array to trailMap 
        this.map = this.inputString.map((line) => line.split("").map((char) => parseInt(char)));
    }

    // Search trailheads (height 0)
    searchTrailHeads(): Set<string> {
        let positions = new Set<string>();
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 0) {
                    positions.add(`${i},${j}`);
                }
            }
        }
        return positions;
    }

    // Compute the score for a single trailhead
    computeTrailheadScore(i: number, j: number): number {
        let queue: { x: number, y: number, height: number }[] = [];
        let visited = new Set<string>();
        let trailEndsReached = new Set<string>();

        queue.push({ x: i, y: j, height: this.map[i][j] }); // push starting pos to queue
        console.log("queue at start: " + queue);
        visited.add(`${i},${j}`);

        while (queue.length > 0) {
            let { x, y, height: height } = queue.shift()!; // remove first element from queue
            console.log(`Processing position (${x},${y}) with height ${height}`);

            if (height == 9) { // found a trail end
                // Reached a trail end
                trailEndsReached.add(`${x},${y}`);
                continue;   
            }

            let directions = [
                { dx: -1, dy: 0 },
                { dx: 1, dy: 0 },
                { dx: 0, dy: -1 },
                { dx: 0, dy: 1 }
            ];

            for (let dir of directions) {
                let newX = x + dir.dx;
                let newY = y + dir.dy;

                if (newX >= 0 && newX < this.map.length && newY >= 0 && newY < this.map[0].length) {
                    let newHeight = this.map[newX][newY];
                    if (newHeight == height + 1) {
                        let posKey = `${newX},${newY}`;
                        if (!visited.has(posKey)) { // check if position has been visited, if not add to visited and push to queue
                            visited.add(posKey);
                            queue.push({ x: newX, y: newY, height: newHeight }); // push to end of queue
                        }
                    }
                }
            }
        }

        // number of trail ends reached starting from current trailhead 
        return trailEndsReached.size;
    }
}

function main10() {
    let execution = new Day10Execution();
    let posTrailHeads = execution.searchTrailHeads(); // search 0 in the map
    let totalScore = 0;
    posTrailHeads.forEach((position) => { // for every trailhead search a valid trail from 0 to 9
        let [i, j] = position.split(',').map(Number);
        let score = execution.computeTrailheadScore(i, j);
        console.log(`Trailhead at (${i},${j}) has score: ${score}`);
        totalScore += score;
    });
    console.log("Total sum of trailhead scores: " + totalScore);
}

main10();