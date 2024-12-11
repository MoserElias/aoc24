import * as fs from "fs";

class Day11Execution {

    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];

    private readonly stoneEngraving: number[] = [];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");

        this.inputString = this.data.split("\n");
        // remove \r elements 
        this.inputString = this.inputString.map((line) => line.replace("\r", ""));

        // map inputString to stoneEngraving split by space
        this.stoneEngraving = this.inputString[0].split(" ").map(Number);
        console.log(this.stoneEngraving);
    }

    // rules: if stone is engraved with nnumber 0 it becomes stone with number 1 
    // if stone is engraved with even number of digits it becomes two stones, digts is halved (first half is first stone, second half is second stone)
    // if no rule apply engraving number is multiplied by 2024 
    blink(stones: number[]): number[] {
        let resultStoneEnvgarving: number[] = [];

        for (const element of stones) {
            if (element == 0) { // rule 1 
                resultStoneEnvgarving.push(1);
            } else if (element.toString().length % 2 === 0) { // rule 2 (when for example = 10, 1 and 0 are two stones)  
                let stone1 = parseInt(element.toString().substring(0, element.toString().length / 2));
                let stone2 = parseInt(element.toString().substring(element.toString().length / 2));

                // remove leading zeros (beaware of 0 as a number)
                stone1 = stone1 == 0 ? 0 : parseInt(stone1.toString().replace(/^0+/, ''));
                stone2 = stone2 == 0 ? 0 : parseInt(stone2.toString().replace(/^0+/, ''));

                resultStoneEnvgarving.push(stone1);
                resultStoneEnvgarving.push(stone2);
            } else { // rule 3
                resultStoneEnvgarving.push(element * 2024);
            }
        }

        return resultStoneEnvgarving;
    }

    getInitialStoneEngraving(): number[] {
        return this.stoneEngraving;
    }

}

function main11() {
    let execution = new Day11Execution(); 

    let initialStoneEngraving = execution.getInitialStoneEngraving();
    
    let resultStonesEngravings = execution.blink(initialStoneEngraving);

    for (let i = 1; i < 25; i++) {
        resultStonesEngravings = execution.blink(resultStonesEngravings);
    }

    let res = 0;
    for (const element of resultStonesEngravings) {
        res++;
    }
    console.log(res);
}

main11();