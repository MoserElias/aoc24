"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day17Execution = /** @class */ (function () {
    function Day17Execution() {
        var _this = this;
        this.registers = {};
        this.program = [];
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map(function (line) { return line.replace("\r", ""); });
        // Parse input and separate registers and program
        this.inputString.forEach(function (line) {
            if (line.startsWith('Register')) {
                var matches = line.match(/Register ([ABC]): (\d+)/);
                if (matches) {
                    var reg = matches[1];
                    var value = parseInt(matches[2]);
                    _this.registers[reg] = value;
                }
            }
            else if (line.startsWith('Program:')) {
                _this.program = line
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
    Day17Execution.prototype.executeProgram = function () {
        var _a = this.registers, a = _a.A, b = _a.B, c = _a.C;
        console.log("Initial Register values: A=".concat(a, ", B=").concat(b, ", C=").concat(c));
        var output = [];
        var ip = 0; // Instruction pointer
        while (ip < this.program.length) {
            var opcode = this.program[ip];
            var operand = this.program[ip + 1];
            var operandValue = 0;
            var denominator = 0;
            var divisionResult = 0;
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
                    }
                    else {
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
    };
    Day17Execution.prototype.getComboOperandValue = function (operand, a, b, c) {
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
                throw new Error("Invalid combo operand: ".concat(operand));
        }
    };
    return Day17Execution;
}());
function main17() {
    var execution = new Day17Execution();
}
main17();
