import * as fs from "fs";

class Region {
    cells: Set<string> = new Set();
    perimeter: number = 0; 

    getCells(): string[] {
        return Array.from(this.cells);
    }
}
 
class Day12Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];
    private readonly plantMap: string[][] = [];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map((line) => line.replace("\r", ""));
        this.inputString.forEach(element => {
            this.plantMap.push(element.split(""));
        });
    }

    private getKey(row: number, col: number): string {
        return `${row},${col}`;
    }

    private findRegions(char: string): Region[] {
        let regions: Region[] = [];
        let processed = new Set<string>();

        for (let row = 0; row < this.plantMap.length; row++) {
            for (let col = 0; col < this.plantMap[row].length; col++) {
                if (this.plantMap[row][col] === char && !processed.has(this.getKey(row, col))) {
                    let region = new Region();
                    let toProcess = [[row, col]];

                    while (toProcess.length > 0) {
                        let [r, c] = toProcess.pop()!;
                        let key = this.getKey(r, c);

                        if (processed.has(key)) continue;
                        processed.add(key);
                        region.cells.add(key);

                        // Check neighbors
                        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dr, dc]) => {
                            let nr = r + dr, nc = c + dc;
                            if (nr >= 0 && nr < this.plantMap.length &&
                                nc >= 0 && nc < this.plantMap[0].length &&
                                this.plantMap[nr][nc] === char) {
                                toProcess.push([nr, nc]);
                            }
                        });
                    }
                    regions.push(region);
                }
            }
        }
        return regions;
    }

    calculatePlantCosts(): number {
        let totalCosts = 0;

        for (let i = 0; i < 26; i++) {
            let char = String.fromCharCode(65 + i);
            let regions = this.findRegions(char);

            for (let region of regions) {
                let area = region.cells.size;
                let perimeter = 0;

                for (let cell of region.getCells()) {
                    let [row, col] = cell.split(',').map(Number);
                    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dr, dc]) => {
                        let nr = row + dr, nc = col + dc;
                        if (nr < 0 || nr >= this.plantMap.length ||
                            nc < 0 || nc >= this.plantMap[0].length ||
                            this.plantMap[nr][nc] !== char) {
                            perimeter++;
                        }
                    });
                }

                totalCosts += area * perimeter;
            }
        }

        return totalCosts;
    }
}

function main12() {
    let execution = new Day12Execution();
    let result = execution.calculatePlantCosts();
    console.log(result);
}

main12();