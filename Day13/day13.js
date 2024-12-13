"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day13Execution = /** @class */ (function () {
    function Day13Execution() {
        var _this = this;
        this.clawConfigMachine = new Set();
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n").map(function (line) { return line.replace("\r", ""); });
        var currentBatch = [];
        this.inputString.forEach(function (line) {
            if (line.trim() !== '') {
                currentBatch.push(line);
            }
            else {
                if (currentBatch.length > 0) {
                    // Join without '\n', using space as a separator
                    _this.clawConfigMachine.add(currentBatch.join(' '));
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
    Day13Execution.prototype.calculateTokensForPrice = function (clawConfigMachine) {
        var tokens = 0;
        clawConfigMachine.forEach(function (config) {
            var priceX = 0;
            var priceY = 0;
            var matches = config.match(/Prize: X=(\d+), Y=(\d+)/);
            if (matches) {
                priceX = parseInt(matches[1]);
                priceY = parseInt(matches[2]);
            }
            var matchesButtonAXAxis = config.match(/Button A: X\+(\d+)/);
            var matchesButtonBXAxis = config.match(/Button B: X\+(\d+)/);
            var buttonAX = 0;
            var buttonBX = 0;
            if (matchesButtonAXAxis && matchesButtonBXAxis) {
                buttonAX = parseInt(matchesButtonAXAxis[1]);
                buttonBX = parseInt(matchesButtonBXAxis[1]);
            }
            var matchesButtonAYAxis = config.match(/Button A:.*?Y\+(\d+)/);
            var matchesButtonBYAxis = config.match(/Button B:.*?Y\+(\d+)/);
            var buttonAY = 0;
            var buttonBY = 0;
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
            var foundAlignmentForPriceX = false;
            var pushesA = 0;
            var pushesB = 0;
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
    };
    Day13Execution.prototype.getClawConfigMachine = function () {
        return this.clawConfigMachine;
    };
    return Day13Execution;
}());
function main13() {
    var execution = new Day13Execution();
    var amountOfTokes = execution.calculateTokensForPrice(execution.getClawConfigMachine());
    console.log(amountOfTokes);
}
main13();
