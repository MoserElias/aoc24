"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Day11Execution = /** @class */ (function () {
    function Day11Execution() {
        this.stoneEngraving = [];
        this.inputFilePath = "real-input.txt";
        this.data = fs.readFileSync(this.inputFilePath, "utf8");
        this.inputString = this.data.split("\n");
        // remove \r elements 
        this.inputString = this.inputString.map(function (line) { return line.replace("\r", ""); });
        // map inputString to stoneEngraving split by space
        this.stoneEngraving = this.inputString[0].split(" ").map(Number);
        console.log(this.stoneEngraving);
    }
    // rules: if stone is engraved with nnumber 0 it becomes stone with number 1 
    // if stone is engraved with even number of digits it becomes two stones, digts is halved (first half is first stone, second half is second stone)
    // if no rule apply engraving number is multiplied by 2024 
    Day11Execution.prototype.blink = function (stones) {
        var resultStoneEnvgarving = [];
        for (var _i = 0, stones_1 = stones; _i < stones_1.length; _i++) {
            var element = stones_1[_i];
            if (element == 0) { // rule 1 
                resultStoneEnvgarving.push(1);
            }
            else if (element.toString().length % 2 === 0) { // rule 2 (when for example = 10, 1 and 0 are two stones)  
                var stone1 = parseInt(element.toString().substring(0, element.toString().length / 2));
                var stone2 = parseInt(element.toString().substring(element.toString().length / 2));
                // remove leading zeros (beaware of 0 as a number)
                stone1 = stone1 == 0 ? 0 : parseInt(stone1.toString().replace(/^0+/, ''));
                stone2 = stone2 == 0 ? 0 : parseInt(stone2.toString().replace(/^0+/, ''));
                resultStoneEnvgarving.push(stone1);
                resultStoneEnvgarving.push(stone2);
            }
            else { // rule 3
                resultStoneEnvgarving.push(element * 2024);
            }
        }
        return resultStoneEnvgarving;
    };
    Day11Execution.prototype.getInitialStoneEngraving = function () {
        return this.stoneEngraving;
    };
    return Day11Execution;
}());
function main11() {
    var execution = new Day11Execution();
    var initialStoneEngraving = execution.getInitialStoneEngraving();
    var resultStonesEngravings = execution.blink(initialStoneEngraving);
    for (var i = 1; i < 25; i++) {
        resultStonesEngravings = execution.blink(resultStonesEngravings);
    }
    var res = 0;
    for (var _i = 0, resultStonesEngravings_1 = resultStonesEngravings; _i < resultStonesEngravings_1.length; _i++) {
        var element = resultStonesEngravings_1[_i];
        res++;
    }
    console.log(res);
}
main11();
