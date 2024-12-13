import * as fs from "fs";
import { config } from "process";

class Day13Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];

    private readonly clawConfigMachine: Set<String> = new Set<String>();

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map((line) => line.replace("\r", ""));

        let currentBatch: string[] = [];
        this.inputString.forEach(line => {
            if (line.trim() !== '') {
                currentBatch.push(line);
            } else {
                if (currentBatch.length > 0) {
                    // Join without '\n', using space as a separator
                    this.clawConfigMachine.add(currentBatch.join(' '));
                    currentBatch = [];
                }
            }
        });
        // Add the last batch if it exists
        if (currentBatch.length > 0) {
            this.clawConfigMachine.add(currentBatch.join(' '));
        }
        // console.log(this.clawConfigMachine);
    }

    // calculates the amount of tokens needed to win the price 
    // X and Y axis have to be exactly aligned with Price Config 
    // pushing Button A = 3 Tokens, Button B = 1 Token 
    calculateTokensForPrice(clawConfigMachine: Set<String>): number {
        let tokens = 0;

        clawConfigMachine.forEach(config => {

            let priceX: number = 0;
            let priceY: number = 0;

            let matches = config.match(/Prize: X=(\d+), Y=(\d+)/);
            if (matches) {
                priceX = parseInt(matches[1]);
                priceY = parseInt(matches[2]);
            }

            let matchesButtonAXAxis = config.match(/Button A: X\+(\d+)/);
            let matchesButtonBXAxis = config.match(/Button B: X\+(\d+)/);
            let buttonAX: number = 0;
            let buttonBX: number = 0;
            if (matchesButtonAXAxis && matchesButtonBXAxis) {
                buttonAX = parseInt(matchesButtonAXAxis[1]);
                buttonBX = parseInt(matchesButtonBXAxis[1]);
            }

            let matchesButtonAYAxis = config.match(/Button A:.*?Y\+(\d+)/);
            let matchesButtonBYAxis = config.match(/Button B:.*?Y\+(\d+)/);
            let buttonAY: number = 0;
            let buttonBY: number = 0;
            if (matchesButtonAYAxis && matchesButtonBYAxis) {
                buttonAY = parseInt(matchesButtonAYAxis[1]);
                buttonBY = parseInt(matchesButtonBYAxis[1]);
            }

            // print all relevant values for debugging
            // console.log('priceX: ' + priceX);
            // console.log('priceY: ' + priceY);
            // console.log('buttonAX: ' + buttonAX);
            // console.log('buttonBX: ' + buttonBX);
            // console.log('buttonAY: ' + buttonAY);
            // console.log('buttonBY: ' + buttonBY);

            // calculate amount of tokens needed to align buttonAX and buttttonBX with priceX 
            let foundAlignmentForPriceX = false;
            let pushesA: number = 0;
            let pushesB: number = 0;
            for (pushesA = 0; pushesA <= priceX; pushesA++) {
                for (pushesB = 0; pushesB <= priceX; pushesB++) {
                    if (((pushesA * buttonAX) + (pushesB * buttonBX)) == priceX) {
                        if (((pushesA * buttonAY) + (pushesB * buttonBY)) == priceY) {
                            foundAlignmentForPriceX = true;
                            // console.log('here');
                            break;
                        } // else continue with next iteration
                    }
                }
                if (foundAlignmentForPriceX) {
                    break;
                }
            }

            // check for priceY if foundAlignmentForPriceX is true
            if (foundAlignmentForPriceX) {
                tokens += pushesA * 3; // for button A 
                tokens += pushesB; // for button B  
            }

        });

        return tokens;
    }



    getClawConfigMachine(): Set<String> {
        return this.clawConfigMachine;
    }

}

function main13() {
    let execution = new Day13Execution();
    let amountOfTokes = execution.calculateTokensForPrice(execution.getClawConfigMachine());
    console.log(amountOfTokes);
}

main13();