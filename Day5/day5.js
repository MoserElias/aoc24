"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs5 = require("fs");
var Day5Execution = /** @class */ (function () {
    function Day5Execution() {
        this.inputFilePath = "real-input.txt";
        this.data = fs5.readFileSync(this.inputFilePath, "utf8");
        this.ruleSet = this.data.trim().split("\n");
        var indexSecondPart = 0;
        for (var i = 0; i < this.ruleSet.length; i++) {
            if (this.ruleSet[i] == "") {
                indexSecondPart = i;
                break;
            }
        }
        this.inputSequence = this.ruleSet.slice(indexSecondPart + 1, this.ruleSet.length);
        this.ruleSet = this.ruleSet.slice(0, indexSecondPart);
        // console.log(this.ruleSet); 
        // console.log(this.inputSequence);
    }
    Day5Execution.prototype.checkRules = function () {
        var sequenceInt = [];
        this.inputSequence.forEach(function (sequence) {
            sequenceInt.push(sequence.split(",").map(Number));
        });
        var validSequences = [];
        for (var _i = 0, sequenceInt_1 = sequenceInt; _i < sequenceInt_1.length; _i++) {
            var sequence = sequenceInt_1[_i];
            var isValid = true;
            for (var _a = 0, _b = this.ruleSet; _a < _b.length; _a++) {
                var rule = _b[_a];
                var _c = rule.split("|").map(Number), firstRule = _c[0], secondRule = _c[1];
                if (sequence.includes(firstRule) && sequence.includes(secondRule)) {
                    var indexFirst = sequence.indexOf(firstRule); // get index of first num from actual sequence
                    var indexSecond = sequence.indexOf(secondRule);
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
    };
    Day5Execution.prototype.calculateMiddleValuesSum = function (resultSequence) {
        var sum = 0;
        for (var _i = 0, resultSequence_1 = resultSequence; _i < resultSequence_1.length; _i++) {
            var sequence = resultSequence_1[_i];
            var middleIndex = Math.floor(sequence.length / 2);
            sum += sequence[middleIndex];
        }
        return sum;
    };
    Day5Execution.prototype.getLines = function () {
        return this.ruleSet;
    };
    return Day5Execution;
}());
function main5() {
    var execution = new Day5Execution();
    var resultSequences = execution.checkRules();
    console.log(resultSequences);
    var resultSumMiddleValues = execution.calculateMiddleValuesSum(resultSequences);
    console.log(resultSumMiddleValues);
}
main5();
