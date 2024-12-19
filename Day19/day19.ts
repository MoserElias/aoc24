import * as fs from "fs";

class Day19Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];

    private readonly availableTowelPatterns: Set<string> = new Set(); // Set of available towel patterns 
    private readonly towelPatternsToMatch: Set<string> = new Set(); // Set of given towel patterns

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");

        // parse the input into lines
        this.inputString = this.data
            .split("\n")
            .map((line) => line.replace("\r", ""));

        // parse available towel patterns
        const patternsLine = this.inputString[0];
        const patterns = patternsLine.split(",").map(p => p.trim());
        patterns.forEach(pattern => this.availableTowelPatterns.add(pattern));
        console.log(this.availableTowelPatterns);

        // parse designs to match
        for (let i = 2; i < this.inputString.length; i++) {
            const line = this.inputString[i].trim();
            if (line.length > 0) {
                this.towelPatternsToMatch.add(line);
            }
        }
        console.log(this.towelPatternsToMatch);
    }

    // check and return number of possible patterns can be build from the given towel patterns 
    checkNumberOfPossiblePatterns(): number {
        let patterns = 0;

        // check 1 to 1 matches         
        this.towelPatternsToMatch.forEach((pattern) => {
            if (this.availableTowelPatterns.has(pattern)) {
                patterns++;
            }
        });

        // check if we can combine patterns to generate one of the available towel patterns
        this.towelPatternsToMatch.forEach((pattern) => {
            if (this.canBuildDesign(pattern)) {
                patterns++;
            }
        });

        return patterns;
    }

    // Helper method to check if a design can be built from available towel patterns
    private canBuildDesign(design: string): boolean {
        const dp = new Array(design.length + 1).fill(false);
        dp[0] = true;
        const wordDict = Array.from(this.availableTowelPatterns);

        for (let i = 1; i <= design.length; i++) {
            for (const word of wordDict) {
                const len = word.length;
                if (i >= len && dp[i - len]) {
                    if (design.substring(i - len, i) === word) {
                        dp[i] = true;
                        break;
                    }
                }
            }
        }

        return dp[design.length];
    }
}

function main19() {
    const execution = new Day19Execution();
    let result = execution.checkNumberOfPossiblePatterns();
    console.log("matched patterns " + result);
}

main19();