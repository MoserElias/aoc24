import * as fs5 from "fs";

class Day5Execution {

    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly ruleSet: string[];
    private readonly inputSequence: string[];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs5.readFileSync(this.inputFilePath, "utf8");
        this.ruleSet = this.data.trim().split("\n");


        let indexSecondPart = 0;
        for (let i = 0; i < this.ruleSet.length; i++) {
            if (this.ruleSet[i] == "") {
                indexSecondPart = i;
                break;
            }
        }

        this.inputSequence = this.ruleSet.slice(indexSecondPart + 1, this.ruleSet.length);
        this.ruleSet = this.ruleSet.slice(0, indexSecondPart);
    }

    checkRules(): number[][] {
        let sequenceInt: number[][] = [];
        this.inputSequence.forEach((sequence) => {
            sequenceInt.push(sequence.split(",").map(Number));
        });

        const validSequences: number[][] = [];

        for (const sequence of sequenceInt) {
            let isValid = true;

            for (const rule of this.ruleSet) {
                const [firstRule, secondRule] = rule.split("|").map(Number);

                if (sequence.includes(firstRule) && sequence.includes(secondRule)) {
                    const indexFirst = sequence.indexOf(firstRule); // get index of first num from actual sequence
                    const indexSecond = sequence.indexOf(secondRule);

                    // if first num is after second num in actual sequence, rule is violated
                    if (indexFirst > indexSecond) {
                        // Rule violation
                        isValid = false;
                        break;
                    }
                }
            }

            if (isValid) {
                validSequences.push(sequence);
            }
        }

        return validSequences;
    }

    calculateMiddleValuesSum(resultSequence: number[][]): number {
        let sum = 0;

        for (const sequence of resultSequence) {
            let middleIndex = Math.floor(sequence.length / 2);
            sum += sequence[middleIndex];
        }

        return sum;
    }

    getLines(): string[] {
        return this.ruleSet;
    }

}

function main5() {
    let execution = new Day5Execution();
    let resultSequences = execution.checkRules();
    console.log(resultSequences);
    let resultSumMiddleValues = execution.calculateMiddleValuesSum(resultSequences);
    console.log(resultSumMiddleValues);
}

main5();