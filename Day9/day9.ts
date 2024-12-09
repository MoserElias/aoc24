import * as fs9 from "fs";

class Day9Execution {

    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];
    private readonly inputNumArray: number[];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs9.readFileSync(this.inputFilePath, "utf8");

        this.inputString = this.data.split("\n");
        //parse input string every char into int 
        this.inputNumArray = this.inputString[0].split("").map((num) => parseInt(num));
    }

    // take every second num, and insert it as ID into the array
    buildIDRepresentation(): string[] {
        let idRepresentationWithSpaces: string[] = [];
        let idSteps = 0;
        for (let i = 0; i < this.inputNumArray.length; i++) {
            const currentNum = this.inputNumArray[i];
            if (i % 2 == 0 || i == 0) {
                for (let j = 0; j < currentNum; j++) {
                    idRepresentationWithSpaces.push(idSteps.toString());
                }
                idSteps++;
            } else {
                for (let j = 0; j < currentNum; j++) {
                    idRepresentationWithSpaces.push(".");
                }
            }
        }
        // console.log(idRepresentationWithSpaces);
        return idRepresentationWithSpaces;
    }

    // moves the last character of the first free spaces "." till every "." is at the end of the array
    amphipodIDRepresentation(idRepresentation: string[]): string[] {
        // console.log(idRepresentation);

        let length = idRepresentation.length;
        // console.log("idRepresentationLenght: " + length);
        for (let i = 0; i < idRepresentation.length - 1; i++) {
            if (idRepresentation[i] == ".") { // free space found, replace with last char  
                // console.log(i);
                // console.log("free space found at index: " + i);

                let lastChar = idRepresentation[length - 1];
                while (lastChar == ".") { // if last char is a "." skip it and take the next one  
                    length--;
                    lastChar = idRepresentation[length - 1];
                }

                // console.log("lenght: " + length);
                idRepresentation[i] = lastChar;
                idRepresentation[length - 1] = ".";
                // console.log("after move " + idRepresentation);

                if (this.allIdsAlligned(idRepresentation)) {
                    break;
                }
            }

        }
        // console.log(idRepresentation);
        return idRepresentation;
    }

    calculateCheckSum(amphipodRepresentation: string[]): number {
        let checkSum = 0;

        for (let i = 0; i < amphipodRepresentation.length; i++) {
            if (amphipodRepresentation[i] != ".") {
                checkSum += (parseInt(amphipodRepresentation[i]) * i);
            }
        }

        return checkSum;
    }

    // check if all ids alligned 
    private allIdsAlligned(idRepresentation: string[]): boolean {
        for (let i = 0; i < idRepresentation.length - 1; i++) {
            if (idRepresentation[i] == ".") {
                for (let j = i + 1; j < idRepresentation.length - 1; j++) {
                    if (idRepresentation[j] != ".") {
                        return false;
                    }
                }
            }
        }
        return true;
    }



    getInputString(): string[] {
        return this.inputString;
    }
}

function main9() {
    let execution = new Day9Execution();
    const resultBuildIDRep = execution.buildIDRepresentation();
    const resultAmphipodIDRep = execution.amphipodIDRepresentation(resultBuildIDRep); 
    const resultCheckSum = execution.calculateCheckSum(resultAmphipodIDRep);
    console.log("CheckSum: " + resultCheckSum);
}

main9();