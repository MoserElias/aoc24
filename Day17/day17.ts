import * as fs from "fs";

class Day17Execution {
    private readonly inputFilePath: string;
    private readonly data: string;
    private readonly inputString: string[];

    private registers: { [key: string]: number } = {};
    private program: number[] = [];

    constructor() {
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map((line) => line.replace("\r", ""));

        // Parse input and separate registers and program
        this.inputString.forEach((line) => {
            if (line.startsWith('Register')) {
                const matches = line.match(/Register ([ABC]): (\d+)/);
                if (matches) {
                    const reg = matches[1];
                    const value = parseInt(matches[2]);
                    this.registers[reg] = value;
                }
            } else if (line.startsWith('Program:')) {
                this.program = line
                    .replace('Program: ', '')
                    .split(',')
                    .map(Number);
            }
        });

        console.log("Programm " + this.program);

        // for (const element in this.registers) {
        //     console.log(`Register ${element}: ${this.registers[element]}`);
        // }
        this.executeProgram();
    }

    private executeProgram() {
        let { A: a, B: b, C: c } = this.registers;
        console.log(`Initial Register values: A=${a}, B=${b}, C=${c}`);

        const output: number[] = [];
        let ip = 0; // Instruction pointer

        while (ip < this.program.length) {
            const opcode = this.program[ip];
            const operand = this.program[ip + 1];
            let operandValue: number = 0;

            let denominator = 0; 
            let divisionResult = 0;
            switch (opcode) {
                case 0: // adv
                    operandValue = this.getComboOperandValue(operand, a, b, c);
                    denominator = Math.pow(2, operandValue);
                    divisionResult = Math.trunc(a / denominator);
                    ip += 2;
                    a = divisionResult;  
                    break;    
                case 6: // bdv
                    operandValue = this.getComboOperandValue(operand, a, b, c);
                    denominator = Math.pow(2, operandValue);
                    divisionResult = Math.trunc(b / denominator);
                    ip += 2;
                    b = divisionResult;
                    break;
                case 7: // cdv
                    operandValue = this.getComboOperandValue(operand, a, b, c);
                    denominator = Math.pow(2, operandValue);
                    divisionResult = Math.trunc(a / denominator);
                    c = divisionResult;
                    ip += 2;
                    break;

                case 1: // bxl
                    operandValue = operand;
                    b = b ^ operandValue;
                    ip += 2;
                    break;

                case 2: // bst
                    operandValue = this.getComboOperandValue(operand, a, b, c) % 8;
                    b = operandValue;
                    ip += 2;
                    break;

                case 3: // jnz
                    operandValue = operand;
                    if (a !== 0) {
                        ip = operandValue;
                    } else {
                        ip += 2;
                    }
                    break;

                case 4: // bxc
                    b = b ^ c;
                    ip += 2;
                    break;

                case 5: // out
                    operandValue = this.getComboOperandValue(operand, a, b, c) % 8;
                    output.push(operandValue);
                    ip += 2;
                    break;

                default:
                    // Invalid opcode, halt execution
                    ip = this.program.length;
                    break;
            }
        }

        console.log(output.join(','));
    }

    private getComboOperandValue(
        operand: number,
        a: number,
        b: number,
        c: number
    ): number {
        switch (operand) {
            case 0:
            case 1:
            case 2:
            case 3:
                return operand;
            case 4:
                return a;
            case 5:
                return b;
            case 6:
                return c;
            default:
                throw new Error(`Invalid combo operand: ${operand}`);
        }
    }
}

function main17() {
    const execution = new Day17Execution();
}

main17();