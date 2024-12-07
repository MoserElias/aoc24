import * as fs7 from "fs";

class Day7Execution {

    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];

    constructor() {
        this.inputFilePath = "example-input.txt";
        this.data = fs7.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map(line => line.replace(/\r$/, ""));
    }

    // should check all results from each line of inputString, 
    // if result is valid, add result to validResultsSum
    calculateValidResults(): number {
        let validResultsSum = 0;

        // line of inputString consists of 3 parts, first is result after : the two nums 
        for (const line of this.inputString) {
            let result = line.split(":")[0];

            // remove from line all chars til :
            let numsString = line.split(":")[1].trim();
            // convert numString to array of nums 
            let nums = numsString.split(" ").map(num => parseInt(num));

            let valid = false;
            const allOperators = this.getOperatorCombinations(nums.length - 1);
            // iterate over all possible operator combinations
            for (const operators of allOperators) {
                let currentResult = nums[0];
                for (let i = 0; i < operators.length; i++) {
                    if (operators[i] === "+") {
                        currentResult += nums[i + 1];
                    } else {
                        currentResult *= nums[i + 1];
                    }
                }
                if (currentResult.toString() === result) {
                    valid = true;
                    break;
                }
            }

            if (valid) {
                validResultsSum += parseInt(result);
            }

        }
        return validResultsSum;
    }

    getOperatorCombinations(length: number): string[][] {
        let operators = ['+', '*'];
        if (length === 0) return [[]];

        let result: string[][] = [];
        let smallerCombos = this.getOperatorCombinations(length - 1);

        for (const combo of smallerCombos) {
            for (const op of operators) {
                const newCombo = [...combo, op];
                result.push(newCombo);               
            }
        }
        
        return result;
    }

    getGrid(): string[] {
        return this.inputString;
    }
}


function main7() {
    let execution = new Day7Execution();
    console.log(execution.calculateValidResults());
}

main7();