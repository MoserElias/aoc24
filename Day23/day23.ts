import * as fs from "fs";

class Day22Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[] = [];

    private computers: Set<string[]> = new Set();

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");

        this.inputString = this.data
            .split("\n")
            .map((line) => line.trim().replace("\r", ""))
            .filter(line => line.length > 0);

        for (const pair of this.inputString) {
            const computersPair = pair.split("-");
            this.computers.add(computersPair);
        }

        console.log(this.computers);
        this.solvePuzzle(this.computers);
    }

    // search interconnected computers (3 way) 
    // computer A is connected to computer B1 and A to B2 and B1 and B2 are also connected 
    private solvePuzzle(lanConnections: Set<string[]>): Set<string> {
        const adjacency = new Map<string, Set<string>>();
        lanConnections.forEach(([a, b]) => {
            if (!adjacency.has(a)) adjacency.set(a, new Set());
            if (!adjacency.has(b)) adjacency.set(b, new Set());
            adjacency.get(a)!.add(b);
            adjacency.get(b)!.add(a);
        });


        const threeWayConnections = new Set<string>();

        adjacency.forEach((neighbors, nodeA) => {
            const nbrs = Array.from(neighbors);
            for (let i = 0; i < nbrs.length; i++) {
                for (let j = i + 1; j < nbrs.length; j++) {
                    const nodeB = nbrs[i];
                    const nodeC = nbrs[j];
                    if (adjacency.get(nodeB)!.has(nodeC)) {
                        const sortedTriplet = [nodeA, nodeB, nodeC].sort().join(",");
                        threeWayConnections.add(sortedTriplet);
                    }
                }
            }
        });

        console.log(threeWayConnections, threeWayConnections.size);
        // Optional filter: sets containing a computer name starting with 't'
        const filtered = Array.from(threeWayConnections).filter(t => t.split(",").some(x => x.startsWith("t")));
        console.log(filtered, filtered.length);
        return threeWayConnections;
    }

    getInputString() {
        return this.inputString;
    }
}

function main() {
    const execution = new Day22Execution();
}

main();
